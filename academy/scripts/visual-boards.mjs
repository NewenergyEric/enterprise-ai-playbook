// Original, bilingual teaching diagrams. All numbers are from the synthetic course.
// No customer screenshots, remote assets, runtime dependencies or fabricated results.
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const pair=(zh,en)=>({zh,en});
const ink='#001f3f',teal='#007d86',blue='#3246db',muted='#526c7c',line='#a9c3cb',amber='#9a5c22';
export const boards=[
 ['01','fit',3,'先判断差距，再选择交付方式','Find the gap before choosing the work','把需求放在产品能力、可配置扩展与产品缺口之间，决定接入、验证或暂缓。','Place requirements against product capability, tenant extensions and product gaps before committing.'],
 ['01','layers',6,'客户差异应该放在哪一层','Where tenant-specific work belongs','客户适配、行业资产与产品核心分层管理。一次交付可以反馈产品，不等于把客户逻辑写入核心。','Separate tenant adapters, domain assets and the product core. Feed learning back without embedding one tenant in the core.'],
 ['02','evidence',3,'访谈不是收集同意，而是交叉验证','Triangulate evidence from the field','同一项“唤回会员”任务，分别核对业务解释、实际工作与系统记录。冲突进入待验证清单。','Check the same re-engagement task against business explanations, observed work and system records. Keep conflicts open.'],
 ['02','facts',6,'一句需求，拆成三种证据状态','One request, three evidence states','事实要有来源；意见要有归属；假设要有验证方法。不要让访谈纪要把它们混成既定需求。','Facts need sources, opinions need attribution and hypotheses need tests. An interview note is not an agreed fact.'],
 ['03','window',3,'30 天复购，先看完整观察窗','A 30-day metric needs a complete window','按同一数据截止日判断样本是否成熟。未满 30 天的首购会员单列，不记作“没有复购”。','Use one as-of date. Keep immature cohorts separate instead of treating them as non-returners.'],
 ['03','scope',6,'把业务目标落实到验收边界','Turn the outcome into reviewable scope','指标、数据、交付物和客户依赖共同定义范围。范围外的新动作应走新的评估与约定。','Measures, data, outputs and customer dependencies jointly define scope. New actions need a new scope decision.'],
 ['04','quality',3,'14 行原始数据，每一行都有去向','Account for every source row','合成工程包：14 行原始订单 = 11 行接受 + 1 行完全重复 + 2 行隔离。计数对上后，还需逐行与金额对账。','Synthetic kit: 14 source rows = 11 accepted + 1 exact duplicate + 2 quarantined. Reconcile amounts and mappings too.'],
 ['04','adapter',6,'先翻译字段，再验证业务含义','Map fields, then validate their meaning','适配器统一字段与类型；业务契约定义语义；源 ID 和版本保留下来，支持回查。','Adapters normalize fields and types; contracts define meaning. Retain source IDs and versions for reconciliation.'],
 ['05','ontology',4,'业务本体：让数据成为可操作的对象','Ontology: connect objects to business actions','Member、Order、Store、Segment、Campaign、Coupon 的关联与生命周期。连线表达业务关系，不是已部署系统。','Relationships and lifecycles across members, orders, stores, segments, campaigns and coupons. A teaching model, not a deployed system.'],
 ['05','agent',8,'建议型 Agent 的一次完整任务','An advisory agent task, end to end','模型负责澄清和选工具；确定性工具提供人群与规则证据；服务端控制范围。本阶段不执行发券。','The model clarifies and chooses tools. Deterministic tools provide evidence; the server enforces scope. No coupon issuance at this stage.'],
 ['06','boundary',3,'数据经过哪些边界，谁能看到什么','Track data across trust boundaries','模型上下文只包含任务必要字段。身份、范围与写权限在服务端校验，检索内容不因此获得指令权。','Send only task-essential fields to the model. The server verifies identity, scope and write permission; retrieved text gains no authority.'],
 ['06','deployment',6,'部署选型：能力、边界与运维一起比较','Choose deployment with operating constraints','托管、私有与混合三种架构只是候选。逐一确认出域数据、密钥、网络、日志和运维责任。','Managed, private and hybrid are options, not safety rankings. Review data egress, secrets, networking, logs and ownership.'],
 ['07','evals',3,'把失败定位到正确的一层','Evaluate each layer separately','数据、工具、模型任务与业务使用分别评估。某层通过不能证明其他层也通过。','Evaluate data, tools, model tasks and adoption separately. Passing one layer does not establish the rest.'],
 ['07','gate',6,'安全门禁不能被平均分抵消','A safety failure cannot be averaged away','这是判定逻辑示意，不是模型评分报告。只要出现越权或未确认写入，就不应靠其他高分放行。','Decision logic, not model scores. An unauthorized read or unconfirmed write blocks release regardless of other results.'],
 ['08','states',3,'请求超时，不等于没有执行','A timeout does not mean nothing happened','提交后必须区分成功、明确失败与结果未知。未知状态先回查，不盲目重复写入。','After submission, distinguish committed, failed and unknown. Query unknown outcomes before attempting another write.'],
 ['08','idempotency',6,'同一动作重放，不产生第二次副作用','Replay the request, not the side effect','幂等键与租户和参数绑定。同键不同内容拒绝；持久化与并发预算控制仍是生产要求。','Bind a key to tenant and payload. Reject mismatched reuse; durable storage and atomic budgets remain production requirements.'],
 ['09','trace',4,'把一次任务串成可回查的轨迹','Trace one task across the system','用 task、trace、action 与策略版本关联模型、工具及下游。时间轴表达调用顺序，不是性能测量。','Correlate task, trace, action and policy versions across model, tools and downstream. The timeline shows order, not measured latency.'],
 ['09','release',7,'上线是受控扩展，不是一次开关','Release through controlled expansion','范围从只读到限定写入逐步放开；每一阶段都要可暂停、可回查。代码回退不等于撤销外部动作。','Expand from read-only to bounded writes, with pause and reconciliation at every stage. Code rollback does not undo external effects.'],
 ['10','did',4,'上涨 8 个百分点，不全是项目贡献','An 8-point rise is not all incremental impact','合成算术：实验组 +8 pp，对照组 +5 pp，变化之差 +3 pp。四个点不能证明因果，也不能计算置信区间。','Synthetic arithmetic: treated +8 pp, control +5 pp, difference +3 pp. Four points do not establish causality or uncertainty.'],
 ['10','acceptance',6,'系统、使用与业务结果分开验收','Review the system, adoption and outcomes separately','三类证据相互关联，但不能互相替代。使用频繁不自动等于业务提升，业务增长也不能豁免安全问题。','The three evidence classes are related, not interchangeable. Frequent use is not causal uplift, and growth does not waive safety.'],
 ['11','reuse',3,'把一次交付拆成三类可复用资产','Separate three kinds of reusable assets','客户特定映射留在适配层；跨客户的行业语义形成领域包；共性机制通过产品评审进入核心。','Keep tenant mappings local, package shared domain semantics, and review general mechanisms for the product core.'],
 ['11','feedback',6,'复盘结论，要回到下一次测试','Close the loop from failure to regression','从失败样本找到根因，修改规则、工具或产品，再把反例纳入回归。只记“加强沟通”无法验证改进。','Start with a failed example, locate the cause, change the right layer and add a regression. General intentions cannot prove improvement.'],
 ['12','defense',3,'一项答辩结论，沿证据向下追问','Trace each capstone claim to its evidence','从“完成了什么”追到版本、实际轨迹、测试与原始输入。截图用于说明，不能替代可复现证据。','Trace a completion claim to versions, actual traces, tests and inputs. Screenshots illustrate; they do not replace reproducibility.'],
 ['12','portfolio',6,'作品集要标明实现层级','State what the portfolio actually demonstrates','设计方案、确定性模拟、模型集成与生产运行是不同证据层级。展示已完成部分，也写清尚未验证的边界。','A design, deterministic simulation, model integration and production operation require different evidence. Label the level actually reached.']
].map(([week,id,before,zh,en,cz,ce])=>({week,id,before,title:pair(zh,en),caption:pair(cz,ce)}));

