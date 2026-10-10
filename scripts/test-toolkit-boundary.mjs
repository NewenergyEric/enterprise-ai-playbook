import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';

// The owner keeps the private Toolkit on GitHub, not on the business website.
const forbidden=/AIelsen-FDE-Toolkit|id=["']toolkit["']|\/(?:zh|en)\/#toolkit|toolkit-section|ToolkitTeaser/i;
for(const file of ['components/fde/home.tsx','components/fde/shell.tsx','app/globals.css']){
 assert(!forbidden.test(await readFile(file,'utf8')),`Unexpected Toolkit website entry in ${file}`);
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
 assert.equal(info.routes.length,110);
 await inspect('dist/client');
}
console.log(`PASS · Toolkit stays outside the business website${built?`; ${checked} public text files checked; 110 routes preserved`:''}.`);
