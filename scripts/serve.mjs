import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readSnapshot, resolveSnapshot } from './preview-snapshot.mjs';

// Resolve from the script, so launching from another directory remains safe.
const root = fileURLToPath(new URL('../dist/client/', import.meta.url));
const host = process.env.PREVIEW_HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4179);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.rsc': 'text/x-component',
};
let snapshot = await readSnapshot(root).catch(() => {
  throw new Error('Run npm run build before npm run preview.');
});
let loading = false;
const refresh = setInterval(async () => {
  if (loading) return;
  loading = true;
  try {
    const marker = await readFile(path.join(root, 'build-info.json'), 'utf8');
    if (marker !== snapshot.marker) {
      const next = await readSnapshot(root);
      snapshot = next;
      console.log('Preview updated to a complete build.');
    }
  } catch {
    // A rebuild may replace the output folder. Keep serving the last complete
    // snapshot until postbuild has written its final readiness marker.
  } finally {
    loading = false;
  }
}, 1000);
refresh.unref();

const server = http.createServer((req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method || '')) {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      res.end();
      return;
    }
    const url = new URL(req.url || '/', 'http://localhost');
    const current = snapshot;
    const result = resolveSnapshot(current, url.pathname);
    if (result.status === 308) {
      res.writeHead(308, {
        Location: result.location + url.search,
        'Cache-Control': 'no-store',
      });
      res.end();
      return;
    }
    const data = current.files.get(result.file);
    if (!data) throw new Error('Incomplete snapshot');
    res.writeHead(result.status, {
      'Content-Type':
        mime[path.extname(result.file)] || 'application/octet-stream',
      'Content-Length': data.length,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-store',
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(400, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    res.end('Bad request');
  }
});
server.listen(port, host, () =>
  console.log('FDE static preview: http://' + host + ':' + port + '/'),
);
function close() {
  clearInterval(refresh);
  server.close();
}
process.on('SIGINT', close);
process.on('SIGTERM', close);