const text=(x,y,s,size=19,fill=ink,anchor='start',weight=500)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${e(s)}</text>`;
const rect=(x,y,w,h,fill='#fff',stroke=line,rx=8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
const path=(d,color=teal,width=2,dash='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${dash?` stroke-dasharray="${dash}"`:''}/>`;
const arrow=(x1,y1,x2,y2,color=teal,dash='')=>path(`M${x1} ${y1} L${x2} ${y2}`,color,2,dash)+`<path d="M-8 -5 L0 0 L-8 5" transform="translate(${x2} ${y2}) rotate(${Math.atan2(y2-y1,x2-x1)*180/Math.PI})" fill="none" stroke="${color}" stroke-width="2"/>`;
const dot=(x,y,r=5,c=teal)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
function icon(kind,x,y,c=teal,s=1){
 const shapes={
  person:'<circle cx="20" cy="11" r="7"/><path d="M6 36v-5c0-14 28-14 28 0v5"/>',
  data:'<ellipse cx="20" cy="8" rx="15" ry="6"/><path d="M5 8v23c0 8 30 8 30 0V8M5 19c0 8 30 8 30 0"/>',
  doc:'<path d="M8 3h17l8 8v27H8ZM24 3v10h9M14 21h13M14 28h10"/>',
  shop:'<path d="M3 15h34l-5-11H8ZM5 15v23h30V15M13 38V24h10v14M12 4l-2 11M22 4v11M30 4l3 11"/>',
  nodes:'<circle cx="20" cy="20" r="6"/><circle cx="5" cy="5" r="3"/><circle cx="35" cy="7" r="3"/><circle cx="8" cy="35" r="3"/><circle cx="34" cy="34" r="3"/><path d="m8 8 8 8m9 0 7-7M16 25l-6 7m15-7 6 6"/>',
  shield:'<path d="M20 2 36 8v13c0 8-8 14-16 18C12 35 4 29 4 21V8ZM12 20l6 6 11-13"/>',
  tool:'<path d="m6 34 18-18c-4-8 3-15 11-12l-7 7 4 4 7-7c3 8-4 15-12 11L9 37Z"/>',
  chart:'<path d="M4 4v33h34M10 29l8-10 7 3 11-16M29 6h7v7"/>',
  clock:'<circle cx="20" cy="20" r="17"/><path d="M20 9v12l9 5"/>',
  check:'<circle cx="20" cy="20" r="17"/><path d="m11 20 6 7 13-15"/>',
  flag:'<path d="M8 39V3h26l-7 8 7 8H8"/>',
  key:'<circle cx="12" cy="14" r="9"/><path d="m19 20 17 17m-9-9 6-6m-1 11 6-6"/>',
  search:'<circle cx="16" cy="16" r="12"/><path d="m25 25 12 12M9 16h14M16 9v14"/>',
  code:'<path d="m12 8-9 12 9 12m16-24 9 12-9 12M24 3l-8 34"/>'
 };
 return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${shapes[kind]||shapes.doc}</g>`;
}
function box(x,y,w,h,title,sub='',kind='doc',tone='light'){
 const dark=tone==='dark',color=dark?'#fff':ink;
 const units=s=>[...s].reduce((n,c)=>n+(/[\u3400-\u9fff]/.test(c)?1:.54),0);
 const titleSize=Math.min(20,(w-84)/units(title)),subSize=Math.min(16,(w-44)/units(sub||' '));
 return rect(x,y,w,h,dark?ink:tone==='teal'?'#e0f1ed':'#fff',dark?ink:line)+icon(kind,x+20,y+19,dark?'#9be0d5':teal,.8)+text(x+64,y+44,title,titleSize,color)+ (sub?text(x+22,y+h-22,sub,subSize,dark?'#b7d9e0':muted):'');
}
function stamp(x,y,s,c=teal){return rect(x,y,Math.max(84,s.length*10+30),32,'#fff',c,16)+text(x+15,y+22,s,15,c);}

export function boardSvg(b,l='zh'){
 const t=(a,z)=>l==='zh'?a:z;let a='';
 switch(b.id){
 case 'fit':
  a=box(35,176,180,122,t('业务任务','Business job'),t('目标 / 数据 / 责任','Outcome · data · owner'),'flag','dark')+arrow(215,237,274,237);
  a+=`<path d="M400 117 520 237 400 357 280 237Z" fill="#e0f1ed" stroke="${teal}" stroke-width="2"/>`+text(400,229,t('产品能力','Product fit'),23,ink,'middle')+text(400,262,t('覆盖多少？','What is covered?'),17,teal,'middle');
  a+=arrow(470,166,625,99)+arrow(520,237,625,237)+arrow(470,308,625,393);
  a+=box(636,42,288,100,t('已有能力','Already supported'),t('配置 → 验证','Configure → validate'),'check')+box(636,190,288,100,t('客户差异','Tenant-specific gap'),t('扩展 → 契约测试','Extend → contract tests'),'tool','teal')+box(636,342,288,100,t('关键缺口','Critical product gap'),t('验证 / 评审 / 暂缓','Validate / review / defer'),'search');
  a+=text(50,455,t('判断结果必须有证据，不用愿景替代能力。','Use evidence to qualify the work, not a product vision.'),18,muted);break;
 case 'layers':
  [['客户扩展','Tenant extension','字段映射 · 本地策略','Mappings · local policy',75,105,810,100,'tool'],['行业资产','Domain package','业务本体 · 指标契约','Ontology · metric contracts',135,232,690,100,'nodes'],['标准产品','Product core','运行时 · 权限 · 审计','Runtime · permissions · audit',195,359,570,100,'code']].forEach(([z,en,sz,se,x,y,w,h,i],idx)=>{a+=box(x,y,w,h,t(z,en),t(sz,se),i,idx===2?'dark':'light');if(idx<2)a+=arrow(465,y+h+2,465,y+h+24);});
  a+=text(75,62,t('每一层都有版本和测试。共性能力通过评审回流产品。','Version and test each layer. Generalize through product review.'),20,ink);break;
 case 'evidence':
  a=arrow(214,125,470,267)+arrow(742,125,490,267)+arrow(480,412,480,318);
  a+=box(40,58,345,108,t('业务人员怎么解释','What people explain'),t('规则 / 例外 / 结果期待','Rules · exceptions · goals'),'person');
  a+=box(575,58,345,108,t('系统里实际记录什么','What the system records'),t('数据 / 日志 / 时间口径','Data · logs · time semantics'),'data');
  a+=box(295,388,370,110,t('现场工作怎样发生','What actually happens'),t('操作 / 交接 / 返工','Actions · handoffs · rework'),'shop');
  a+=`<circle cx="480" cy="277" r="75" fill="${ink}"/>`+icon('search',460,228,'#a6e4da')+text(480,299,t('同一项任务','One real task'),21,'#fff','middle');
  a+=text(44,270,t('冲突 ≠ 选一个人相信','Conflict ≠ pick a story'),17,amber)+text(670,315,t('取证 → 待验证清单','Evidence → open questions'),17,teal);break;
 case 'facts':
  a=rect(145,40,670,68,ink,ink)+text(480,83,t('“沉默会员都应该发一张券。”','“Every inactive member should receive a coupon.”'),22,'#fff','middle');
  [185,480,775].forEach(x=>{a+=arrow(480,109,x,193)});
  [[45,'事实','Fact','订单与许可记录','Orders and consent','data',teal],[340,'意见','Opinion','运营的策略偏好','Operator preference','person',blue],[635,'假设','Hypothesis','发券能增加复购','Coupons improve return','chart',amber]].forEach(([x,z,en,sz,se,i,c])=>{a+=box(x,200,280,164,t(z,en),t(sz,se),i)+rect(x,390,280,66,'#edf4f5',line)+text(x+140,431,t(z==='事实'?'附来源与快照':z==='意见'?'标明角色与理由':'设计对照与观察窗',z==='事实'?'Source + snapshot':z==='意见'?'Role + reasoning':'Comparison + window'),18,c,'middle');a+=arrow(x+140,364,x+140,388,c);});break;
 case 'window':
  a+=rect(683,65,6,342,teal,teal,0)+text(686,44,t('统一数据截止日','Shared as-of date'),18,teal,'middle');
  [130,255,380].forEach(y=>{a+=path(`M200 ${y}H860`,line,1,'4 6')});
  a+=text(45,137,t('成熟批次','Mature cohort'),19)+text(45,262,t('成熟批次','Mature cohort'),19)+text(45,387,t('未成熟批次','Immature cohort'),19);
  [[235,130,280,true],[330,255,280,true],[555,380,280,false]].forEach(([x,y,w,ok])=>{a+=rect(x,y-24,w,48,ok?'#d4ece6':'#f8ecd9',ok?teal:amber,24)+dot(x,y,7,ink)+text(x+18,y+7,t('首购','First'),16)+text(x+w-18,y+7,'30 d',17,ok?teal:amber,'end');});
  a+=icon('check',805,102,teal,1.1)+icon('check',805,227,teal,1.1)+text(842,453,t('单独报告，暂不进分母','Report separately; exclude for now'),18,amber,'end');
  a+=text(45,485,t('示意时间轴 · 纳入规则还需包含有效订单、退款与身份版本。','Schematic timeline · also freeze valid-order, refund and identity rules.'),17,muted);break;
 case 'scope':
  a=rect(270,64,420,383,'#eaf4f3',teal,20)+text(480,114,t('本期交付范围','Agreed delivery scope'),25,ink,'middle');
  a+=box(313,152,334,101,t('建议型 Agent v1','Advisory agent v1'),t('分群 + 带证据建议','Segments + evidenced advice'),'nodes','dark');
  a+=text(480,309,t('口径 · 数据 · 工具 · 评估','Metrics · data · tools · evals'),19,ink,'middle')+text(480,352,t('双方依赖与验收证据','Dependencies and acceptance'),19,ink,'middle');
  a+=box(32,182,204,120,t('业务目标','Outcome'),t('可测量的结果','Measurable result'),'chart')+arrow(237,242,267,242);
  a+=box(724,182,205,120,t('新增动作','New action'),t('重新评估范围','Re-scope first'),'flag')+arrow(693,242,722,242,amber,'5 5');
  a+=text(480,487,t('范围清楚，才能区分“本期未完成”与“下一阶段需求”。','Clear scope separates unfinished work from a new phase.'),19,muted,'middle');break;
 case 'quality':
  // Area-conserving bands: 11/14, 1/14, 2/14 of a 196-unit input.
  a+=`<path d="M270 163C475 163 470 64 650 64V218C470 218 475 317 270 317Z" fill="#b5ded3"/><path d="M270 317C460 317 485 302 650 302V316C485 316 460 331 270 331Z" fill="#bfc9f8"/><path d="M270 331C455 331 480 415 650 415V443C480 443 455 359 270 359Z" fill="#edcda3"/>`;
  a+=rect(55,163,215,196,ink,ink,0)+text(84,224,'14',62,'#fff')+text(84,264,t('原始订单','Source rows'),23,'#fff')+text(84,315,t('保留原始快照','Preserve the snapshot'),16,'#a6ded8');
  a+=rect(650,64,245,154,'#e0f1ed',teal,0)+text(675,119,'11',48,teal)+text(675,166,t('通过契约 → 标准层','Accepted → canonical'),20)+text(675,197,t('保留来源 ID','Keep source IDs'),16,muted);
  a+=rect(650,276,245,70,'#eef0ff',blue,0)+text(675,321,'1',36,blue)+text(724,318,t('完全重复','Exact duplicate'),20);
  a+=rect(650,388,245,87,'#fff0de',amber,0)+text(675,440,'2',40,amber)+text(724,440,t('异常隔离','Quarantine'),20);
  a+=text(50,45,t('合成数据 / 工程包中的计数守恒','SYNTHETIC DATA / ROW ACCOUNTING'),18,muted)+text(50,484,'14 = 11 + 1 + 2',21,teal);break;
 case 'adapter':
  [['user_no','source_member_id',120],['amount_fen','amount_cents',200],['paid_at + timezone','business_date',280]].forEach(([s,d,y])=>{a+=rect(46,y,280,58,'#fff',line)+text(65,y+36,s,19,ink)+arrow(328,y+29,620,y+29)+rect(624,y,290,58,'#e5f2ee',teal)+text(645,y+36,d,18,ink);});
  a+=text(48,68,t('来源字段','SOURCE FIELDS'),21)+text(626,68,t('标准契约','CANONICAL CONTRACT'),21)+rect(384,100,194,269,ink,ink)+icon('tool',460,129,'#b1e3db',1.1)+text(481,225,t('客户适配器','Tenant adapter'),21,'#fff','middle')+text(481,266,t('类型 / 单位 / 时区','Type / unit / time zone'),16,'#b7d9e0','middle');
  a+=rect(48,410,866,71,'#fff',line)+icon('key',67,427,teal,.75)+text(120,451,t('重命名不是身份合并。映射、来源与版本必须可回查。','Renaming is not identity resolution. Retain mapping, source and version.'),19);break;
 case 'ontology':
  a+=arrow(278,260,369,260)+text(323,247,t('下单','places'),16,teal,'middle')+arrow(565,260,677,260)+text(621,247,t('发生于','at'),16,teal,'middle');
  a+=arrow(176,201,325,101)+text(205,153,t('快照选入','snapshot'),16,teal)+arrow(675,91,518,91)+text(595,77,t('活动面向','targets'),16,teal,'middle');
  a+=path('M900 90H931V365H788',teal,2)+arrow(788,365,788,387)+text(830,350,t('活动产生券','Campaign issues'),16,teal,'middle')+arrow(672,441,180,317)+text(428,402,t('券归属会员','Coupon belongs to member'),16,teal,'middle');
  a+=box(74,202,204,115,'Member',t('主身份 / 许可','Identity / consent'),'person','dark')+box(368,202,204,115,'Order',t('状态 / 金额 / 时间','State / amount / time'),'doc')+box(676,202,204,115,'Store',t('数据与动作范围','Data / action scope'),'shop');
  a+=box(323,34,195,112,'Segment',t('规则 / 快照','Rule / snapshot'),'nodes','teal')+box(677,34,225,112,'Campaign',t('版本 / 预算 / 资格','Version / budget / eligibility'),'flag')+box(673,389,227,107,'Coupon',t('发出 / 核销 / 失效','Issued / redeemed / expired'),'key','teal');
  a+=text(54,467,t('动作不是任意改表','Actions are not arbitrary edits'),20)+text(54,496,'issue_coupon → scope + budget + confirmation',16,muted);break;
 case 'agent':
  a=box(32,66,249,118,t('用户任务','User task'),t('门店？时间窗？目标？','Store? Window? Outcome?'),'person')+arrow(282,124,354,124)+box(354,66,257,118,t('模型与运行时','Model + runtime'),t('澄清 → 选择下一步','Clarify → choose next step'),'nodes','dark')+arrow(612,124,683,124);
  a+=box(685,42,243,94,'segment_members',t('确定性分群','Compute segment'),'data')+box(685,166,243,94,'propose_operation',t('规则与建议方案','Rules and proposal'),'tool');
  a+=path('M805 263V335H482V184',teal,2)+arrow(482,216,482,185)+text(636,319,t('结果 / 版本 / 排除原因','Results / versions / exclusions'),17,teal,'middle');
  a+=path('M354 149H318V269H156',blue,2)+arrow(192,269,159,269,blue)+text(35,307,t('信息不足：继续澄清','Missing facts: clarify'),17,blue);
  a+=rect(32,384,896,116,'#e1f0ed',line)+icon('shield',53,417,teal,1.1)+text(116,424,t('服务端边界','Server-enforced boundaries'),23)+text(116,466,t('租户范围 · 允许工具 · 步数与预算 · 本周只建议，不发券','Tenant scope · allowed tools · step / cost budgets · advice only'),18);break;
 case 'boundary':
  a=rect(34,57,892,386,'#eff5f6',line,16)+rect(57,84,413,333,'#fff',teal,12)+text(77,123,t('受控数据域','CONTROLLED DATA DOMAIN'),21,teal);
  a+=box(84,156,353,111,t('业务数据与身份服务','Data + identity service'),t('原始记录 / 授权上下文','Source rows / trusted scope'),'data')+box(84,288,353,98,t('字段投影与范围校验','Project fields + check scope'),t('必要字段，拒绝越权','Minimum fields; deny excess'),'shield','teal');
  a+=arrow(470,236,570,236)+text(522,215,t('最小上下文','Minimal context'),16,teal,'middle')+box(579,152,322,148,t('模型推理上下文','Model context'),t('对象引用 + 聚合 + 证据','References + aggregates + evidence'),'nodes','dark');
  a+=text(740,350,t('无全库权限 / 无自授权','No full-database access'),18,ink,'middle')+text(740,381,t('文档内容仍是不可信数据','Documents remain untrusted'),18,muted,'middle');
  a+=text(49,486,t('外部动作再次经过身份、参数、预算与确认检查。','External actions require fresh identity, payload, budget and confirmation checks.'),18,ink);break;
 case 'deployment':
  [[40,'托管','Managed','任务数据 → 托管模型','Task data → managed model'],[350,'私有','Private','模型与数据位于受控环境','Model + data in owned environment'],[660,'混合','Hybrid','分级路由与出域检查','Tiered routing + egress checks']].forEach(([x,z,en,sz,se],i)=>{a+=rect(x,64,260,332,'#fff',line,10)+text(x+130,112,t(z,en),25,ink,'middle')+icon('data',x+42,160,teal,1.2)+icon(i===1?'shield':'nodes',x+166,225,i===1?teal:blue,1.2)+arrow(x+81,190,x+166,244,i===1?teal:blue,i===2?'4 4':'')+text(x+130,327,t(sz,se),l==='zh'?16:13,muted,'middle')+text(x+130,366,t('单独评审责任与成本','Review ownership + cost'),16,teal,'middle');});
  a+=text(480,463,t('部署位置不是安全结论；边界是否可执行，才是检查重点。','Location is not a safety verdict. Test whether the boundary is enforceable.'),20,ink,'middle');break;
 case 'evals':
  [['数据','Data','键 / 时间 / 对账','Keys / dates / reconciliation','data'],['工具','Tools','参数 / 权限 / 幂等','Payload / scope / replay','tool'],['模型任务','Model tasks','澄清 / 选工具 / 引证','Clarify / tools / evidence','nodes'],['业务使用','Adoption','采纳 / 拒绝 / 执行','Accept / reject / act','person']].forEach(([z,en,sz,se,i],n)=>{a+=box(61+n*216,116,190,260,t(z,en),'',i,n===2?'dark':'light')+text(156+n*216,299,t(sz,se),l==='zh'?15:12,n===2?'#b7d9e0':muted,'middle')+text(156+n*216,344,'0'+(n+1),30,n===2?'#a6e3d9':teal,'middle');if(n<3)a+=arrow(253+n*216,247,274+n*216,247)});
  a+=text(480, 60,t('失败分层定位，修复后重跑对应回归','Locate the failing layer, fix it, then rerun regression'),23,ink,'middle')+text(480,447,t('分层诊断，不把所有错误都归结为“模型不聪明”。','Layered diagnosis avoids blaming every failure on the model.'),20,muted,'middle');break;
 case 'gate':
  a=box(43,162,235,173,t('任务质量评估','Task-quality review'),t('答案 / 工具 / 证据','Answer / tools / evidence'),'chart')+arrow(279,248,351,248)+`<path d="M475 107 608 248 475 389 342 248Z" fill="#e0f1ed" stroke="${teal}" stroke-width="2"/>`+icon('shield',456,165,teal)+text(475,246,t('硬门禁通过？','Hard gates pass?'),21,ink,'middle')+text(475,278,t('越权 / 非法写入','Scope / invalid writes'),16,teal,'middle');
  a+=arrow(550,186,678,125)+text(618,154,t('是','YES'),17,teal)+box(684,65,235,105,t('继续上线评审','Continue review'),t('仍需其他运行证据','Other readiness checks apply'),'check','teal');
  a+=arrow(550,318,678,383,amber)+text(618,347,t('否','NO'),17,amber)+box(684,332,235,105,t('阻断并修复','Block and fix'),t('高平均分不能豁免','Averages cannot waive it'),'shield');
  a+=text(50,476,t('判定逻辑示意 · 不展示虚构的模型通过率。','Decision logic · no invented model pass rates.'),18,muted);break;
 case 'states':
  [[28,'草案','Draft'],[220,'预检','Validate'],[412,'确认','Confirm'],[604,'提交','Submit']].forEach(([x,z,en],i)=>{a+=rect(x,64,156,70,i===3?ink:'#fff',i===3?ink:line)+text(x+78,107,t(z,en),23,i===3?'#fff':ink,'middle');if(i<3)a+=arrow(x+157,99,x+190,99)});
  a+=path('M683 136V181H177V214M683 181H775V354',teal,2)+arrow(177,182,177,215)+arrow(478,182,478,215)+arrow(775,181,775,354);
  a+=box(50,222,257,105,t('成功 committed','Committed'),t('回查与核对','Reconcile outcome'),'check','teal')+box(350,222,257,105,t('明确失败 failed','Known failure'),t('根据错误类型处理','Handle by error class'),'flag');
  a+=box(650,222,265,105,t('结果未知 unknown','Unknown outcome'),t('超时 ≠ 未执行','Timeout ≠ no effect'),'clock');
  a+=box(650,368,265,111,t('查询动作状态','Query action status'),t('核对 / 人工复核','Reconcile / manual review'),'search','dark')+text(55,411,t('参数变化或确认过期 → 回到预览','Changed payload / expired confirmation → preview'),19,amber)+text(55,461,t('不要从 unknown 直接再次发起写入。','Do not blindly reissue a write from unknown.'),20,ink);break;
 case 'idempotency':
  a=box(39,72,260,108,t('请求 1','Request 1'),'key = k1 · payload = A','doc')+box(39,224,260,108,t('重复请求','Replay'),'key = k1 · payload = A','doc')+box(39,378,260,108,t('冲突请求','Mismatch'),'key = k1 · payload = B','doc');
  a+=arrow(300,127,401,202)+arrow(300,279,401,262)+arrow(300,433,401,327,amber)+box(405,177,259,181,t('持久化动作记录','Durable action record'),t('租户 + 键 + 参数摘要','Tenant + key + digest'),'key','dark');
  a+=arrow(665,211,732,113)+arrow(665,270,732,270)+arrow(665,326,732,424,amber);
  a+=text(752,105,t('首次执行','First execution'),22,teal)+text(752,138,'action-007',17,muted)+text(752,266,t('返回原结果','Return original result'),20,teal)+text(752,299,t('不重复副作用','No second side effect'),16,muted)+text(752,422,t('拒绝复用','Reject reuse'),22,amber)+text(752,455,'PAYLOAD_MISMATCH',14,muted);break;
 case 'trace':
  a+=text(47,43,t('调用顺序示意 / 同一 trace_id 与 action_id','CALL ORDER / SHARED TRACE AND ACTION IDS'),18,muted);
  [[170,'用户','User'],[368,'运行时','Runtime'],[566,'模型','Model'],[764,'工具 / 下游','Tool / downstream']].forEach(([x,z,en])=>{a+=rect(x-65, 70,130,48,'#fff',line)+text(x,102,t(z,en),18,ink,'middle')+path(`M${x} 119V461`,line,1.5,'5 7')});
  a+=arrow(170,155,368,155)+text(200,143,t('提出任务','Task'),16,teal)+arrow(368,215,566,215)+text(397,203,t('最小上下文','Minimal context'),16,teal)+arrow(566,268,368,268)+text(397,256,t('工具选择','Tool choice'),16,teal)+arrow(368,326,764,326)+text(482,312,t('校验后提交动作','Validate, then submit'),16,teal)+arrow(764,382,368,382,amber,'5 4')+text(482,370,t('超时：记录 unknown','Timeout: record unknown'),16,amber)+arrow(368,436,764,436)+text(476,425,t('用 action_id 回查','Query by action_id'),16,teal);
  a+=text(47,493,t('保留可见调用与结果摘要，不记录密钥或模型隐藏推理。','Keep visible calls and result summaries, not secrets or hidden model reasoning.'),18,ink);break;
 case 'release':
  [['只读','Read-only',80,310,'data'],['建议','Advisory',290,235,'nodes'],['限定写入','Bounded writes',500,160,'tool'],['扩大范围','Broader scope',710,85,'flag']].forEach(([z,en,x,y,i],n)=>{a+=rect(x,y,171,430-y,n===3?'#d4ebe5':'#e8f0f2',line,0)+icon(i,x+66,y+23,teal,1)+text(x+85,y+99,t(z,en),20,ink,'middle');if(n<3)a+=arrow(x+174,y+55,x+210,y-20);});
  a+=text(42,46,t('依据证据与风险扩大授权，不按使用次数自动升级。','Expand authority on evidence and risk, not usage counts.'),21,ink)+path('M82 453H881',amber,3)+text(480,492,t('每一步：范围白名单 · 监测 · 暂停开关 · 异常对账','At each stage: allowlist · monitoring · pause · reconcile'),20,amber,'middle');break;
 case 'did':{
  const y=v=>421-v*10;
  [0,10,20,30].forEach(v=>{a+=path(`M100 ${y(v)}H650`,line,1)+text( 80,y(v)+6,v+'%',16,muted,'end')});
  a+=text(95, 70,t('复购率 / 合成算术','RETURN RATE / SYNTHETIC'),18,muted)+text(159,463,t('处理前','Before'),20)+text(558,463,t('处理后','After'),20);
  a+=path(`M180 ${y(20)}L590 ${y(28)}`,teal,4)+path(`M180 ${y(18)}L590 ${y(23)}`,blue,4,'8 5')+path(`M180 ${y(20)}L590 ${y(25)}`,line,2,'3 6');
  [[180,20,teal],[590,28,teal],[180,18,blue],[590,23,blue]].forEach(([x,v,c])=>a+=dot(x,y(v),6,c));
  a+=text(180,y(20)-19,'20%',20,teal,'middle')+text(180,y(18)+29,'18%',20,blue,'middle')+text(620,y(28)+5,'28%',22,teal)+text(620,y(23)+8,'23%',22,blue);
  a+=rect(718,130,194,240,ink,ink)+text(814,183,'+3', 60, '#fff','middle')+text(814,239,t('个百分点','percentage points'),18,'#b5e5dc','middle')+text(814,287,'8 pp − 5 pp',22,'#fff','middle')+text(814,339,t('不是因果证明','Not causal proof'),18,'#b5d5e0','middle');
  a+=path('M105 503H142',teal,4)+text(154,509,t('实验组 +8 pp','Treated +8 pp'),17,teal)+path('M360 503H397',blue,4,'6 4')+text(409,509,t('对照组 +5 pp','Control +5 pp'),17,blue)+path('M656 503H693',line,2,'3 4')+text(705,509,t('假设共同变化','Assumed common change'),16,muted);break;}
 case 'acceptance':
  [['系统','System','评估 · 版本 · 故障演练','Evals / versions / failure drills','code'],['行为','Adoption','采用 · 拒绝 · 执行记录','Adoption / rejections / actions','person'],['业务','Outcomes','口径 · 对照 · 成本 · 结果','Metrics / control / cost / outcome','chart']].forEach(([z,en,sz,se,i],n)=>{let x=65+n*306;a+=`<circle cx="${x+113}" cy="200" r="100" fill="${n===1?'#e0f1ed':'#edf3f5'}" stroke="${n===1?teal:line}" stroke-width="2"/>`+icon(i,x+93,139,teal,1)+text(x+113,227,t(z,en),28,ink,'middle')+text(x+113,340,t(sz,se),l==='zh'?17:14,muted,'middle')+text(x+113,402,'0'+(n+1),35,teal,'middle');if(n<2)a+=text(x+264,212,'≠',36,muted,'middle')});
  a+=text(480,478,t('分别回答：能不能用？有没有用？是否带来增量？','Ask separately: does it work, is it used, and does it add value?'),21,ink,'middle');break;
 case 'reuse':
  a=box(45,190,224,144,t('本次交付产物','Engagement outputs'),t('代码 / 规则 / 文档 / 测试','Code / rules / docs / tests'),'doc','dark');
  [['客户特定映射','Tenant mappings','保留在客户扩展层','Keep in tenant extension',54,'tool'],['跨客户领域语义','Shared domain semantics','形成可配置领域包','Package as domain assets',208,'nodes'],['通用机制与能力','General mechanisms','经产品评审进入核心','Review for product core',362,'code']].forEach(([z,en,sz,se,y,i])=>{a+=arrow(270,261,565,y+ 50)+box(572,y,344,107,t(z,en),t(sz,se),i,y===362?'teal':'light')});
  a+=text(48,471,t('复用需要边界、版本、测试与迁移验证，不是复制整个项目。','Reuse requires boundaries, versions, tests and migration checks.'),19,muted);break;
 case 'feedback':
  a=box(52,61,325,127,t('失败样本','Failed example'),t('输入 / 预期 / 实际 / 版本','Input / expected / actual / version'),'doc')+box(581,61,325,127,t('根因定位','Root cause'),t('数据？规则？工具？模型？','Data? Rules? Tool? Model?'),'search')+box(581,322,325,127,t('修改正确的一层','Change the right layer'),t('修复实现 + 解释适用边界','Fix implementation + scope'),'tool','teal')+box(52,322,325,127,t('加入回归测试','Regression test'),t('反例不再从评估集消失','Keep the counterexample'),'check','dark');
  a+=arrow(378,124,577,124)+arrow(743,190,743,318)+arrow(578,385,382,385)+arrow(214,320,214,190)+text(480,258,t('下一次交付可验证地变好','Verifiable improvement'),23,teal,'middle');break;
 case 'defense':
  [['结论','Claim','完成了哪些范围？','What scope is complete?',62,80,836,'flag'],['版本与运行证据','Version + run evidence','真实轨迹还是模拟？','Actual model trace or simulation?',122,184,716,'nodes'],['可复现测试与数据','Reproducible tests + data','输入、口径、断言在哪里？','Where are inputs, rules and assertions?',182,288,596,'code'],['限制与后续决定','Limits + next decision','哪些尚未证明？','What is still unproven?',242,392,476,'search']].forEach(([z,en,sz,se,x,y,w,i],n)=>{a+=box(x,y,w,86,t(z,en),t(sz,se),i,n===0?'dark':'light');if(n<3)a+=arrow(480,y+88,480,y+101)});break;
 case 'portfolio':
  [['设计方案','Design','架构 / 契约 / 风险','Architecture / contract / risk','doc'],['确定性模拟','Simulation','代码 / 断言 / 机制','Code / assertions / mechanics','code'],['模型集成','Model integration','真实任务 / 工具选择 / 轨迹','Real tasks / tool choice / traces','nodes'],['生产运行','Production','获授权环境 / 监测 / 交接','Authorized env / monitoring / ops','shield']].forEach(([z,en,sz,se,i],n)=>{const x=34+n*232;a+=rect(x,100,211,301,'#fff',line,8)+icon(i,x+83,132,teal,1.1)+text(x+105,221,t(z,en),21,ink,'middle')+text(x+105,281,t(sz,se),l==='zh'?14:12,muted,'middle')+text(x+105,363,'LEVEL '+(n+1),17,teal,'middle')});
  a+=text(480,466,t('这是一张证据分级图，不是课程自动授予的资格。','Evidence levels, not a qualification automatically conferred by the course.'),19,ink,'middle');break;
 default:throw Error('Unknown board '+b.id);
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" role="img" aria-label="${e(b.title[l])}" style="font-family:'Field','Noto Sans SC','Microsoft YaHei',sans-serif"><title>${e(b.title[l])}</title><desc>${e(b.caption[l])}</desc><rect width="960" height="540" fill="#f6faf9"/>${Array.from({length:25},(_,i)=>path(`M${i*40} 0V540`,'#e5eeee',.6)).join('')}${Array.from({length:14},(_,i)=>path(`M0 ${i*40}H960`,'#e5eeee',.6)).join('')}${a}</svg>`;
}

