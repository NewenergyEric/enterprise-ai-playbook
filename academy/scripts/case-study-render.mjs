import {helpers,weeks,esc} from './render.mjs';
import {B} from '../content/curriculum.mjs';
import {cases,fieldCases} from '../content/cases.mjs';
import {studies} from '../content/case-studies.mjs';
import {fieldStudies} from '../content/field-studies.mjs';
import {sourceById} from '../content/sources.mjs';
import {boards,boardFigure} from './visual-boards.mjs';
const {T,L,txt,button,eyebrow,pageHero}=helpers;
export const studyFor=c=>studies[c.id]||fieldStudies[c.id];
export const studySearch=(c,l)=>{
 const values=[];
 function collect(x){if(Array.isArray(x))x.forEach(collect);else if(x&&typeof x==='object'){if(typeof x[l]==='string')values.push(x[l]);else Object.values(x).forEach(collect);}}
 collect(studyFor(c));return values.join(' ');
};
const localRefs=c=>c.id==='aig'?[...c.refs,'aig-report']:c.refs||['agents','evals'];
const sections=[['context',B('问题与背景','Problem and context')],['discovery',B('如何发现问题','Discover the problem')],['solution',B('关键行动','Key actions')],['decisions',B('关键判断','Key decisions')],['worked',B('样例拆解','Worked example')],['coursework',B('对应课程与交付物','Coursework and outputs')],['review',B('验收与复用','Acceptance and reuse')]];
const blockHead=(l,n,tag,zh,en)=>`${eyebrow(`${n} / ${tag}`)}<h2>${txt(l,zh,en)}</h2>`;
const points=(arr,l,cls='study-points')=>`<div class="${cls}">${arr.map((x,i)=>`<div><span class="study-point-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div><h3>${T(x.title,l)}</h3><p>${T(x.body,l)}</p></div></div>`).join('')}</div>`;

export function weekCaseLinks(id,l){
 const found=[...cases,...fieldCases].filter(c=>studyFor(c).coursework.some(a=>a.week===id));
 if(!found.length)return '';
 const publicCase=found.find(c=>c.name),fieldCase=found.find(c=>!c.name);
 const selected=[publicCase,fieldCase].filter(Boolean);
 return `<section class="weekly-case-links"><h2>${txt(l,'本周案例复盘','Case studies for this module')}</h2><div>${selected.map(c=>{const s=studyFor(c),a=s.coursework.find(x=>x.week===id);return `<a href="${L(l,'cases/'+(c.name?'':'field-')+c.id)}"><span>${T(c.name||c.sector,l)}</span><h3>${T(c.title,l)} ↗</h3><p>${T(a.action,l)} · ${T(a.output,l)}</p></a>`}).join('')}</div></section>`;
}

