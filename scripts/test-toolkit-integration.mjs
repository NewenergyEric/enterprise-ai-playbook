import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const repo='https://github.com/NewenergyEric/AIelsen-FDE-Toolkit';
const source=await readFile('components/fde/toolkit.tsx','utf8');
assert(source.includes(repo));
assert(source.includes('GitHub 内容需访问权限')&&source.includes('GitHub access required'));
const css=await readFile('app/globals.css','utf8');
const toolkitStyles=css.slice(css.indexOf('.toolkit-section {'),css.indexOf('.toolkit-section {')+2400);
assert(!/color: var\(--muted\)/.test(toolkitStyles),'Toolkit text must use a foreground token, not the near-white surface token');
assert(toolkitStyles.includes('font-size: clamp(30px, 3.1vw, 46px)'),'Toolkit heading must retain editorial hierarchy');
const built=await access('dist/client/build-info.json').then(()=>true,()=>false);
if(built){
 const info=JSON.parse(await readFile('dist/client/build-info.json','utf8'));assert.equal(info.routes.length,110);
 for(const lang of ['zh','en']){
  const html=await readFile(`dist/client/${lang}/index.html`,'utf8');
  assert.equal([...html.matchAll(/id="toolkit"/g)].length,1);
  assert(html.includes(`href="/${lang}/#toolkit"`));
  assert(html.includes(`href="${repo}${lang==='en'?'/blob/main/README.en.md':''}"`));
  assert(html.includes(lang==='zh'?'条加工目录记录':'adapted catalog records'));
 }
}
console.log(`PASS · Bilingual Toolkit entrance, private-access disclosure${built?' and 110 unchanged routes':''}.`);
