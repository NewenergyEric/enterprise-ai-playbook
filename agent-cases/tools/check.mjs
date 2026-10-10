// Dependency-free checks for the public source package. No confidential identity lists.
import assert from 'node:assert/strict';
import {readFile,readdir,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ownRoot=fileURLToPath(new URL('../site/',import.meta.url));
export async function checkSite(root=ownRoot,{prefix=''}={}){
 root=path.resolve(root);const files=[];
 async function walk(dir){for(const entry of await readdir(dir)){const file=path.join(dir,entry),s=await lstat(file);assert(!s.isSymbolicLink(),'Symlink in public output');if(s.isDirectory())await walk(file);else files.push(file);}}
 await walk(root);const fileSet=new Set(files);const used=new Set();const ids=new Map();const refs=[];
 const pages=files.filter(f=>f.endsWith('.html'));
 assert.equal(pages.length,20,'Expected collection index and nine cases in each language');
 for(const file of pages){
  const html=await readFile(file,'utf8');used.add(file);
  assert(html.includes('assets/brand-palette.css'),'Every page must load the shared FDE palette');
  const relative=path.relative(root,file).replaceAll('\\','/'),isEnglish=relative.startsWith('en/');
  assert.match(html,isEnglish?/<html[^>]*lang="en"/:/<html[^>]*lang="zh-CN"/,'Page must identify its actual language');
  assert.equal((html.match(/data-language-link\b/g)||[]).length,2,'Every page needs two language links');
  assert.equal((html.match(/class="language-switcher"/g)||[]).length,1,'Every page needs one language switcher');
  for(const language of ['zh-CN','en','x-default'])assert(html.includes('hreflang="'+language+'"'),'Missing alternate language route');
  if(isEnglish)assert(!/[\u3400-\u9fff]/.test(html.replaceAll('中文','')),'Untranslated Chinese in an English page');
  for(const match of html.matchAll(/assets\/evidence\/([^"<>]+\.svg)/g))assert(match[1].endsWith(isEnglish?'-en.svg':'-zh.svg'),'Figure language must match the page');
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,'One main heading per page');
  const names=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(names.length,new Set(names).size,'Duplicate IDs');ids.set(file,new Set(names));
  for(const m of html.matchAll(/(?:href|src|data-artifact|data-full)="([^"]+)"/g))refs.push([file,m[1].replaceAll('&amp;','&')]);
  for(const m of html.matchAll(/<img\b[^>]*>/g))assert.match(m[0],/\balt="[^"]*"/,'Image needs alternative text');
  if(file.includes(path.sep+'cases'+path.sep)&&!file.includes(path.sep+'bella'+path.sep)){
   assert(html.includes('id="business"'),'Business brief is required');
   assert(html.includes('id="evidence"'),'Working illustration is required');
   assert(html.includes('id="engineering"'),'Technical details must remain available');
  }
 }
 for(const file of files.filter(f=>f.endsWith('.css'))){for(const m of (await readFile(file,'utf8')).matchAll(/url\(\s*['"]?([^)'"\s]+)/g))refs.push([file,m[1]]);}
 for(const [file,reference] of refs){
  if(/^(?:[a-z]+:|\/\/)/i.test(reference))continue;
  const [url,fragment]=reference.split('#');let pathname=decodeURIComponent(url.split('?')[0]);
  if(prefix&&pathname.startsWith(prefix))pathname='/'+pathname.slice(prefix.length);
  let target=pathname?path.resolve(pathname.startsWith('/')?root:path.dirname(file),pathname.startsWith('/')?'.'+pathname:pathname):file;
  assert(target===root||target.startsWith(root+path.sep),'Reference leaves public root');
  if(!path.extname(target))target=path.join(target,'index.html');
  assert(fileSet.has(target),'Missing local reference: '+reference);used.add(target);
  if(fragment&&ids.has(target))assert(ids.get(target).has(decodeURIComponent(fragment)),'Missing anchor: '+reference);
 }
 for(const file of files){
  const name=path.relative(root,file).replaceAll('\\','/');
  if(name.endsWith('FONT-LICENSE.txt'))used.add(file);
  if(/\.(html|css|js|svg|md|txt)$/.test(file)){
   const source=await readFile(file,'utf8');
   assert(!/(?:sk-[a-z0-9]{25,}|ghp_[a-z0-9]{25,}|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i.test(source),'Credential-like text in public output');
   assert(!/(?:[CE]:[\\/]|codex:\/\/threads)/i.test(source),'Local-machine reference in public output');
   if(name.startsWith('assets/evidence/')){const english=name.endsWith('-en.svg');assert(english||name.endsWith('-zh.svg'),'Artwork needs a locale suffix');assert(source.includes('lang="'+(english?'en':'zh-CN')+'"'),'Missing artwork language');if(english)assert(!/[\u3400-\u9fff]/.test(source),'Untranslated Chinese in an English figure');}
   if(name.startsWith('en/downloads/')||name==='assets/collection-en.js')assert(!/[\u3400-\u9fff]/.test(source),'Untranslated Chinese in an English download or interaction');
  }
 }
 const unexpected=files.filter(f=>!used.has(f));assert.deepEqual(unexpected,[],'Unreferenced public files must be reviewed');
 return {passed:true,pages:pages.length,publicFiles:files.length,localReferences:used.size};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await checkSite(),null,2));
