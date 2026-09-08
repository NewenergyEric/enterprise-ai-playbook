import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {weeks} from './render.mjs';
import {cases,fieldCases} from '../content/cases.mjs';
import {paths,glossary,templates} from '../content/learning.mjs';
import {sources,sourceById} from '../content/sources.mjs';
import {workshops} from '../content/workshops.mjs';
import {notes,totalSections,preparation} from '../content/course.mjs';
import {renderNotes} from './lesson-markdown.mjs';
import {boards,boardSvg,illustrateLecture} from './visual-boards.mjs';
import {metric,gate,taskCost,difference,ActionSimulator} from '../public/assets/lab-logic.js';

let checks=0;
function check(name,fn){fn();checks++;console.log('PASS '+name);}
check('curriculum completeness',()=>{
 assert.equal(weeks.length,12);assert.equal(weeks.flatMap(w=>w.lessons).length,48);
 assert.equal(new Set(weeks.map(w=>w.id)).size,12);
 assert.equal(Object.keys(workshops).length,12);for(const w of weeks){const p=workshops[w.id];assert.equal(p.agenda.length,3);for(const l of ['zh','en'])assert.ok(p.artifact[l].length>100);}
 for(const w of weeks){assert.equal(w.lessons.length,4);assert.equal(w.tasks.length,3);assert.equal(w.rubric.length,3);assert.equal(w.quiz.options.length,3);assert.ok(w.quiz.answer>=0&&w.quiz.answer<=2);assert.ok(templates.some(t=>t.id===w.template));for(const ref of w.refs)assert.ok(sourceById[ref],ref);for(const lesson of w.lessons)for(const item of lesson)for(const l of ['zh','en'])assert.ok(item[l]?.length>10);}
});
check('paths, cases, references and worksheets',()=>{
 assert.equal(cases.length,9);assert.equal(fieldCases.length,10);assert.equal(paths.length,5);assert.equal(templates.length,16);assert.equal(glossary.length,30);assert.equal(sources.length,21);
 for(const c of [...cases,...fieldCases])for(const w of c.weeks)assert.ok(weeks.some(x=>x.id===w));
 for(const p of paths)for(const w of p.weeks)assert.ok(weeks.some(x=>x.id===w));
 assert.ok(!JSON.stringify(paths).includes('119'));
});
check('expanded practitioner manuscripts and safe rendering',()=>{
 assert.equal(totalSections,100);assert.equal(preparation.length,3);
 for(const w of weeks){
  const source=notes[w.id],rendered=renderNotes(source);
  assert.ok((source.match(/[\u3400-\u9fff]/g)||[]).length>1500,'Substantive notes W'+w.id);
  assert.ok(rendered.toc.length>=8,'Teaching sections W'+w.id);
  for(const label of ['必做','思考','进阶','验收要求'])assert.ok(source.includes(label),'Assignment structure '+label+' W'+w.id);
  assert.ok(rendered.html.includes('<table>'),'Concrete comparison W'+w.id);
 }
 assert.ok(notes['05'].includes('segment_members')&&notes['05'].includes('propose_operation'));
 assert.ok(/未知状态|结果未知|未知动作/.test(notes['09'])&&notes['09'].includes('持久化'));
 assert.ok(renderNotes('## One\n\n<script>alert(1)</script>').html.includes('&lt;script&gt;'));
 assert.throws(()=>renderNotes('## One\n\n[bad](javascript:alert)'),/Unsupported/);
 assert.throws(()=>renderNotes('## One\n\n```python\nunclosed'),/Unclosed/);
});
check('metric contract and rejected inputs',()=>{
 assert.deepEqual(metric(240,1000,1200),{rate:24,rawRate:20,gap:4});
 for(const args of [[1,0,3],[4,3,5],[1,3,2],[-1,3,3],[NaN,3,3]])assert.throws(()=>metric(...args));
});
check('24 bilingual teaching boards preserve all lecture content',()=>{
 assert.equal(boards.length,24);assert.equal(new Set(boards.map(b=>b.id)).size,24);
 for(const w of weeks){
  const weekly=boards.filter(b=>b.week===w.id);assert.equal(weekly.length,2);
  const input=renderNotes(notes[w.id]).html,output=illustrateLecture(input,w.id);
  assert.equal((output.match(/data-teaching-board=/g)||[]).length,2);
  assert.equal((output.match(/class="lecture-section"/g)||[]).length,renderNotes(notes[w.id]).toc.length);
 }
 for(const b of boards)for(const l of ['zh','en']){
  const svg=boardSvg(b,l);assert.ok(svg.includes('<desc>')&&svg.includes('viewBox="0 0 960 540"'));
  assert.ok(!/<script|foreignObject|<image|NaN|undefined/.test(svg),'Self-contained valid diagram '+b.id);
  assert.ok(svg.length>4000);
 }
 assert.ok(boardSvg(boards.find(b=>b.id==='quality'),'en').includes('14 = 11 + 1 + 2'));
 assert.ok(boardSvg(boards.find(b=>b.id==='did'),'en').includes('Not causal proof'));
});
check('safety gates cannot be averaged away',()=>{assert.equal(gate('a').passed,true);assert.equal(gate('b').passed,false);assert.equal(gate('c').passed,true);assert.ok(gate('b').average>gate('a').average);assert.throws(()=>gate('z'));});
check('successful-task cost includes review and failures',()=>{
 const result=taskCost({volume:1000,success:85,model:.5,tools:.1,review:2,hourly:120,fixed:1000});
 assert.equal(result.total,5600);assert.equal(result.completed,850);assert.ok(Math.abs(result.unit-6.588235294117647)<1e-10);
 for(const field of ['volume','success'])assert.throws(()=>taskCost({volume:1000,success:85,model:.5,tools:.1,review:2,hourly:120,fixed:1000,[field]:0}));
});
check('difference-in-differences arithmetic and bounds',()=>{assert.deepEqual(difference(20,28,18,23),{treatment:8,comparison:5,effect:3});assert.throws(()=>difference(-1,10,10,10));});
check('action scope, confirmation and replay',()=>{
 const sim=new ActionSimulator();assert.throws(()=>sim.preview('B',10),/DENIED_SCOPE/);assert.throws(()=>sim.preview('A',34),/BUDGET_EXCEEDED/);assert.throws(()=>sim.preview('A',1.5),/INVALID_AMOUNT/);
 const p=sim.preview('A',10);assert.throws(()=>sim.execute(p.token,'A',10,false),/CONFIRM_REQUIRED/);assert.throws(()=>sim.execute(p.token,'A',11,true),/PREVIEW_MISMATCH/);assert.equal(sim.spent,0);
 const first=sim.execute(p.token,'A',10,true);assert.equal(first.spent,60);assert.equal(sim.execute(p.token,'A',10,true).replayed,true);assert.equal(sim.spent,60);
});
check('budget rechecked at execution',()=>{const s=new ActionSimulator();const a=s.preview('A',20),b=s.preview('A',20);s.execute(a.token,'A',20,true);assert.throws(()=>s.execute(b.token,'A',20,true),/BUDGET_EXCEEDED/);assert.equal(s.spent,120);});

