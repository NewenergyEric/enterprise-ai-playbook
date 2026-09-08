import { spawnSync } from 'node:child_process';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(repo, 'academy');
export const academyPrefix = '/academy';
const allowed = new Set([
  '.html',
  '.css',
  '.js',
  '.json',
  '.svg',
  '.woff2',
  '.txt',
  '.xml',
  '.md',
  '.zip',
  '.pdf',
]);
const escapeXML = (value) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[c],
  );

export function academyURL(value) {
  // The two service-return links belong to the parent site, not the Academy.
  const service = value.match(/^https:\/\/fde\.aielsen\.com\/(zh|en)\/$/);
  if (service) return '/' + service[1] + '/';
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  if (value === academyPrefix || value.startsWith(academyPrefix + '/'))
    return value;
  return academyPrefix + value;
}

export function adaptAcademyHTML(html, route, origin) {
  let adapted = html
    .replace(
      /\b(href|src|action|poster)="([^"]*)"/g,
      (_, key, value) => `${key}="${academyURL(value)}"`,
    )
    .replace(
      /content="0;url=([^" ]+)"/g,
      (_, value) => `content="0;url=${academyURL(value)}"`,
    );
  if (origin && route && route !== '/academy/') {
    adapted = adapted.replace(
      /(<link rel="alternate"[^>]*href=")([^" ]+)(")/g,
      (_, start, href, end) => start + escapeXML(origin + href) + end,
    );
    const canonical = escapeXML(origin + route);
    adapted = adapted.replace(
      '</head>',
      `<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}"></head>`,
    );
  }
  return adapted;
}

export async function assembleAcademy({ output, origin = '' }) {
  const target = path.resolve(output);
  const safeTargets = [
    path.join(repo, 'dist/client/academy'),
    path.join(repo, '.generated/academy'),
  ];
  if (!safeTargets.includes(target))
    throw new Error('Academy output must stay in a known generated directory.');
  for (const script of ['build', 'test']) {
    const result = spawnSync(process.execPath, ['scripts/' + script + '.mjs'], {
      cwd: source,
      stdio: 'inherit',
      env: { ...process.env, SITE_URL: '', TEST_BASE_URL: '' },
    });
    if (result.error) throw result.error;
    if (result.status !== 0)
      throw new Error('Academy ' + script + ' failed; do not publish.');
  }
  const routes = JSON.parse(
    await readFile(path.join(source, 'work/route-manifest.json'), 'utf8'),
  ).map(academyURL);
  async function visit(relative = '') {
    for (const entry of await readdir(path.join(source, 'dist', relative), {
      withFileTypes: true,
    })) {
      const next = path.join(relative, entry.name);
      if (entry.isSymbolicLink())
        throw new Error('No symlinks in public output: ' + next);
      if (entry.isDirectory()) {
        await visit(next);
        continue;
      }
      const ext = path.extname(next);
      if (!allowed.has(ext)) throw new Error('Unapproved public file: ' + next);
      if (['robots.txt', 'sitemap.xml'].includes(next)) continue;
      let data = await readFile(path.join(source, 'dist', next));
      if (ext === '.html') {
        const relativeURL = next.split(path.sep).join('/');
        const route = relativeURL.endsWith('index.html')
          ? academyPrefix + '/' + relativeURL.replace(/index\.html$/, '')
          : null;
        data = adaptAcademyHTML(data.toString('utf8'), route, origin);
      } else if (/^assets[\\/]search-(zh|en)\.json$/.test(next)) {
        data = JSON.stringify(
          JSON.parse(data.toString('utf8')).map((item) => ({
            ...item,
            url: academyURL(item.url),
          })),
        );
      } else if (ext === '.md') {
        // Adapt real worksheet links, not API paths or code snippets in lessons.
        data = data
          .toString('utf8')
          .replace(
            /\]\((\/(?:zh|en|assets|downloads)\/[^)]+)\)/g,
            (_, url) => '](' + academyURL(url) + ')',
          );
      }
      await mkdir(path.dirname(path.join(target, next)), { recursive: true });
      await writeFile(path.join(target, next), data);
    }
  }
  await visit();
  const entries = routes
    .map((route) => `<url><loc>${escapeXML(origin + route)}</loc></url>`)
    .join('\n');
  if (origin)
    await writeFile(
      path.join(target, 'sitemap.xml'),
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
        entries +
        '</urlset>',
    );
  console.log(
    'Academy integrated: ' +
      routes.length +
      ' content routes under ' +
      academyPrefix +
      '/',
  );
  return { routes: [academyPrefix + '/', ...routes], entries };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await assembleAcademy({ output: path.join(repo, '.generated/academy') });
}
