import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
// Check the public showcase, not an unrelated Toolkit blueprint that is absent
// from the maintained application branches.
const docs=['README.md','README.en.md','ASSETS.md','docs/studio/README.md'];
let refs=0;
for(const file of docs){
 const t=await fs.readFile(path.join(root,file),'utf8');
 assert(!/C:[\\/]Users[\\/]|E:[\\/](?:AI|Business)|sk-[A-Za-z0-9_-]{24,}|gh[pousr]_[A-Za-z0-9]{20,}/.test(t),`Sensitive path/token pattern in ${file}`);
 const links=[...t.matchAll(/(?:href|src)="([^"]+)"/g),...t.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]);
 for(const link of links){
   if(/^(?:https?:|#|mailto:)/.test(link)) continue;
   const target=path.resolve(root,path.dirname(file),decodeURIComponent(link.split('#')[0]));
   assert(target.startsWith(root+path.sep),`Reference escapes repository: ${file}`);
   await fs.access(target);refs++;
 }
}
const zh=await fs.readFile(path.join(root,'README.md'),'utf8'),en=await fs.readFile(path.join(root,'README.en.md'),'utf8');
assert(zh.includes('fde-motion-zh.gif')&&!zh.includes('fde-motion-en.gif'));
assert(en.includes('fde-motion-en.gif')&&!en.includes('fde-motion-zh.gif'));
assert(!/youtube\.com|youtu\.be|<iframe|<video/.test(zh+en),'No YouTube/embed block');
for(const text of [zh,en]){
 assert(text.includes('LICENSING.md')&&text.includes('SECURITY.md'),'Public usage and security guidance');
 assert(!text.includes('github.com/NewenergyEric/AIelsen-FDE-Toolkit'),'Do not advertise a private Toolkit download');
}
if(process.env.SHARP_MODULE){
 const sharp=createRequire(import.meta.url)(process.env.SHARP_MODULE);
 for(const lang of ['zh','en']){
   const file=path.join(root,`docs/media/fde-motion-${lang}.gif`),m=await sharp(file,{animated:true}).metadata();
   const record=JSON.parse(await fs.readFile(path.join(root,`docs/media/fde-motion-${lang}.json`),'utf8'));
   assert.equal(m.width,1100);assert.equal(m.pageHeight,650);assert.equal(m.loop,0);assert.equal(m.pages,360);
   assert.equal(m.delay.length,360);assert(m.delay.every(d=>d===50));
   assert.equal(m.delay.reduce((a,b)=>a+b,0),18000);assert((await fs.stat(file)).size<5e6);
   assert.equal(record.uniqueSourceFrames,360);assert.equal(record.uniqueObjectStates,360);
 }
}
console.log(JSON.stringify({result:'pass',documents:docs.length,localReferences:refs,bilingualHeroes:true,noVideoEmbed:true,gifMetadataChecked:Boolean(process.env.SHARP_MODULE)}));
