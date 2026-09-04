import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import { readSnapshot, resolveSnapshot } from './preview-snapshot.mjs';
async function loadSource(file) {
  const source = await readFile(file, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  return import(
    'data:text/javascript;base64,' + Buffer.from(outputText).toString('base64')
  );
}
const { plays, stages, faqs } = await loadSource('lib/content.ts');
const { filterPlays } = await loadSource('lib/playbook.ts');
const { localPath } = await loadSource('lib/site.ts');
// Check production SEO configuration without advertising a made-up domain.
const siteModule = ts.transpileModule(await readFile('lib/site.ts', 'utf8'), {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const siteModuleUrl =
  'data:text/javascript;base64,' + Buffer.from(siteModule).toString('base64');
const metadataModule = ts
  .transpileModule(await readFile('lib/metadata.ts', 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  .outputText.replace(
    /from ['"]\.\/site['"]/,
    'from ' + JSON.stringify(siteModuleUrl),
  );
const previousOrigin = process.env.SITE_URL;
try {
  delete process.env.SITE_URL;
  const localMetadata = await import(
    'data:text/javascript;base64,' +
      Buffer.from(metadataModule + '\n// local').toString('base64')
  );
  assert.equal(
    localMetadata.pageMetadata('en', 'home').metadataBase,
    undefined,
  );
  process.env.SITE_URL = 'https://example.test';
  const publicMetadata = await import(
    'data:text/javascript;base64,' +
      Buffer.from(metadataModule + '\n// public').toString('base64')
  );
  for (const lang of ['zh', 'en'])
    for (const view of ['home', 'process', 'playbook']) {
      const metadata = publicMetadata.pageMetadata(lang, view);
      assert.ok(metadata.title.endsWith(' · AIelsen FDE'));
      assert.equal(
        metadata.openGraph.siteName,
        'AIelsen FDE / Business Capability',
      );
      assert.equal(metadata.icons.icon, '/favicon.svg?v=aielsen');
      assert.equal(
        metadata.alternates.canonical,
        'https://example.test' + localPath(lang, view),
      );
      assert.equal(
        metadata.openGraph.images[0].url,
        'https://example.test/og.png',
      );
      assert.ok(metadata.alternates.languages['zh-CN']);
      assert.ok(metadata.alternates.languages.en);
    }
} finally {
  if (previousOrigin === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = previousOrigin;
}
console.log(
  'PASS · configured canonical URLs, language alternates and social-image URLs.',
);
assert.equal(plays.length, 9);
assert.equal(new Set(plays.map((p) => p.id)).size, 9);
assert.equal(stages.length, 6);
const fields = [
  'title',
  'promise',
  'question',
  'value',
  'method',
  'steps',
  'inputs',
  'outputs',
  'measures',
  'pilot',
  'judgment',
  'evidence',
];
for (const play of plays) {
  for (const field of fields)
    for (const lang of ['zh', 'en']) {
      const value = play[field][lang];
      assert.ok(value?.length > 0, play.id + '/' + field + '/' + lang);
      if (lang === 'en')
        assert.ok(
          !/[\u3400-\u9fff]/.test(JSON.stringify(value)),
          'Chinese leakage in English ' + play.id + '/' + field,
        );
    }
  assert.equal(play.steps.zh.length, 4);
  assert.equal(play.steps.en.length, 4);
  assert.equal(play.outputs.zh.length, play.outputs.en.length);
  assert.equal(play.measures.zh.length, play.measures.en.length);
}
for (const stage of stages)
  for (const copy of Object.values(stage)) assert.ok(copy.zh && copy.en);
for (const faq of faqs) assert.ok(faq.q.zh && faq.q.en && faq.a.zh && faq.a.en);
assert.equal(filterPlays(plays, 'zh', 'all', '').length, 9);
assert.equal(filterPlays(plays, 'en', 'growth', '').length, 4);
assert.equal(
  filterPlays(plays, 'en', 'all', 'MARKET ENTRY')[0].id,
  'market-entry',
);
assert.equal(
  filterPlays(plays, 'zh', 'all', '红人')[0].id,
  'creator-partnerships',
);
assert.equal(
  filterPlays(plays, 'en', 'all', 'unmatchable-query-9xyz').length,
  0,
);
assert.equal(filterPlays(plays, 'en', 'capability', '  ').length, 1);
for (const lang of ['zh', 'en'])
  for (const view of ['home', 'process', 'playbook']) {
    const route = localPath(lang, view);
    await access('app/(' + lang + ')' + route + 'page.tsx');
  }
for (const lang of ['zh', 'en'])
  for (const resource of [
    'fde-process-',
    'enterprise-playbook-',
    'pilot-brief-',
  ])
    await access(
      'public/resources/' +
        resource +
        lang +
        (resource === 'pilot-brief-' ? '.md' : '.pdf'),
    );
console.log(
  'PASS · 9 plays, 6 stages, bilingual field parity, English copy, filters, routes and downloads.',
);
let built = true;
try {
  await access('dist/client/index.html');
} catch {
  built = false;
}
if (built) {
  const root = path.resolve('dist/client');
  const snapshot = await readSnapshot(root);
  for (const route of [
    '/zh/playbook/',
    '/zh/process/',
    '/en/playbook/',
    '/en/process/',
  ]) {
    assert.equal(resolveSnapshot(snapshot, route).status, 200);
    const bare = resolveSnapshot(snapshot, route.slice(0, -1));
    assert.equal(bare.status, 308);
    assert.equal(bare.location, route);
  }
  assert.equal(resolveSnapshot(snapshot, '/missing-page/').status, 404);
  assert.equal(resolveSnapshot(snapshot, '/%2e%2e/private').status, 400);
  assert.equal(resolveSnapshot(snapshot, '/%5cprivate').status, 400);
  // Requests use the loaded Map and do not reopen a directory mid-rebuild.
  assert.ok(snapshot.files.get('/zh/playbook/index.html').length > 0);
  console.log(
    'PASS · preview snapshot routing, slash redirects and invalid-path rejection.',
  );
  const routes = [
    '/',
    '/zh/',
    '/en/',
    '/zh/process/',
    '/en/process/',
    '/zh/playbook/',
    '/en/playbook/',
  ];
  for (const route of routes) {
    const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
    const lang = route.startsWith('/en/') ? 'en' : 'zh-CN';
    assert.ok(
      html.includes('<html lang="' + lang + '"'),
      route + ' document language',
    );
    assert.ok(html.includes('<title>'), route + ' title');
    assert.match(
      html,
      /<title>[^<]*AIelsen FDE<\/title>/,
      route + ' branded title',
    );
    const brandLabel = lang === 'en' ? 'AIelsen FDE home' : 'AIelsen FDE 首页';
    assert.equal(
      (html.match(new RegExp('aria-label="' + brandLabel + '"', 'g')) || [])
        .length,
      2,
      route + ' accessible header and footer brand links',
    );
    assert.equal(
      (html.match(/class="brand-identity"/g) || []).length,
      2,
      route + ' AIelsen identity in header and footer',
    );
    assert.ok(html.includes('og:title'), route + ' social metadata');
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      route + ' single main heading',
    );
    assert.ok(
      !/file:\/\/|[A-Z]:[\\/](?:Business|AI(?: Project)?)[\\/]/.test(html),
      route + ' no local source paths',
    );
    for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      const url = match[1].split(/[?#]/)[0];
      if (url.startsWith('//')) continue;
      const file = path.join(
        root,
        decodeURIComponent(url),
        url.endsWith('/') ? 'index.html' : '',
      );
      await access(file).catch(() => {
        throw new Error(route + ' broken local link ' + url);
      });
    }
  }
  console.log(
    'PASS · 7 exported routes, correct document languages, metadata, headings and local resource links.',
  );
}
