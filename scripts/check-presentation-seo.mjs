import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Audit the assembled artifact: source templates alone cannot prove that the
// three site sections use the same origin, language pairs and sitemap.
const repo = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(repo, 'dist/client');
const origin = process.env.SITE_URL?.replace(/\/$/, '');
assert(origin && new URL(origin).origin === origin, 'Set SITE_URL to the intended origin and build first');
const info = JSON.parse(await readFile(path.join(output, 'build-info.json'), 'utf8'));
assert.equal(info.routes.length, 112, 'Preserve the complete combined site');
const contentRoutes = info.routes.filter(route => !['/', '/academy/'].includes(route));
const order = (a, b) => a.localeCompare(b);
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&apos;', "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1].toLowerCase(), decode(m[2])]));
const pages = new Map();
for (const route of contentRoutes) {
  const html = await readFile(path.join(output, route, 'index.html'), 'utf8');
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert(head, route + ' has a head');
  const title = decode(head.match(/<title>([^<]+)<\/title>/i)?.[1] || '');
  assert(title.trim(), route + ' title');
  const meta = new Map([...head.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0])).map(a => [a.property || a.name, a.content]));
  for (const key of ['description', 'og:title', 'og:description', 'og:type', 'og:site_name', 'og:locale', 'og:image', 'twitter:card'])
    assert(meta.get(key)?.trim(), route + ' missing ' + key);
  assert.equal(meta.get('og:title'), title, route + ' social title');
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0]));
  const canonical = links.filter(a => a.rel === 'canonical');
  assert.equal(canonical.length, 1, route + ' one canonical');
  assert.equal(canonical[0].href, origin + route, route + ' canonical origin/path');
  assert.equal(meta.get('og:url'), origin + route, route + ' social URL');
  const alternates = links.filter(a => a.rel === 'alternate' && a.hreflang);
  assert.equal(alternates.length, 3, route + ' exactly three language alternates');
  const languages = Object.fromEntries(alternates.map(a => [a.hreflang, a.href]));
  assert.deepEqual(Object.keys(languages).sort(order), ['en', 'x-default', 'zh-CN']);
  const english = route.startsWith('/en/') || route.startsWith('/academy/en/') || route.startsWith('/agent-cases/en/');
  const lang = english ? 'en' : 'zh-CN';
  assert.equal(meta.get('og:locale'), english ? 'en_US' : 'zh_CN', route + ' social locale');
  assert.equal(languages[lang], origin + route, route + ' self alternate');
  assert.equal(languages['x-default'], languages['zh-CN'], route + ' existing Chinese default');
  for (const href of Object.values(languages)) {
    const url = new URL(href);
    assert.equal(url.origin, origin);
    assert(!url.search && !url.hash, route + ' clean alternate');
    assert(contentRoutes.includes(url.pathname), route + ' alternate exists');
  }
  const image = new URL(meta.get('og:image'));
  assert.equal(image.origin, origin);
  await access(path.join(output, image.pathname));
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const url = new URL(decode(match[1]), origin + route);
    if (url.origin === origin)
      assert(![...url.searchParams.keys()].some(key => key.toLowerCase().startsWith('utm_')), route + ' no internal campaign tracking');
  }
  pages.set(route, languages);
}
for (const [route, languages] of pages)
  for (const href of [languages.en, languages['zh-CN']])
    assert.deepEqual(pages.get(new URL(href).pathname), languages, route + ' reciprocal language pair');
const sitemap = await readFile(path.join(output, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decode(m[1]));
assert.equal(new Set(locations).size, locations.length, 'No duplicate sitemap entries');
assert.deepEqual(locations.sort(order), contentRoutes.map(route => origin + route).sort(order), 'Sitemap covers every canonical content page');
assert(!/utm_|localhost|127\.0\.0\.1/.test(sitemap), 'No campaign or preview URLs in sitemap');
const robots = await readFile(path.join(output, 'robots.txt'), 'utf8');
assert(robots.includes('Sitemap: ' + origin + '/sitemap.xml'));
assert(!/^Disallow:\s*\/\s*$/m.test(robots), 'Content is crawlable');
console.log(`PASS · ${pages.size} bilingual content pages: title/description/OG, reciprocal languages, canonical, images, sitemap/robots and clean internal links (${info.routes.length} total entries).`);
