import { readFile, writeFile, stat, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { assembleAcademy } from './build-academy.mjs';
const root = path.resolve('dist/client');
const routes = [
  '/',
  '/zh/',
  '/en/',
  '/zh/process/',
  '/en/process/',
  '/zh/playbook/',
  '/en/playbook/',
];
// Export uses bare routes to avoid the framework's redirect during prerender.
// Materialize directory indexes for ordinary static hosts and our public URLs.
for (const route of routes) {
  if (route !== '/') {
    const bare = route.replace(/\/$/, '');
    await mkdir(path.join(root, route), { recursive: true });
    await copyFile(
      path.join(root, bare + '.html'),
      path.join(root, route, 'index.html'),
    );
    const rsc = path.join(root, bare + '.rsc');
    if (await stat(rsc).catch(() => null))
      await copyFile(rsc, path.join(root, route, 'index.rsc'));
  }
  await stat(path.join(root, route, 'index.html'));
}
const origin = process.env.SITE_URL?.replace(/\/$/, '');
if (origin && !/^https?:\/\/[^\s]+$/.test(origin))
  throw new Error('SITE_URL must be an absolute HTTP(S) URL.');
if (origin && new URL(origin).origin !== origin)
  throw new Error(
    'SITE_URL must be an origin without a path, query, credentials or fragment.',
  );
const academy = await assembleAcademy({
  output: path.join(root, 'academy'),
  origin,
});
routes.push(...academy.routes);
const xmlEscape = (value) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[char],
  );
let robots = 'User-agent: *\nAllow: /\n';
if (origin) {
  const pairs = ['', 'process/', 'playbook/'];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    pairs
      .flatMap((view) =>
        ['zh', 'en'].map(
          (lang) =>
            '<url><loc>' +
            xmlEscape(origin + '/' + lang + '/' + view) +
            '</loc>' +
            ['zh', 'en']
              .map(
                (l) =>
                  '<xhtml:link rel="alternate" hreflang="' +
                  (l === 'zh' ? 'zh-CN' : 'en') +
                  '" href="' +
                  xmlEscape(origin + '/' + l + '/' + view) +
                  '"/>',
              )
              .join('') +
            '</url>',
        ),
      )
      .join('\n') +
    '\n' +
    academy.entries +
    '\n</urlset>\n';
  await writeFile(path.join(root, 'sitemap.xml'), xml);
  robots += 'Sitemap: ' + origin + '/sitemap.xml\n';
} else
  console.warn(
    'SITE_URL is unset: no canonical domain, sitemap or absolute social-image URL is advertised. Set it and rebuild before launch.',
  );
await writeFile(path.join(root, 'robots.txt'), robots);
// Publish the readiness marker only after every public artifact is complete.
await writeFile(path.join(root, '404.html'), await readFile('public/404.html'));
await writeFile(
  path.join(root, 'build-info.json'),
  JSON.stringify(
    {
      name: 'FDE Business Capability',
      builtAt: new Date().toISOString(),
      languages: ['zh-CN', 'en'],
      routes,
      mode: 'static',
      requiresBackend: false,
      academy: {
        prefix: '/academy/',
        contentRoutes: academy.routes.length - 1,
      },
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'Static handoff ready: dist/client · ' +
    routes.length +
    ' routes · services + Academy · no backend.',
);
