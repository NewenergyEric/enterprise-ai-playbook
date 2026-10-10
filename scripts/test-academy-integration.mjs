import assert from 'node:assert/strict';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { academyURL, adaptAcademyHTML } from './build-academy.mjs';
import { readSnapshot, resolveSnapshot } from './preview-snapshot.mjs';

const repo = fileURLToPath(new URL('../', import.meta.url));
const root = path.join(repo, 'dist/client');
assert.equal(
  academyURL('/zh/curriculum/05/#board-ontology'),
  '/academy/zh/curriculum/05/#board-ontology',
);
assert.equal(academyURL('/academy/en/'), '/academy/en/');
assert.equal(academyURL('//example.test/a'), '//example.test/a');
assert.equal(academyURL('https://example.test/a'), 'https://example.test/a');
assert.equal(academyURL('https://fde.aielsen.com/zh/'), '/zh/');
assert.equal(academyURL('#main'), '#main');
const sample = adaptAcademyHTML(
  '<head><link rel="alternate" hreflang="en" href="/en/"></head><a href="/zh/">ZH</a><img src="/assets/a.svg"><a href="https://fde.aielsen.com/en/">Service</a><meta content="0;url=/zh/">',
  '/academy/zh/',
  'https://example.test',
);
assert.ok(sample.includes('href="https://example.test/academy/en/"'));
assert.ok(
  sample.includes('rel="canonical" href="https://example.test/academy/zh/"'),
);
assert.ok(sample.includes('href="/en/"'));
assert.ok(sample.includes('src="/academy/assets/a.svg"'));
assert.ok(sample.includes('content="0;url=/academy/zh/"'));

