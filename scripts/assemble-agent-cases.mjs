import { lstat, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Install this module at scripts/assemble-agent-cases.mjs in the host repository.
const repository = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(repository, 'agent-cases');
const prefix = '/agent-cases/';
const slugs = [
  'bella',
  'velia',
  'oliva',
  'steve',
  'atlas',
  'nora',
  'leo',
  'iris',
  'ruby',
];
const pageRoutes = new Map([
  ['index.html', prefix],
  ...slugs.map((slug) => [
    `cases/${slug}/index.html`,
    `${prefix}cases/${slug}/`,
  ]),
  ['en/index.html', `${prefix}en/`],
  ...slugs.map((slug) => [
    `en/cases/${slug}/index.html`,
    `${prefix}en/cases/${slug}/`,
  ]),
]);
const downloads = new Set([
  'downloads/marketing-agent-playbook.md',
  ...slugs
    .filter((slug) => slug !== 'bella')
    .map((slug) => `downloads/${slug}-workbook.md`),
  'en/downloads/marketing-agent-playbook.md',
  ...slugs
    .filter((slug) => slug !== 'bella')
    .map((slug) => `en/downloads/${slug}-workbook.md`),
]);
const assetExtensions = new Set([
  '.css',
  '.js',
  '.json',
  '.svg',
  '.webp',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.avif',
  '.ico',
  '.woff',
  '.woff2',
  '.txt',
]);

function inside(parent, child) {
  const relative = path.relative(parent, child);
  return (
    relative === '' ||
    (!path.isAbsolute(relative) &&
      relative !== '..' &&
      !relative.startsWith(`..${path.sep}`))
  );
}

async function maybeStat(file) {
  try {
    return await lstat(file);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function assertRegular(
  info,
  label,
  { directory = false, writable = false } = {},
) {
  if (info.isSymbolicLink())
    throw new Error(`Symbolic links are not allowed: ${label}`);
  if (directory ? !info.isDirectory() : !info.isFile())
    throw new Error(
      `Expected a regular ${directory ? 'directory' : 'file'}: ${label}`,
    );
  if (writable && info.isFile() && info.nlink > 1)
    throw new Error(`Refusing to overwrite a hard-linked file: ${label}`);
}

// Inspect existing path components too: a safe-looking basename must not point
// through a junction or symlink to a different tree.
async function assertDirectoryPath(directory) {
  const target = path.resolve(directory);
  const chain = [];
  for (let cursor = target; ; cursor = path.dirname(cursor)) {
    chain.push(cursor);
    if (cursor === path.dirname(cursor)) break;
  }
  for (const entry of chain.reverse()) {
    const info = await maybeStat(entry);
    if (info) assertRegular(info, entry, { directory: true });
  }
}

async function inspectTree(root, { optional = false, writable = false } = {}) {
  const rootInfo = await maybeStat(root);
  if (!rootInfo) {
    if (optional) return { files: new Map(), directories: new Set() };
    throw new Error(`Required directory is missing: ${root}`);
  }
  assertRegular(rootInfo, root, { directory: true });
  const files = new Map();
  const directories = new Set();
  async function visit(directory) {
    const names = (await readdir(directory)).sort();
    for (const name of names) {
      const file = path.join(directory, name);
      const relative = path.relative(root, file).split(path.sep).join('/');
      const info = await lstat(file);
      if (info.isSymbolicLink())
        throw new Error(`Symbolic links are not allowed: ${file}`);
      if (info.isDirectory()) {
        directories.add(relative);
        await visit(file);
      } else {
        assertRegular(info, file, { writable });
        files.set(relative, { file, info });
      }
    }
  }
  await visit(root);
  return { files, directories };
}

function validateOrigin(value) {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string' || value !== value.trim())
    throw new Error(
      'origin must be an absolute HTTP(S) origin or an empty value.',
    );
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('origin must be an absolute HTTP(S) origin.');
  }
  if (
    !/^https?:\/\/[^/?#\\]+\/?$/i.test(value) ||
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  )
    throw new Error(
      'origin must not contain a path, credentials, query or fragment.',
    );
  return url.origin;
}

function validateOutput(value) {
  if (typeof value !== 'string' || !path.isAbsolute(value))
    throw new Error('output must be an absolute directory path.');
  const output = path.resolve(value);
  if (path.basename(output) !== 'agent-cases')
    throw new Error('The output directory must be named agent-cases.');
  if (
    path.relative(repository, output) === '' ||
    inside(source, output) ||
    inside(output, source)
  )
    throw new Error(
      'output must not be the repository root, the source, or overlap the source tree.',
    );
  return output;
}

async function runSourceScript(script) {
  const file = path.join(source, script);
  assertRegular(await lstat(file), file);
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script], {
      cwd: source,
      shell: false,
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('close', (code, signal) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(
            `Agent cases ${script} failed (${signal || `exit ${code}`}).`,
          ),
        );
    });
  });
}

