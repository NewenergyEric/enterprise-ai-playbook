// Optional authoring utility. The shipped WOFF2 is ready to deploy.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const sourceFont = process.argv[2];
if (!sourceFont)
  throw new Error(
    'Usage: node scripts/subset-font.mjs <licensed NotoSansSC-VF.ttf>',
  );
async function textFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) =>
      e.isDirectory()
        ? textFiles(path.join(dir, e.name))
        : /\.(tsx?|css|md|html)$/.test(e.name)
          ? [path.join(dir, e.name)]
          : [],
    ),
  );
  return files.flat();
}
let text = Array.from({ length: 95 }, (_, i) =>
  String.fromCharCode(i + 32),
).join('');
for (const dir of ['app', 'components/fde', 'lib', 'public/resources'])
  for (const file of await textFiles(dir)) text += await readFile(file, 'utf8');
await mkdir('.generated', { recursive: true });
await writeFile('.generated/font-characters.txt', [...new Set(text)].join(''));
const result = spawnSync(
  'python',
  [
    '-m',
    'fontTools.subset',
    sourceFont,
    '--text-file=.generated/font-characters.txt',
    '--output-file=public/fonts/field-sans.woff2',
    '--flavor=woff2',
    '--layout-features=*',
    '--no-hinting',
    '--desubroutinize',
  ],
  { stdio: 'inherit' },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
console.log(
  'Font subset updated; original font is not copied into the repository.',
);