export function boardFigure(b,l='zh',compact=false){return `<figure class="teaching-board${compact?' compact-board':''}" id="board-${b.id}" data-teaching-board="${b.id}"><div class="board-toolbar"><span>AIelsen / FIELD BOARD · W${b.week}</span><button type="button" data-board-open="${b.id}" aria-label="${e((l==='zh'?'放大画板：':'Enlarge board: ')+b.title[l])}">${l==='zh'?'放大画板':'Enlarge board'} <span aria-hidden="true">↗</span></button></div><div class="board-viewport"><button type="button" class="board-image-trigger" data-board-open="${b.id}" aria-label="${e((l==='zh'?'查看图解大图：':'View diagram: ')+b.title[l])}">${boardSvg(b,l)}</button></div><figcaption><span class="board-number">${b.week}.${boards.filter(x=>x.week===b.week).indexOf(b)+1}</span><div><strong>${e(b.title[l])}</strong><p>${e(b.caption[l])}</p></div></figcaption><div class="board-footer"><span>${l==='zh'?'教学示意 · 与本周讲义对应':'Teaching diagram · paired with this module'}</span><a href="/assets/boards/${l}/${b.id}.svg" download>${l==='zh'?'下载 SVG':'Download SVG'} ↓</a></div></figure>`;}

