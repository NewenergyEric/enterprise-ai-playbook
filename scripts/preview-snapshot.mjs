import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const requiredPaths = [
  '/',
  '/zh/',
  '/en/',
  '/zh/process/',
  '/en/process/',
  '/zh/playbook/',
  '/en/playbook/',
];

export async function readSnapshot(root) {
  const before = await readFile(path.join(root, 'build-info.json'), 'utf8');
  const files = new Map();
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile()) {
        const key = '/' + path.relative(root, file).split(path.sep).join('/');
        files.set(key, await readFile(file));
      }
    }
  }
  await visit(root);
  for (const route of requiredPaths) {
    if (!files.has(route + 'index.html'))
      throw new Error('Incomplete build: ' + route);
  }
  if (!files.has('/404.html')) throw new Error('Missing 404 document');
  const after = await readFile(path.join(root, 'build-info.json'), 'utf8');
  if (before !== after) throw new Error('Build changed while loading');
  return { marker: after, files };
}

export function resolveSnapshot(snapshot, pathname) {
  const decoded = decodeURIComponent(pathname);
  if (
    decoded.includes('\\') ||
    decoded.split('/').includes('..') ||
    decoded.includes('\0')
  ) {
    return { status: 400, file: '/404.html' };
  }
  if (snapshot.files.has(decoded)) return { status: 200, file: decoded };
  const index = decoded.replace(/\/$/, '') + '/index.html';
  if (snapshot.files.has(index)) {
    if (!decoded.endsWith('/')) return { status: 308, location: decoded + '/' };
    return { status: 200, file: index };
  }
  return { status: 404, file: '/404.html' };
}
