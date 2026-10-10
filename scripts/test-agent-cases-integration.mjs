import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { readSnapshot, resolveSnapshot } from './preview-snapshot.mjs';

const repository = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(repository, 'dist/client');
const source = await readFile(
  path.join(repository, 'lib/agent-cases.ts'),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { agentCaseSlugs, agentCasesPath, relatedAgentCases } = await import(
  'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64')
);
assert.equal(agentCaseSlugs.length, 9);
assert.equal(new Set(agentCaseSlugs).size, 9);
assert.equal(agentCasesPath('zh'), '/agent-cases/');
assert.equal(agentCasesPath('en', 'ruby'), '/agent-cases/en/cases/ruby/');
assert.deepEqual(Object.keys(relatedAgentCases).sort(), [
  'business-analysis',
  'content-production',
  'creator-partnerships',
  'frontline-support',
]);
for (const links of Object.values(relatedAgentCases)) {
  for (const item of links) {
    assert.ok(agentCaseSlugs.includes(item.slug));
    assert.ok(item.zh && item.en);
    assert.ok(!/[\u3400-\u9fff]/.test(item.en));
  }
}
console.log(
  'PASS · Agent case language paths, 9 cases and 4 contextual mappings.',
);

const built = await access(path.join(output, 'build-info.json')).then(
  () => true,
  () => false,
);
if (!built) {
  console.log(
    'SKIP · Combined export is absent; run npm run build and npm test.',
  );
} else {
  const snapshot = await readSnapshot(output);
  const info = JSON.parse(snapshot.marker);
  assert.deepEqual(info.agentCases, {
    prefix: '/agent-cases/',
    contentRoutes: 20,
    languages: ['zh-CN', 'en'],
  });
  const base = process.env.SITE_URL || 'https://preview.example';
  const origin = new URL(base).origin;
  let references = 0;
  let downloads = 0;
  const expectedRoutes = [];
  const httpTargets = new Set();
  for (const lang of ['zh', 'en']) {
    for (const slug of [undefined, ...agentCaseSlugs]) {
      const route = agentCasesPath(lang, slug);
      expectedRoutes.push(route);
      httpTargets.add(route);
      assert.ok(info.routes.includes(route), `Missing route marker: ${route}`);
      assert.equal(resolveSnapshot(snapshot, route).status, 200);
      const bytes = snapshot.files.get(route + 'index.html');
      assert.ok(bytes, route);
      const html = bytes.toString('utf8');
      assert.ok(
        html.includes(`lang="${lang === 'zh' ? 'zh-CN' : 'en'}"`),
        route,
      );
      assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route);
      assert.ok(html.includes('assets/brand-palette.css'), route);
      assert.ok(
        !/<a\b[^>]*href="https:\/\/fde\.aielsen\.com\/(?:zh|en)\//.test(html),
        `Service-return links should stay on this host: ${route}`,
      );
      if (process.env.SITE_URL) {
        assert.ok(
          html.includes(`rel="canonical" href="${origin}${route}"`),
          route,
        );
        for (const other of ['zh', 'en']) {
          const code = other === 'zh' ? 'zh-CN' : 'en';
          assert.ok(
            html.includes(
              `hreflang="${code}" href="${origin}${agentCasesPath(other, slug)}"`,
            ),
          );
        }
      }
      for (const match of html.matchAll(/\b(?:href|src)="([^"<>]+)"/g)) {
        const value = match[1].replace(/&amp;/g, '&');
        if (/^(?:data:|mailto:|tel:|javascript:)/i.test(value)) continue;
        const url = new URL(value, origin + route);
        if (url.origin !== origin) continue;
        const result = resolveSnapshot(snapshot, url.pathname);
        assert.equal(
          result.status,
          200,
          `Broken case reference: ${route} -> ${value}`,
        );
        httpTargets.add(url.pathname);
        references++;
        if (url.hash && path.extname(result.file) === '.html') {
          const target = snapshot.files.get(result.file).toString('utf8');
          assert.ok(
            target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
            `Broken case anchor: ${route} -> ${value}`,
          );
        }
      }
      if (slug) {
        const filename =
          slug === 'bella'
            ? 'marketing-agent-playbook.md'
            : `${slug}-workbook.md`;
        const download = `${agentCasesPath(lang)}downloads/${filename}`;
        const data = snapshot.files.get(download);
        assert.ok(data && data.length > 200, download);
        assert.ok(!/^\s*<!doctype/i.test(data.toString('utf8')), download);
        downloads++;
        httpTargets.add(download);
      }
    }
    for (const view of ['', 'process/', 'playbook/']) {
      const route = `/${lang}/${view}`;
      const html = snapshot.files.get(route + 'index.html').toString('utf8');
      assert.ok(
        html.includes(`href="${agentCasesPath(lang)}"`),
        `Missing case navigation: ${route}`,
      );
      assert.ok(
        html.includes(`href="/academy/${lang}/"`),
        `Academy navigation removed: ${route}`,
      );
      httpTargets.add(route);
    }
  }
  assert.equal(expectedRoutes.length, 20);
  assert.equal(downloads, 18);
  assert.equal(new Set(info.routes).size, 112);
  assert.equal(
    resolveSnapshot(snapshot, '/agent-cases').location,
    '/agent-cases/',
  );
  assert.equal(
    resolveSnapshot(snapshot, '/agent-cases/en/cases/bella').location,
    '/agent-cases/en/cases/bella/',
  );
  const negativeRoutes = [
    '/agent-cases/missing/',
    '/agent-cases/en/missing/',
    '/agent-cases/fr/',
    '/agent-cases/tools/build.mjs',
    '/agent-cases/content/cases.mjs',
    '/agent-cases/README.md',
    '/agent-cases/.env',
    '/private/',
    '/missing/',
    '/academy/missing/',
  ];
  for (const route of negativeRoutes)
    assert.equal(resolveSnapshot(snapshot, route).status, 404, route);
  if (process.env.SITE_URL) {
    const xml = snapshot.files.get('/sitemap.xml').toString('utf8');
    for (const route of expectedRoutes)
      assert.ok(xml.includes(`<loc>${origin}${route}</loc>`), route);
    assert.equal([...xml.matchAll(/<loc>[^<]*\/agent-cases\//g)].length, 20);
  }
  console.log(
    `PASS · 20 bilingual cases, 18 workbooks, ${references} references and real 404 routes in the combined export.`,
  );
  if (process.env.TEST_BASE_URL) {
    for (const route of httpTargets) {
      const response = await fetch(new URL(route, process.env.TEST_BASE_URL), {
        redirect: 'manual',
      });
      assert.equal(response.status, 200, `HTTP ${route}`);
      if (route.endsWith('.md'))
        assert.ok(
          response.headers.get('content-type')?.includes('text/markdown'),
          route,
        );
      await response.arrayBuffer();
    }
    for (const route of negativeRoutes) {
      const response = await fetch(new URL(route, process.env.TEST_BASE_URL), {
        redirect: 'manual',
      });
      assert.equal(response.status, 404, `HTTP ${route}`);
      await response.arrayBuffer();
    }
    const redirect = await fetch(
      new URL('/agent-cases?from=nav', process.env.TEST_BASE_URL),
      { redirect: 'manual' },
    );
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get('location'), '/agent-cases/?from=nav');
    await redirect.arrayBuffer();
    console.log(
      `PASS · HTTP ${httpTargets.size} case/service resources, ${negativeRoutes.length} negative routes and query-preserving redirect.`,
    );
  }
}