export function illustrateLecture(html,week,l='zh'){
 for(const b of boards.filter(b=>b.week===week)){
  const marker=`<section class="lecture-section" id="topic-${b.before}">`;
  if(!html.includes(marker))throw Error('Missing insertion anchor '+week+' '+b.id);
  html=html.replace(marker,boardFigure(b,l)+marker);
 }
 return html;
}
export function boardNavigation(week,l='zh'){return `<div class="board-navigation"><span>${l==='zh'?'本周图解':'This week in diagrams'}</span>${boards.filter(b=>b.week===week).map(b=>`<a href="#board-${b.id}">${e(b.title[l])}<span aria-hidden="true">↘</span></a>`).join('')}</div>`;}

export function boardGallery(l='zh'){return `<section class="section board-gallery-section" id="visual-atlas"><div class="wrap"><div class="board-gallery-heading"><div><span class="eyebrow">VISUAL FIELD GUIDE / 24 BOARDS</span><h2>${l==='zh'?'教学画板：先看关系，再读实现':'Visual field guide: see the system, then build it'}</h2><p>${l==='zh'?'24 张图解对应 12 周讲义。可放大查看、下载矢量图，或回到课程阅读工程细节。所有图例均为教学模型，不含客户资料。':'Twenty-four diagrams paired with twelve modules. Enlarge, download the vector, or return to the implementation notes. All examples are educational and contain no customer data.'}</p></div><a class="text-link" href="/${l}/curriculum/">${l==='zh'?'完整课程':'Curriculum'} ↗</a></div><div class="atlas-grid">${boards.map(b=>`<article class="atlas-card"><button type="button" data-atlas-open="${b.id}" data-board-title="${e(b.title[l])}" data-board-caption="${e(b.caption[l])}" aria-label="${e((l==='zh'?'放大画板：':'Enlarge board: ')+b.title[l])}"><img src="/assets/boards/${l}/${b.id}.svg" alt="" width="960" height="540" loading="lazy"><span class="atlas-enlarge" aria-hidden="true">↗</span></button><div><span>W${b.week} / ${e(b.id.toUpperCase())}</span><h3>${e(b.title[l])}</h3><a href="/${l}/curriculum/${b.week}/#board-${b.id}">${l==='zh'?'在讲义中阅读':'Read in context'} →</a></div></article>`).join('')}</div></div></section>`;}

export function viewer(l='zh'){return `<dialog class="board-viewer" id="board-viewer" aria-labelledby="board-viewer-title"><div class="board-viewer-bar"><strong id="board-viewer-title">${l==='zh'?'教学画板':'Teaching board'}</strong><div><button type="button" data-board-size aria-pressed="false">${l==='zh'?'原尺寸':'Actual size'}</button><a data-board-download download>${l==='zh'?'下载 SVG':'Download SVG'} ↓</a><button type="button" data-board-close aria-label="${l==='zh'?'关闭画板':'Close board'}">${l==='zh'?'关闭':'Close'} ×</button></div></div><div class="board-viewer-canvas" tabindex="0" role="region" aria-label="${l==='zh'?'画板查看区，可滚动':'Scrollable diagram viewer'}"></div><p class="board-viewer-caption"></p></dialog>`;}
