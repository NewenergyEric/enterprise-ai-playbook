import {mkdir,writeFile,cp,readFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {shell,casesPage,casePage,glossaryPage,sourcesPage,weeks} from './render.mjs';
import {home,curriculumPage,modulePage,pathsPage,resourcesPage,enterprisePage,cleanCopy} from './teaching-render.mjs';
import {notes,totalSections} from '../content/course.mjs';
import {renderNotes} from './lesson-markdown.mjs';
import {boards,boardSvg,viewer} from './visual-boards.mjs';
import {phaseArt} from './field-illustrations.mjs';
import {labsPage,guidePage} from './extra-pages.mjs';
import {cases,fieldCases} from '../content/cases.mjs';
import {templates,glossary} from '../content/learning.mjs';
import {workshops} from '../content/workshops.mjs';
import {sources} from '../content/sources.mjs';
const root=path.resolve('dist');
if(root!==fileURLToPath(new URL('../dist',import.meta.url)))throw Error('Build must run from the academy source directory');
await rm(root,{recursive:true,force:true});await mkdir(root,{recursive:true});
const manifest=[];let fontText='';
const searchExtras={zh:[],en:[]};
async function page(lang,slug,title,body){const html=cleanCopy(shell(lang,slug,title,body+viewer(lang)),lang).replace('</head>','<link rel="stylesheet" href="/assets/teaching.css"><link rel="stylesheet" href="/assets/visuals.css"><script type="module" src="/assets/visuals.js"></script></head>').replace('<script src="/assets/app.js" defer>','<script src="/assets/app.js" type="module">');const dest=path.join(root,lang,slug,'index.html');await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,html,'utf8');manifest.push('/'+lang+'/'+(slug?slug+'/':''));fontText+=html.replace(/<[^>]+>/g,'');if(['paths','labs','resources','enterprise','guide'].includes(slug))searchExtras[lang].push({title,type:lang==='zh'?'指南与资源':'Guide and resource',url:'/'+lang+'/'+slug+'/',description:title,text:body.replace(/<[^>]+>/g,' ')});}
for(const l of ['zh','en']){
 await page(l,'',l==='zh'?'FDE 交付实战课程':'FDE engineering and delivery',home(l));
 for(const [slug,zh,en,fn] of [['curriculum','课程大纲','Curriculum',curriculumPage],['cases','案例与业务实作','Cases and field practice',casesPage],['paths','学习前提与准备','Prerequisites',pathsPage],['labs','交互实验台','Interactive labs',labsPage],['resources','课程资料与工程实训包','Course materials',resourcesPage],['enterprise','企业共训','Enterprise learning',enterprisePage],['guide','讲师与结业指南','Instructor and capstone guide',guidePage],['glossary','关键概念','Concept atlas',glossaryPage],['sources','来源与内容边界','Sources and boundaries',sourcesPage]])await page(l,slug,l==='zh'?zh:en,fn(l));
 for(const w of weeks)await page(l,'curriculum/'+w.id,`W${w.id} · ${w.title[l]}`,modulePage(w,l));
 for(const c of cases)await page(l,'cases/'+c.id,c.title[l],casePage(c,l));
 for(const c of fieldCases)await page(l,'cases/field-'+c.id,c.title[l],casePage(c,l,true));
 const search=[...(l==='zh'?weeks.flatMap(w=>renderNotes(notes[w.id]).toc.map(t=>({title:`W${w.id} · ${t.title}`,type:'详细讲义',url:`/zh/curriculum/${w.id}/#${t.id}`,description:w.title.zh,text:notes[w.id].split(/^## /m).find(s=>s.startsWith(t.title))||''}))):[]),...weeks.map(w=>({title:`W${w.id} · ${w.title[l]}`,type:l==='zh'?'课程':'Module',url:`/${l}/curriculum/${w.id}/`,description:w.subtitle[l],text:[w.outcome[l],...w.lessons.flatMap(x=>x.map(b=>b[l])),...Object.values(workshops[w.id]).flatMap(v=>Array.isArray(v)?v.map(b=>b[l]):v[l])].join(' ')})),...cases.map(c=>({title:c.title[l],type:l==='zh'?'公开案例':'Public case',url:`/${l}/cases/${c.id}/`,description:typeof c.name==='object'?c.name[l]:c.name,text:[c.sector[l],c.fact[l],c.lesson[l]].join(' ')})),...fieldCases.map(c=>({title:c.title[l],type:l==='zh'?'业务实作':'Field practice',url:`/${l}/cases/field-${c.id}/`,description:c.sector[l],text:c.problem[l]+' '+c.lesson[l]})),...glossary.map(g=>({title:g.term,type:l==='zh'?'概念':'Concept',url:`/${l}/glossary/`,description:g.definition[l],text:g.name})),...searchExtras[l],...templates.map(t=>({title:t.title[l],type:l==='zh'?'模板':'Worksheet',url:`/${l}/resources/`,description:t.fields[l].join(' · '),text:t.title[l]})),...sources.map(s=>({title:s.title,type:l==='zh'?'参考来源':'Source',url:`/${l}/sources/`,description:s.publisher+' · '+s.date,text:s.note[l]}))];
 await mkdir(path.join(root,'assets'),{recursive:true});await writeFile(path.join(root,'assets',`search-${l}.json`),JSON.stringify(search));
 const downloads=path.join(root,'downloads',l);await mkdir(downloads,{recursive:true});
 if(l==='zh'){
  for(const w of weeks)await writeFile(path.join(downloads,`week-${w.id}-lecture.md`),`# AIelsen FDE Academy · W${w.id} ${w.title.zh}\n\n面向 FDE 的中文详细讲义 · v2 · 2026-09-08\n\n${notes[w.id]}`);
  await writeFile(path.join(downloads,'fde-complete-lectures.md'),'# AIelsen FDE 交付实战课程 · 完整中文讲义\n\n合成教学项目；不含客户资料。代码片段与可运行工程包边界详见正文。\n\n'+weeks.map(w=>`# W${w.id} ${w.title.zh}\n\n${notes[w.id]}`).join('\n\n---\n\n'));
 }
 for(const t of templates){const m=weeks.find(w=>w.template===t.id);const intro=l==='zh'?'此模板用于教学或获授权的内部工作。请勿填入秘密、客户身份或密钥。所有下方示例为教学情景，实际法律和商业约定需专业复核。':'For education or authorized internal work. Do not include secrets, customer identities or keys. Examples are teaching scenarios; actual legal and commercial arrangements require professional review.';const content=`# AIelsen FDE Academy / ${t.title[l]}\n\n${intro}\n\n## ${l==='zh'?'使用方法':'How to use'}\n\n${l==='zh'?'先阅读对应讲义。每个字段写一项判断，并附证据位置、版本和责任角色；未知项明确写“待验证”，不要用模型填充为事实。':'Read the related lesson. Give a decision, evidence location, version and owner for each field. Mark unknowns as unverified; do not have a model invent facts.'}\n\n${t.fields[l].map((f,i)=>`### ${i+1}. ${f}\n\n- ${l==='zh'?'内容 / 判断：':'Content / decision:'}\n- ${l==='zh'?'证据 / 版本：':'Evidence / version:'}\n- ${l==='zh'?'负责人 / 待验证：':'Owner / open question:'}\n`).join('\n')}\n## ${l==='zh'?'参考练习与检查':'Practice and review'}\n\n${m?m.example[l]:(l==='zh'?'示例：合成会员唤回任务。只有 A 店数据访问权；建议需引用有效订单与规则；写入前需确认范围和金额。遇到权限未知或证据不足，停止执行并记录验证计划。':'Example: synthetic member re-engagement with store-A access only. Advice cites valid orders and policies; writing requires confirmed scope and amount. Unknown authorization or insufficient evidence stops execution.')}\n\n${(m?m.rubric:[]).map(r=>'- [ ] '+r[l]).join('\n')}\n\n## ${l==='zh'?'修订记录':'Revision log'}\n\n| Version | Date | Change | Evidence | Owner |\n|---|---|---|---|---|\n| v0.1 | | | | |\n\nAIelsen FDE Academy · Educational worksheet · 2026\n`;await writeFile(path.join(downloads,t.id+'.md'),content);}
 await writeFile(path.join(downloads,'kit-guide.md'),await readFile(`practice-kit/README.${l}.md`,'utf8').catch(()=>l==='zh'?'练习包说明生成中':'Kit documentation pending'));
}
await cp('public',root,{recursive:true});
for(const l of ['zh','en']){
 const folder=path.join(root,'assets','boards',l);await mkdir(folder,{recursive:true});
 for(const b of boards)await writeFile(path.join(folder,b.id+'.svg'),boardSvg(b,l));
}
await mkdir(path.join(root,'assets','illustrations'),{recursive:true});
for(let i=0;i<4;i++)await writeFile(path.join(root,'assets','illustrations','phase-'+(i+1)+'.svg'),phaseArt(i));
await writeFile(path.join(root,'index.html'),'<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/zh/"><title>AIelsen FDE Academy</title></head><body><a href="/zh/">中文</a> / <a href="/en/">English</a></body></html>');
await writeFile(path.join(root,'404.html'),shell('zh','','页面未找到 / Page not found','<section class="section"><div class="wrap"><div class="eyebrow">404 / NOT FOUND</div><h1 style="margin:25px 0">这条路径暂不存在。<br>This path is not here.</h1><p>请从课程或搜索继续 / Continue with the curriculum or search.</p><div class="actions"><a class="btn" href="/zh/curriculum/">中文课程 ↗</a><a class="btn secondary" href="/en/curriculum/">English curriculum ↗</a></div></div></section>').replace('<script src="/assets/app.js" defer>','<script src="/assets/app.js" type="module">'));
await writeFile(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\n');
await mkdir('work',{recursive:true});await writeFile('work/route-manifest.json',JSON.stringify(manifest,null,2));await writeFile('work/font-text.txt',fontText+await readFile('public/assets/app.js','utf8').catch(()=>''));
if(process.env.SITE_URL){const url=new URL(process.env.SITE_URL);if(!['https:','http:'].includes(url.protocol))throw Error('SITE_URL must be HTTP(S)');await writeFile(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+manifest.map(p=>'<url><loc>'+url.origin+p+'</loc></url>').join('')+'</urlset>');}
process.stdout.write(`Built ${manifest.length} bilingual pages, ${totalSections} detailed Chinese sections, ${cases.length+fieldCases.length} cases, ${templates.length*2} worksheets.\n`);