const source = await readFile(path.join(repo, 'lib/academy.ts'), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
const { academyPath, stageLearning, playLearning } = await import(
  'data:text/javascript;base64,' + Buffer.from(outputText).toString('base64')
);
assert.equal(
  academyPath('en', '/curriculum/05/'),
  '/academy/en/curriculum/05/',
);
assert.equal(stageLearning.length, 6);
assert.equal(Object.keys(playLearning).length, 9);
console.log('PASS · Academy URL adapter and 6 stage / 9 play mappings.');

const built = await access(path.join(root, 'academy/zh/index.html')).then(
  () => true,
  () => false,
);
if (!built) {
  console.log(
    'SKIP · Integrated export does not exist yet; run npm run build, then npm test.',
  );
} else {
  const snapshot = await readSnapshot(root);
  const info = JSON.parse(snapshot.marker);
  assert.equal(info.routes.length, 92);
  assert.equal(info.academy.contentRoutes, 82);
  assert.equal(resolveSnapshot(snapshot, '/academy').location, '/academy/');
  assert.equal(
    resolveSnapshot(snapshot, '/academy/en/curriculum/05').location,
    '/academy/en/curriculum/05/',
  );
  assert.equal(resolveSnapshot(snapshot, '/academy/missing/').status, 404);
  assert.equal(
    resolveSnapshot(snapshot, '/academy/missing/').file,
    '/academy/404.html',
  );
  assert.equal(
    resolveSnapshot(snapshot, '/academy/%2e%2e/private').status,
    400,
  );
  const files = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(file);
      else files.push(file);
    }
  }
  await walk(root);
  const pages = new Map();
  for (const file of files.filter((f) => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    pages.set(file, {
      html,
      ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])),
    });
  }
  let links = 0;
  for (const [file, { html }] of pages) {
    const pathname = '/' + path.relative(root, file).split(path.sep).join('/');
    if (pathname.startsWith('/academy/')) {
      assert.ok(
        !/\b(?:src|href)="\/(?:assets|downloads)\//.test(html),
        'Unprefixed Academy asset: ' + pathname,
      );
      if (/\/(?:zh|en)\//.test(pathname))
        assert.ok(
          html.includes(
            'href="/' + (pathname.includes('/en/') ? 'en' : 'zh') + '/"',
          ),
          'Return to services: ' + pathname,
        );
    }
    for (const [, raw] of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
      const href = raw.replaceAll('&amp;', '&');
      const url = new URL(href, 'http://local' + pathname);
      if (url.origin !== 'http://local') continue;
      let target = path.join(root, decodeURIComponent(url.pathname));
      const entry = await stat(target).catch(() =>
        assert.fail(pathname + ' broken URL: ' + href),
      );
      if (entry.isDirectory()) target = path.join(target, 'index.html');
      await access(target);
      if (url.hash && pages.has(target)) {
        const hash = decodeURIComponent(url.hash.slice(1));
        const browserTab =
          url.pathname.includes('/playbook/') ||
          (url.pathname.includes('/labs/') && /^[1-6]$/.test(hash));
        assert.ok(
          browserTab || pages.get(target).ids.has(hash),
          pathname + ' missing anchor: ' + href,
        );
      }
      links++;
    }
  }
  for (const lang of ['zh', 'en']) {
    const home = await readFile(path.join(root, lang, 'index.html'), 'utf8');
    assert.ok(
      home.indexOf('id="resources"') < home.indexOf('id="academy"') &&
        home.indexOf('id="academy"') < home.indexOf('id="faq"'),
    );
    assert.ok(
      home.includes('href="/' + lang + '/playbook/"') &&
        home.includes('href="/' + lang + '/process/"'),
    );
    for (const item of stageLearning)
      await access(
        path.join(
          root,
          academyPath(lang, 'curriculum/' + item.week),
          'index.html',
        ),
      );
    for (const item of Object.values(playLearning)) {
      await access(
        path.join(
          root,
          academyPath(lang, 'cases/field-' + item.case),
          'index.html',
        ),
      );
      await access(
        path.join(
          root,
          academyPath(lang, 'curriculum/' + item.week),
          'index.html',
        ),
      );
    }
    const entries = JSON.parse(
      await readFile(
        path.join(root, 'academy/assets/search-' + lang + '.json'),
        'utf8',
      ),
    );
    for (const item of entries) {
      assert.ok(item.url.startsWith('/academy/' + lang + '/'));
      const url = new URL(item.url, 'http://local');
      const file = path.join(root, url.pathname, 'index.html');
      await access(file);
      if (url.hash) assert.ok(pages.get(file)?.ids.has(url.hash.slice(1)));
    }
  }
  assert.ok(
    (await readFile(path.join(root, 'academy/assets/app.js'), 'utf8')).includes(
      'new URL(`search-${lang}.json`, import.meta.url)',
    ),
  );
  assert.ok(
    (
      await readFile(path.join(root, 'academy/assets/visuals.js'), 'utf8')
    ).includes('new URL(`boards/'),
  );
  assert.ok(
    (
      await readFile(path.join(root, 'academy/assets/site.css'), 'utf8')
    ).includes("url('./field-sans.woff2')"),
  );
  if (process.env.SITE_URL) {
    const origin = process.env.SITE_URL.replace(/\/$/, '');
    const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
    assert.equal((sitemap.match(/<url>/g) || []).length, 90);
    for (const route of info.routes.filter((p) => /\/(?:zh|en)\//.test(p)))
      assert.ok(sitemap.includes('<loc>' + origin + route + '</loc>'));
    const course = await readFile(
      path.join(root, 'academy/en/curriculum/05/index.html'),
      'utf8',
    );
    assert.ok(
      course.includes(
        'rel="canonical" href="' + origin + '/academy/en/curriculum/05/"',
      ),
    );
  }
  assert.ok(
    !files.some((f) =>
      /[\\/](?:work|tmp|node_modules|practice-kit)[\\/]/.test(
        path.relative(root, f),
      ),
    ),
    'No private/build/source directories published',
  );
  console.log(
    `PASS · ${pages.size} HTML files, ${links} local links/assets/anchors, both search indexes, downloads, service returns and 92 public routes.`,
  );
  if (process.env.TEST_BASE_URL) {
    const base = process.env.TEST_BASE_URL.replace(/\/$/, '');
    const urls = [
      ...info.routes,
      '/academy/assets/search-zh.json',
      '/academy/assets/boards/zh/ontology.svg',
      '/academy/assets/boards/en/ontology.svg',
      '/academy/downloads/AIelsen-FDE-Academy-Brochure.pdf',
      '/academy/downloads/fde-practice-kit.zip',
    ];
    for (let i = 0; i < urls.length; i += 8)
      await Promise.all(
        urls
          .slice(i, i + 8)
          .map(async (url) =>
            assert.equal(
              (await fetch(base + url, { method: 'HEAD' })).status,
              200,
              'HTTP ' + url,
            ),
          ),
      );
    for (const route of ['/not-a-page/', '/academy/not-a-page/'])
      assert.equal((await fetch(base + route)).status, 404);
    const redirect = await fetch(base + '/academy/en/curriculum/05', {
      redirect: 'manual',
    });
    assert.equal(redirect.status, 308);
    assert.ok(
      redirect.headers.get('location').endsWith('/academy/en/curriculum/05/'),
    );
    console.log(
      `PASS · ${urls.length} HTTP URLs, slash redirect and service/Academy 404s.`,
    );
  }
}
