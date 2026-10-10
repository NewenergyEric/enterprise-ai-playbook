import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';

// The owner approved a request form, not public distribution of Toolkit files.
const forbidden=/AIelsen-FDE-Toolkit|id=["']toolkit["']|\/(?:zh|en)\/#toolkit|toolkit-section|ToolkitTeaser/i;
for(const file of ['components/fde/home.tsx','components/fde/shell.tsx','app/globals.css']){
 assert(!forbidden.test(await readFile(file,'utf8')),`Unexpected private Toolkit content in ${file}`);
}
assert(!(await access('components/fde/toolkit.tsx').then(()=>true,()=>false)),'Removed Toolkit component must stay outside this site');
const built=await access('dist/client/build-info.json').then(()=>true,()=>false);
let checked=0;
async function inspect(dir){
 for(const item of await readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,item.name);
  if(item.isDirectory())await inspect(file);
  else if(/\.(?:html|js|css|json|xml|txt|md|svg)$/i.test(item.name)){
   assert(!forbidden.test(await readFile(file,'utf8')),`Private Toolkit reference in public export: ${file}`);checked++;
  }
 }
}
if(built){
 const info=JSON.parse(await readFile('dist/client/build-info.json','utf8'));
 assert.equal(info.routes.length,112);
 for(const lang of ['zh','en']){
  assert(info.routes.includes(`/${lang}/toolkit/`),'Both request pages are present');
  const html=await readFile(`dist/client/${lang}/toolkit/index.html`,'utf8');
  assert(html.includes('toolkit-form'),'Request form preserved');
  assert(html.includes(lang==='zh'?'Agent 案例':'Agent Cases'),'Request pages retain Agent case navigation');
  assert(html.includes(lang==='zh'?'FDE 学院':'FDE Academy'),'Request pages retain Academy navigation');
  if(!process.env.TOOLKIT_LEAD_ENDPOINT || !process.env.TOOLKIT_PRIVACY_URL){
   assert(html.includes(lang==='zh'?'申请暂未开放；此表单不会提交信息。':'Requests are not open yet. This form will not submit information.'),'Unconfigured builds explicitly disable collection');
   assert(/<button[^>]*type="submit"[^>]*disabled/.test(html),'Unconfigured submit is disabled');
  }
 }
 await inspect('dist/client');
}
console.log(`PASS · Toolkit request UI is separate from private files${built?`; ${checked} public text files checked; 112 routes preserved`:''}.`);
