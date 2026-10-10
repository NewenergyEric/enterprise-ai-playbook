import { readFile, readdir, mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';

// Ship attribution with the static output; this does not relicense dependencies.
const target = path.resolve('dist/client/licenses');
await mkdir(target, { recursive: true });
await copyFile('LICENSE', path.join(target, 'project-LICENSE.txt'));
await copyFile('THIRD_PARTY_NOTICES.md', path.join(target, 'THIRD_PARTY_NOTICES.md'));
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
const parts = ['Third-party npm notices\nOriginal project license: project-LICENSE.txt\n'];
let count = 0;
for (const dir of Object.keys(lock.packages).sort()) {
  if (!dir.startsWith('node_modules/')) continue;
  let pkg;
  try { pkg = JSON.parse(await readFile(path.join(dir, 'package.json'), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  const files = (await readdir(dir)).filter((name) => /^(licen[sc]e|copying|notice)([.-]|$)/i.test(name));
  const texts = [];
  for (const name of files) {
    try { texts.push(`${name}\n${await readFile(path.join(dir, name), 'utf8')}`); }
    catch (error) { if (error.code !== 'EISDIR') throw error; }
  }
  parts.push(`\n${'='.repeat(72)}\n${pkg.name}@${pkg.version}\nDeclared license: ${JSON.stringify(pkg.license ?? 'See package')}${texts.length ? '\n\n'+texts.join('\n\n') : '\nUpstream license text: see the published package.'}`);
  count++;
}
await writeFile(path.join(target, 'npm-notices.txt'), parts.join('\n'));
console.log(`License notices emitted for ${count} installed npm packages.`);
