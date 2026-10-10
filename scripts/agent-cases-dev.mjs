import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleAgentCases } from './assemble-agent-cases.mjs';

const folder = fileURLToPath(
  new URL('../.generated/agent-cases/', import.meta.url),
);
const errorFile = fileURLToPath(new URL('../public/404.html', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

export function agentCasesDev() {
  return {
    name: 'fde-agent-cases-static-dev',
    async configureServer(server) {
      await assembleAgentCases({ output: folder });
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        if (
          url.pathname !== '/agent-cases' &&
          !url.pathname.startsWith('/agent-cases/')
        )
          return next();
        if (!['GET', 'HEAD'].includes(req.method || '')) {
          res.writeHead(405, { Allow: 'GET, HEAD' });
          res.end();
          return;
        }
        try {
          const decoded = decodeURIComponent(
            url.pathname.slice('/agent-cases'.length),
          );
          if (
            decoded.includes('\\') ||
            decoded.includes('\0') ||
            decoded.split('/').includes('..')
          )
            throw new Error('Invalid path');
          let file = path.resolve(folder, '.' + decoded);
          const relative = path.relative(folder, file);
          if (
            path.isAbsolute(relative) ||
            relative === '..' ||
            relative.startsWith(`..${path.sep}`)
          )
            throw new Error('Invalid path');
          if ((await stat(file)).isDirectory()) {
            if (!url.pathname.endsWith('/')) {
              res.writeHead(308, {
                Location: url.pathname + '/' + url.search,
                'Cache-Control': 'no-store',
              });
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
          res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
          });
          res.end(
            req.method === 'HEAD' ? undefined : await readFile(errorFile),
          );
        }
      });
    },
  };
}