const root=path.resolve('dist');const routes=JSON.parse(await readFile('work/route-manifest.json','utf8'));
assert.equal(routes.length,82);const allFiles=[];
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else allFiles.push(p);}}
await walk(root);
const ids=new Map();const htmlMap=new Map();
for(const file of allFiles.filter(p=>p.endsWith('.html'))){const html=await readFile(file,'utf8');htmlMap.set(file,html);const values=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(values).size,values.length,'Duplicate IDs: '+file);ids.set(file,new Set(values));}
for(const [file,html] of htmlMap){assert.ok(!html.includes('把方法带走。')&&!html.includes('把下一次做得更好。'),'Retired slogan '+file);}
for(const w of weeks){
 const page=await readFile(path.join(root,'zh','curriculum',w.id,'index.html'),'utf8');
 assert.equal((page.match(/class="lecture-section"/g)||[]).length,renderNotes(notes[w.id]).toc.length);
 const download=await readFile(path.join(root,'downloads','zh',`week-${w.id}-lecture.md`),'utf8');
 assert.ok(download.includes(notes[w.id]));
 const english=await readFile(path.join(root,'en','curriculum',w.id,'index.html'),'utf8');
 assert.ok(english.includes('expanded practitioner lecture notes are currently available in Chinese'));
 for(const l of ['zh','en']){
  const html=l==='zh'?page:english;
  for(const b of boards.filter(b=>b.week===w.id)){
   assert.ok(html.includes('id="board-'+b.id+'"'),'Board anchor '+l+' '+b.id);
   assert.equal(await readFile(path.join(root,'assets','boards',l,b.id+'.svg'),'utf8'),boardSvg(b,l));
  }
 }
}
const expandedSearch=JSON.parse(await readFile(path.join(root,'assets','search-zh.json'),'utf8'));
assert.equal(expandedSearch.filter(s=>s.type==='详细讲义').length,totalSections);
for(const item of expandedSearch.filter(s=>s.type==='详细讲义'))assert.ok(item.text.length>80,'Searchable section content');
let links=0;
for(const [file,html] of htmlMap){
 if(path.basename(path.dirname(file))!=='dist')assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,'One h1: '+file);
 assert.ok(/<html lang="(?:zh-CN|en)"/.test(html),'Language: '+file);
 assert.ok(!/\[object Object\]|&lt;br(?:\s*\/)?&gt;|Kit documentation pending|练习包说明生成中/.test(html),'No template artifacts: '+file);
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=m[1].replaceAll('&amp;','&');if(/^(?:https?:|mailto:|data:)/.test(url))continue;
  const base='/'+path.relative(root,file).replaceAll('\\','/');const u=new URL(url,'http://local'+base);let target=path.join(root,decodeURIComponent(u.pathname));
  let info;try{info=await stat(target);}catch{assert.fail('Broken link '+url+' from '+file);}
  if(info.isDirectory())target=path.join(target,'index.html');await stat(target);
  if(u.hash&&target.endsWith('.html'))assert.ok(ids.get(target)?.has(decodeURIComponent(u.hash.slice(1)))||target.includes(path.sep+'labs'+path.sep)&&/^#[1-6]$/.test(u.hash),'Missing anchor '+url+' from '+file);
  links++;
 }
}
checks++;console.log(`PASS ${htmlMap.size} HTML files and ${links} internal links/assets/anchors`);
for(const file of allFiles.filter(p=>/\.(html|json|md|js|css|txt|svg)$/.test(p))){const body=await readFile(file,'utf8');assert.ok(!/file:\/\/|[A-Z]:[\\/](?:AI(?: Project)?|Business|Users)[\\/]|codex:\/\/threads\/|微信图片_\d+/.test(body),'Private source leakage: '+file);}
checks++;console.log('PASS public content privacy scan');
const pdf=await readFile(path.join(root,'downloads','AIelsen-FDE-Academy-Brochure.pdf'));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.ok(pdf.length>100000);
const zip=await readFile(path.join(root,'downloads','fde-practice-kit.zip'));assert.equal(zip.subarray(0,2).toString(),'PK');
for(const l of ['zh','en'])for(const t of templates)assert.ok((await readFile(path.join(root,'downloads',l,t.id+'.md'),'utf8')).length>600);
checks++;console.log('PASS brochure, practice archive and 32 worksheet downloads');
if(process.env.TEST_BASE_URL){
 const base=process.env.TEST_BASE_URL;const urls=[...routes,'/assets/app.js','/assets/lab-logic.js','/assets/site.css','/downloads/fde-practice-kit.zip','/downloads/AIelsen-FDE-Academy-Brochure.pdf'];
 for(let i=0;i<urls.length;i+=8)await Promise.all(urls.slice(i,i+8).map(async p=>{const r=await fetch(base+p,{method:'HEAD'});assert.equal(r.status,200,'HTTP '+p);}));
 assert.equal((await fetch(base+'/not-a-course/',{method:'HEAD'})).status,404);checks++;console.log(`PASS ${urls.length} HTTP routes and real 404`);
}
console.log(`All ${checks} test groups passed.`);