export function casesPage(l){
 return pageHero(l,'CASE STUDIES / FDE IN PRACTICE',B('从业务问题，拆到工程动作','From business problems to engineering decisions'),B('9 个公开案例与 10 个业务实作。逐个拆解问题如何被发现、方案怎样形成、哪些判断决定成败，以及你应交付什么。','Nine public cases and ten field exercises. Explore discovery, implementation, consequential decisions and the artifacts you should deliver.'),`<div class="meta-row"><a class="text-link" href="#case-list">${txt(l,'选择案例','Choose a case')} ↓</a><a class="text-link" href="${L(l,'curriculum')}">${txt(l,'按课程顺序学习','Follow the curriculum')} ↗</a></div>`)+`
 <section class="section"><div class="wrap">
 <div class="case-reading-map" aria-label="${txt(l,'案例学习顺序','Case study reading sequence')}">${[B('识别问题','Discover'),B('设计方案','Design'),B('判断取舍','Decide'),B('提交验证','Verify')].map((t,i)=>`<div><span>0${i+1}</span><b>${T(t,l)}</b></div>`).join('')}</div>
 <p class="study-intro">${txt(l,'选一个与你当前任务相近的案例。先读业务背景，再沿行动路线检查关键取舍，最后按课程作业提交可复现的结果。公开案例附原文；实战推演与样例使用合成情景。','Choose a case close to your work. Read the context, examine the decisions, then produce reproducible coursework. Public context links to original sources; FDE exercises use synthetic scenarios.')}</p>
 <div class="filter-bar" id="case-list"><label class="sr-only" for="filter-input">${txt(l,'搜索案例、技术或周次','Filter cases, techniques or weeks')}</label><input id="filter-input" data-filter-input type="search" placeholder="${txt(l,'搜索：访谈、营销、W07、幂等、Klarna…','Search: discovery, marketing, W07, idempotency…')}"><div class="filter-buttons" data-filter-buttons><button data-filter="all" aria-pressed="true">${txt(l,'全部 19','All 19')}</button><button data-filter="public" aria-pressed="false">${txt(l,'公开案例 9','Public cases 9')}</button><button data-filter="field" aria-pressed="false">${txt(l,'业务实作 10','Field exercises 10')}</button></div></div><div data-result-count class="result-count" aria-live="polite"></div>
 <div class="case-grid">${[...cases,...fieldCases].map((c,i)=>{
  const field=i>=cases.length,s=studyFor(c),url=L(l,'cases/'+(field?'field-':'')+c.id);
  return `<article class="case-card case-study-card filter-item" data-group="${field?'field':'public'}" data-search="${T(c.title,l)} ${T(c.name||c.sector,l)} ${esc(studySearch(c,l))} ${s.coursework.map(a=>'W'+a.week+' '+T(weeks.find(w=>w.id===a.week).title,l)).join(' ')}"><div class="case-card-top"><span class="tag">${field?txt(l,'业务实作','FIELD EXERCISE'):T(s.kind,l)}</span><span class="case-number">${String(i+1).padStart(2,'0')}</span></div><p class="case-study-client">${T(c.name||c.sector,l)}</p><h2><a href="${url}">${T(c.title,l)}</a></h2><p>${T(s.value,l)}</p><div class="case-mini-route" aria-hidden="true">${s.moves.map(m=>`<span>${T(m.title,l)}</span>`).join('<i>→</i>')}</div><div class="card-meta">${s.coursework.map(a=>'W'+a.week).join(' · ')}</div><div class="card-bottom"><a href="${url}">${txt(l,'阅读完整拆解','Read the full case')} ↗</a></div></article>`;
 }).join('')}</div><div class="empty-state" data-filter-empty hidden>${txt(l,'没有匹配案例，尝试其他关键词或周次。','No matching cases. Try another keyword or week.')}</div>
 </div></section>`;
}