function publicFile(relative) {
  if (pageRoutes.has(relative) || downloads.has(relative)) return true;
  if (
    relative
      .split('/')
      .some((part) => !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(part))
  )
    return false;
  return (
    (relative.startsWith('assets/') ||
      relative.startsWith('cases/bella/assets/')) &&
    assetExtensions.has(path.posix.extname(relative).toLowerCase())
  );
}

function requiredDirectories(files) {
  const directories = new Set();
  for (const file of files) {
    for (
      let directory = path.posix.dirname(file);
      directory !== '.';
      directory = path.posix.dirname(directory)
    )
      directories.add(directory);
  }
  return directories;
}

const tagPattern = /<(?:meta|link)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi;

function attributes(tag) {
  const body = tag
    .replace(/^<\s*[a-z][a-z0-9:-]*\b/i, '')
    .replace(/\/?\s*>$/, '');
  const result = new Map();
  const pattern =
    /([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of body.matchAll(pattern))
    result.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  return result;
}

function escapeXML(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[character],
  );
}

// Source titles/descriptions already contain HTML entities. Preserve those
// entities while escaping literal characters for a new quoted attribute.
function escapeSourceAttribute(value) {
  return String(value)
    .replace(/&(?!(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]+);)/gi, '&amp;')
    .replace(
      /[<>"']/g,
      (character) =>
        ({
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[character],
    );
}

function addMetadata(html, route, origin) {
  const english = route.startsWith(prefix + 'en/');
  const expectedLanguage = english ? 'en' : 'zh-cn';
  const localRoute = route.slice(prefix.length).replace(/^en\//, '');
  const alternates = [
    ['zh-CN', prefix + localRoute],
    ['en', prefix + 'en/' + localRoute],
    ['x-default', prefix + localRoute],
  ];
  const documentTag = html.match(/<html\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/i)?.[0];
  if (
    !documentTag ||
    attributes(documentTag).get('lang')?.toLowerCase() !== expectedLanguage
  )
    throw new Error(`Expected a ${expectedLanguage} document at ${route}`);
  const head = html.match(/(<head\b[^>]*>)([\s\S]*?)(<\/head\s*>)/i);
  if (!head) throw new Error(`Missing document head at ${route}`);
  const title = head[2]
    .match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1]
    .replace(/\s+/g, ' ')
    .trim();
  if (!title) throw new Error(`Missing page title at ${route}`);
  const meta = new Map();
  for (const match of head[2].matchAll(tagPattern)) {
    if (!/^<meta\b/i.test(match[0])) continue;
    const attrs = attributes(match[0]);
    const name = (
      attrs.get('property') ||
      attrs.get('name') ||
      ''
    ).toLowerCase();
    if (attrs.get('content')?.trim()) meta.set(name, attrs.get('content'));
  }
  // URL identity always follows this assembly's origin. Preview builds carry
  // no canonical/og:url, even if a source page came from a previous release.
  const kept = head[2].replace(tagPattern, (tag) => {
    const attrs = attributes(tag);
    if (
      /^<link\b/i.test(tag) &&
      (attrs.get('rel') || '').toLowerCase().split(/\s+/).includes('canonical')
    )
      return '';
    if (
      origin &&
      /^<link\b/i.test(tag) &&
      (attrs.get('rel') || '').toLowerCase() === 'alternate' &&
      ['zh-cn', 'en', 'x-default'].includes(
        (attrs.get('hreflang') || '').toLowerCase(),
      )
    )
      return '';
    if (/^<meta\b/i.test(tag)) {
      const name = (
        attrs.get('property') ||
        attrs.get('name') ||
        ''
      ).toLowerCase();
      if (name === 'og:url' || name === 'og:locale') return '';
      if (
        ['og:title', 'og:description'].includes(name) &&
        !attrs.get('content')?.trim()
      )
        return '';
    }
    return tag;
  });
  const extra = [];
  if (origin) {
    const url = escapeXML(origin + route);
    extra.push(
      `<link rel="canonical" href="${url}">`,
      `<meta property="og:url" content="${url}">`,
    );
    if (!meta.has('og:image'))
      extra.push(
        `<meta property="og:image" content="${escapeXML(origin + '/og.png')}">`,
        '<meta property="og:image:alt" content="AIelsen FDE: Expertise. Engineered.">',
      );
    if (!meta.has('twitter:card'))
      extra.push('<meta name="twitter:card" content="summary_large_image">');
    for (const [language, alternate] of alternates)
      extra.push(
        `<link rel="alternate" hreflang="${language}" href="${escapeXML(origin + alternate)}">`,
      );
  }
  extra.push(
    `<meta property="og:locale" content="${english ? 'en_US' : 'zh_CN'}">`,
  );
  if (!meta.has('og:type'))
    extra.push('<meta property="og:type" content="website">');
  if (!meta.has('og:site_name'))
    extra.push('<meta property="og:site_name" content="AIelsen Agent Field Notes">');
  if (!meta.has('og:title'))
    extra.push(
      `<meta property="og:title" content="${escapeSourceAttribute(title)}">`,
    );
  if (!meta.has('og:description'))
    extra.push(
      `<meta property="og:description" content="${escapeSourceAttribute(meta.get('description') || title)}">`,
    );
  const replacement = head[1] + kept + '\n' + extra.join('\n') + '\n' + head[3];
  const assembled =
    html.slice(0, head.index) +
    replacement +
    html.slice(head.index + head[0].length);
  // Only the known service-return anchors become local to the combined site.
  // Do not rewrite canonical, media or other external links.
  return assembled.replace(
    /<a\b[^>]*\bhref="https:\/\/fde\.aielsen\.com\/(?:zh|en)\/[^"<>]*"[^>]*>/g,
    (tag) =>
      tag
        .replace(/href="https:\/\/fde\.aielsen\.com\//, 'href="/')
        .replace(/\s+target="_blank"/g, '')
        .replace(/\s+rel="noopener noreferrer"/g, ''),
  );
}

/** Build the standalone bilingual library and copy only its checked public files. */
export async function assembleAgentCases({
  output = path.join(repository, 'dist/client/agent-cases'),
  origin,
} = {}) {
  const destination = validateOutput(output);
  const siteOrigin = validateOrigin(origin);
  await assertDirectoryPath(source);
  await assertDirectoryPath(destination);
  const before = await inspectTree(source);
  for (const script of ['tools/build.mjs', 'tools/check.mjs'])
    if (!before.files.has(script))
      throw new Error(`The public source package must include ${script}.`);
  for (const [relative, { info }] of before.files)
    if (relative.startsWith('site/') && info.nlink > 1)
      throw new Error(
        `Refusing to rebuild a hard-linked site file: ${relative}`,
      );

  await runSourceScript('tools/build.mjs');
  await inspectTree(source);
  await runSourceScript('tools/check.mjs');
  // A builder must not introduce links that were absent from the initial scan.
  await inspectTree(source);
  const site = await inspectTree(path.join(source, 'site'));
  for (const relative of site.files.keys())
    if (!publicFile(relative))
      throw new Error(`Unexpected file in public site: ${relative}`);
  for (const relative of [...pageRoutes.keys(), ...downloads])
    if (!site.files.has(relative))
      throw new Error(`Missing public artifact: ${relative}`);

  // Prepare every page before touching output. Assets/downloads are copied
  // byte-for-byte; no resource URL, fragment or download target is rewritten.
  const prepared = new Map();
  for (const [relative, { file }] of site.files) {
    const bytes = await readFile(file);
    prepared.set(
      relative,
      pageRoutes.has(relative)
        ? Buffer.from(
            addMetadata(
              bytes.toString('utf8'),
              pageRoutes.get(relative),
              siteOrigin,
            ),
          )
        : bytes,
    );
  }
  const directories = requiredDirectories(prepared.keys());
  for (const directory of site.directories)
    if (!directories.has(directory))
      throw new Error(
        `Unexpected empty directory in public site: ${directory}`,
      );

  await assertDirectoryPath(destination);
  const existing = await inspectTree(destination, {
    optional: true,
    writable: true,
  });
  for (const relative of existing.files.keys())
    if (!prepared.has(relative))
      throw new Error(
        `Unknown existing output file; nothing copied: ${relative}`,
      );
  for (const relative of existing.directories)
    if (!directories.has(relative))
      throw new Error(
        `Unknown existing output directory; nothing copied: ${relative}`,
      );

  // Never recursively delete output. A retired file requires a separately
  // reviewed cleanup or a fresh isolated output directory.
  await mkdir(destination, { recursive: true });
  for (const directory of [...directories].sort(
    (a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b),
  )) {
    const target = path.join(destination, ...directory.split('/'));
    await assertDirectoryPath(target);
    await mkdir(target, { recursive: true });
  }
  for (const [relative, bytes] of prepared) {
    const target = path.join(destination, ...relative.split('/'));
    await assertDirectoryPath(path.dirname(target));
    const info = await maybeStat(target);
    if (info) assertRegular(info, target, { writable: true });
    await writeFile(target, bytes);
  }

  const routes = [...pageRoutes.values()];
  const entries = siteOrigin
    ? routes
        .map((route) => {
          const localRoute = route.slice(prefix.length).replace(/^en\//, '');
          const links = [
            ['zh-CN', prefix + localRoute],
            ['en', prefix + 'en/' + localRoute],
            ['x-default', prefix + localRoute],
          ]
            .map(
              ([language, alternate]) =>
                `<xhtml:link xmlns:xhtml="http://www.w3.org/1999/xhtml" rel="alternate" hreflang="${language}" href="${escapeXML(siteOrigin + alternate)}"/>`,
            )
            .join('');
          return `<url><loc>${escapeXML(siteOrigin + route)}</loc>${links}</url>`;
        })
        .join('\n')
    : '';
  console.log(
    `Agent cases assembled: ${routes.length} bilingual pages, ${prepared.size} public files.`,
  );
  return { routes, entries };
}
