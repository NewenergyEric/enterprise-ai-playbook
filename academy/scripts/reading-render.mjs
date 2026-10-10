import {helpers,esc} from './render.mjs';
import {B} from '../content/curriculum.mjs';
import {sourceById,sources} from '../content/sources.mjs';
const {T,L,txt,pageHero}=helpers;
const entries=[
 ['deployment','01','FDE 如何选择切口、接入系统，并将经验反馈给产品？','How are workflows selected, integrated and fed back to products?'],
 ['frontier','01','日志、文档与代码怎样围绕一项故障形成工作流？','How do logs, documents and code form an investigation workflow?'],
 ['aig','02','专业工作中哪些环节适合提取、核验或专家判断？','Which expert tasks involve extraction, checking or judgment?'],
 ['aig-report','02','核保与理赔如何共享业务概念和底层能力？','How can underwriting and claims share concepts and capabilities?'],
 ['agents','01','固定流程什么时候够用，何时需要模型自主选择工具？','When is a fixed workflow enough, and when is model-directed tool use useful?'],
 ['airbus','05','跨源数据怎样连接成可用于多个应用的业务对象？','How do connected business objects support multiple applications?'],
 ['novo','04','文档生成如何组合检索、模板、版本与专家知识？','How does document generation combine retrieval, templates, versions and expertise?'],
 ['ontology','05','对象、关系和动作如何表达工作中的业务语义？','How do objects, links and actions represent work?'],
 ['tools','05','工具参数、应用执行与结果返回分别由谁负责？','Who owns tool arguments, execution and result handling?'],
 ['mcp','05','Host、client 与 server 分别承担什么连接职责？','What do hosts, clients and servers each do?'],
 ['pipl','06','设计字段最小化、访问范围与去标识化时需核对哪些要求？','What should a qualified reviewer check for minimization, access and de-identification?'],
 ['morgan','07','专家反馈怎样变成评估集、检索改进和持续回归？','How does expert feedback become evals, retrieval improvements and regression?'],
 ['klarna','08','如何同时观察会话处理、重复咨询与人工渠道？','How should conversation handling, repeat contact and human support be assessed together?'],
 ['tgh','09','资源状态怎样进入有责任人的日常协同？','How does resource state enter accountable operational coordination?'],
 ['evals','07','任务、轨迹、最终状态和评分器如何组成评估？','How do tasks, traces, outcomes and graders form an evaluation?'],
 ['mcp-security','06','连接器如何处理授权、令牌与信任边界？','How do connectors handle authorization, tokens and trust boundaries?'],
 ['owasp','09','来自文档或工具结果的指令如何越过信任边界？','How can instructions in documents or tool results cross trust boundaries?'],
 ['otel','09','如何关联一次模型调用、工具执行与业务任务？','How can model calls and tool executions be linked to a business task?'],
 ['nist','09','怎样把风险识别转成可测量与可处理的运行要求？','How does risk identification become measurable operational requirements?'],
 ['raas','10','结果收费需要哪些指标、归因与共同责任？','What metrics, attribution and shared responsibility does outcome pricing require?'],
 ['did','10','差分计算之外，比较组设计还需要什么识别条件？','What identification conditions are needed beyond calculating differences?'],
 ['did-caution','10','只有有限基线数据时，如何判断归因结论的局限？','How should limited baseline data affect attribution conclusions?'],
];
export const readingById=Object.fromEntries(entries.map(([id,week,zh,en])=>[id,{week,question:B(zh,en)}]));
const groups=[
 [B('01 / 选题与现场发现','01 / Framing and discovery'),B('先理解交付团队怎样找到值得解决的问题，再把观察转成范围和责任。','Understand how delivery teams find valuable problems and turn observations into scope and ownership.'),['deployment','frontier','aig','aig-report','agents']],
 [B('02 / 数据、本体与工具','02 / Data, ontology and tools'),B('带着自己的数据契约和对象图阅读，回答“怎样接入、如何表达、谁能使用”。','Read alongside your data contract and object model: how to connect, represent and authorize.'),['airbus','novo','ontology','tools','mcp','pipl']],
 [B('03 / 评估、执行与生产运行','03 / Evaluation, execution and operations'),B('把资料中的方法转成评估样本、工具约束、日志字段与失败恢复检查。','Translate methods into evaluation fixtures, tool constraints, trace fields and recovery checks.'),['morgan','klarna','tgh','evals','mcp-security','owasp','otel','nist']],
 [B('04 / 价值验证与服务产品化','04 / Value and service productization'),B('区分系统跑通、用户采用和业务增量，为验收与商业设计准备可重算证据。','Separate functioning systems, adoption and increments; prepare reproducible evidence for acceptance and pricing.'),['raas','did','did-caution']],
];
export function sourcesPage(l){return pageHero(l,'READING GUIDE / PRIMARY RESOURCES',B('延伸阅读与技术资料','Further reading and technical resources'),B('按课程阶段查找案例原文与技术文档。每份资料都附一个阅读问题和对应课程，帮助你把阅读转成下一项设计或作业。','Find primary cases and technical documentation by course stage. Each resource includes a reading question and module so reading leads to a design decision or assignment.'),`<div class="meta-row"><span class="pill">${sources.length} ${txt(l,'份阅读资料','READING RESOURCES')}</span><a class="text-link" href="${L(l,'cases')}">${txt(l,'先看案例拆解','Start with the case studies')} ↗</a></div>`)+`<section class="section"><div class="wrap">
 ${groups.map(([title,intro,ids])=>`<section class="reading-group"><h2>${T(title,l)}</h2><p>${T(intro,l)}</p><div class="reading-grid">${ids.map(id=>{const s=sourceById[id],r=readingById[id];return `<article class="reading-card" id="reading-${id}"><small>${esc(s.publisher)} · ${esc(s.date)}</small><h3><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a></h3><p>${T(r.question,l)}</p><a class="text-link" href="${L(l,'curriculum/'+r.week)}">W${r.week} · ${txt(l,'结合讲义与作业阅读','Read with the module and assignment')} ↗</a></article>`}).join('')}</div></section>`).join('')}
 <details class="reading-policy"><summary>${txt(l,'引用说明、练习数据与版本核对','Attribution, exercise data and version checks')}</summary><p>${txt(l,'公开案例基于企业或机构的一手材料，企业名称用于说明案例主体，不表示与 AIelsen 存在合作或认证关系。案例中的 FDE 实战推演是课程练习，不是未公开项目细节的复述。','Public context uses primary company or institutional sources. Names identify case subjects, not AIelsen partnerships or accreditation. FDE exercises are teaching designs, not undocumented project histories.')}</p><p>${txt(l,'实作样例、金额和对象标识为合成情景。填写作业、学习笔记或导出文件时，不要加入客户身份、个人信息、私有策略或密钥。学习记录在本机存储，分享前请自行检查；托管服务可能记录普通访问日志。','Exercise values and identifiers are synthetic. Do not add customer identities, personal information, private strategy or keys to worksheets, notes or exports. Records are local; review them before sharing. Hosts may keep ordinary access logs.')}</p><p>${txt(l,'阅读资料整理于 2026-09-07 至 2026-09-08；日期栏区分公开发布日期与查阅日期。技术接口与规范应按实施版本核对；法律、临床和金融专业判断请交由具备资质的人员复核。','Resources were compiled September 7–8, 2026. Dates distinguish publication from access. Verify interfaces and specifications for your implementation version; qualified specialists should review legal, clinical and financial judgments.')}</p></details>
 </div></section>`;}