export function casePage(c,l,field=false){
 const s=studyFor(c);if(!s)throw Error('Missing teaching study '+c.id);
 const refs=localRefs(c),week=weeks.find(w=>w.id===s.coursework[0].week),board=boards.find(b=>b.week===s.coursework[1].week);
 const courseTitle=id=>T(weeks.find(w=>w.id===id).title,l);
 return pageHero(l,field?'FIELD EXERCISE / FDE PRACTICE':'PUBLIC CASE / FDE ANALYSIS',c.title,B(field?c.sector.zh:(typeof c.name==='object'?c.name.zh:c.name),field?c.sector.en:(typeof c.name==='object'?c.name.en:c.name)),`<div class="meta-row"><span class="pill">${field?txt(l,'合成业务实作','SYNTHETIC FIELD EXERCISE'):T(s.kind,l)}</span><span>${s.coursework.map(a=>'W'+a.week).join(' · ')}</span><a class="text-link" href="#coursework">${txt(l,'查看作业与交付物','Coursework and outputs')} ↓</a></div>`)+`
 <div class="wrap case-study-layout">
 <aside class="case-study-nav"><nav aria-label="${txt(l,'本案例目录','Case contents')}"><span class="eyebrow">${txt(l,'案例目录','IN THIS CASE')}</span>${sections.map(([id,t],i)=>`<a href="#${id}"><span>0${i+1}</span>${T(t,l)}</a>`).join('')}</nav><a class="text-link" href="${L(l,'cases')}">← ${txt(l,'返回案例库','All cases')}</a></aside>
 <article class="case-study-body">
 <section class="study-context" id="context">${blockHead(l,'01','CONTEXT','解决什么问题，为什么值得做？','What problem is worth solving?')}<p>${T(s.context,l)}</p>${!field?`<div class="case-source-links">${refs.filter(id=>!['ontology','nist','evals','did'].includes(id)).map(id=>{const r=sourceById[id];return `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.publisher)} · ${esc(r.date)} ↗</a>`}).join('')}</div>`:''}<div class="study-value"><span>${txt(l,'业务价值','BUSINESS VALUE')}</span><p>${T(s.value,l)}</p></div><dl class="case-role"><dt>${txt(l,'协作角色','WORKING ROLES')}</dt><dd>${T(s.actors,l)}</dd></dl></section>
 <section class="study-section" id="discovery">${blockHead(l,'02','DISCOVERY','FDE 怎样把症状变成可解决的问题？','How does an FDE turn symptoms into a solvable problem?')}<p class="study-scope">${txt(l,field?'以下按合成情景展开现场排查与实施练习。':'以下为结合案例设计的 FDE 实战推演，展示同类问题的排查与实施方法；公开团队的已披露做法见上方背景。',field?'The following discovery and implementation exercise uses a synthetic scenario.':'The following is an FDE exercise inspired by the case, not a claim about undocumented project events. Reported team actions appear in the context above.')}</p>${points(s.discovery,l)}</section>
 <section class="study-section" id="solution">${blockHead(l,'03','DELIVERY ROUTE','方案如何一步步落到工作里？','How does the solution enter the workflow?')}<ol class="case-delivery-route" aria-label="${txt(l,'方案行动路线','Delivery sequence')}">${s.moves.map((m,i)=>`<li><span class="route-index">0${i+1}</span><div class="route-symbol" aria-hidden="true">${['◇','⊞','↗','↺'][i]}</div><h3>${T(m.title,l)}</h3><p>${T(m.body,l)}</p></li>`).join('')}</ol></section>
 <section class="study-section" id="decisions">${blockHead(l,'04','DECISIONS','哪些判断决定方案是否可靠？','Which decisions make the solution reliable?')}${points(s.decisions,l,'case-decision-grid')}</section>
 <section class="study-section" id="worked">${blockHead(l,'05','WORKED EXAMPLE',s.worked.title.zh,s.worked.title.en)}<div class="case-worked"><span class="tag">${txt(l,'合成教学样例','SYNTHETIC TEACHING EXAMPLE')}</span><p>${T(s.worked.brief,l)}</p><dl>${s.worked.rows.map(row=>`<div><dt>${T(row.title,l)}</dt><dd>${T(row.body,l)}</dd></div>`).join('')}</dl></div></section>
 <section class="study-section" id="coursework">${blockHead(l,'06','COURSEWORK','对应课程：你要做什么、交什么？','What should you do and deliver?')}<div class="case-assignment-list">${s.coursework.map(a=>`<article><a class="case-week-link" href="${L(l,'curriculum/'+a.week)}">W${a.week}<span>${courseTitle(a.week)} ↗</span></a><h3>${T(a.action,l)}</h3><dl><div><dt>${txt(l,'交付物','OUTPUT')}</dt><dd>${T(a.output,l)}</dd></div><div><dt>${txt(l,'通过条件','PASS CONDITION')}</dt><dd>${T(a.check,l)}</dd></div></dl><a class="text-link" href="/downloads/${l}/${weeks.find(w=>w.id===a.week).template}.md" download>${txt(l,'下载本周模板','Download worksheet')} ↓</a></article>`).join('')}</div></section>
 <section class="study-section" id="review">${blockHead(l,'07','ACCEPTANCE & REUSE','怎样证明完成，下一次复用什么？','How do you prove completion and reuse the work?')}<div class="case-review"><h3>${txt(l,'验收检查','Acceptance checks')}</h3><p>${T(s.review,l)}</p><h3>${txt(l,'可复用资产','Reusable assets')}</h3><p>${T(s.reuse,l)}</p></div><div class="actions">${button(txt(l,'进入对应课程','Start the related module'),L(l,'curriculum/'+week.id))}${button(txt(l,'使用工程实训包','Use the engineering kit'),L(l,'resources')+'#engineering-kit','secondary')}</div></section>
 ${board?`<section class="study-section case-related-board"><h2>${txt(l,'用画板复核你的设计','Review your design with a teaching board')}</h2>${boardFigure(board,l)}</section>`:''}
 <details class="case-reading-details"><summary>${txt(l,'延伸阅读与案例原文','Further reading and original sources')}</summary><ul>${refs.map(id=>{const r=sourceById[id];return `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a><small>${esc(r.publisher)} · ${esc(r.date)}</small></li>`}).join('')}</ul><p><a href="${L(l,'sources')}">${txt(l,'按课程查找阅读材料','Find reading by course topic')} ↗</a></p></details>
 </article></div>`;
}
