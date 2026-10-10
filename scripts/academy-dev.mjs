import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleAcademy } from './build-academy.mjs';

const folder = fileURLToPath(
  new URL('../.generated/academy/', import.meta.url),
);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.md': 'text/markdown; charset=utf-8',
};

export function academyDev() {
  return {
    name: 'fde-academy-static-dev',
    async configureServer(server) {
      await assembleAcademy({ output: folder });
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        if (
          url.pathname !== '/academy' &&
          !url.pathname.startsWith('/academy/')
        )
          return next();
        if (!['GET', 'HEAD'].includes(req.method || '')) {
          res.writeHead(405, { Allow: 'GET, HEAD' });
          res.end();
          return;
        }
        try {
          const decoded = decodeURIComponent(
            url.pathname.slice('/academy'.length),
          );
          if (
            decoded.includes('\\') ||
            decoded.includes('\0') ||
            decoded.split('/').includes('..')
          )
            throw new Error('Invalid path');
          let file = path.resolve(folder, '.' + decoded);
          if (file !== path.resolve(folder) && !file.startsWith(folder))
            throw new Error('Invalid path');
          if ((await stat(file)).isDirectory()) {
            if (!url.pathname.endsWith('/')) {
              res.writeHead(308, { Location: url.pathname + '/' + url.search });
              res.end();
              return;
            }
            file = path.join(file, 'index.html');
          }
          const data = await readFile(file);
          res.writeHead(200, {
            'Content-Type':
              types[path.extname(file)] || 'application/octet-stream',
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
          });
          res.end(req.method === 'HEAD' ? undefined : data);
        } catch {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(
            req.method === 'HEAD'
              ? undefined
              : await readFile(path.join(folder, '404.html')),
          );
        }
      });
    },
  };
}
