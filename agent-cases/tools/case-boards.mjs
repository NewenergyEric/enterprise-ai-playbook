// Editable, language-specific artwork. Never bake English labels into a Chinese bitmap.
export const boardIds = ['velia','oliva','oliva-report','steve','atlas','nora','leo','leo-operations','iris','iris-decisions','iris-bundle','ruby','ruby-pitch','ruby-handoff'];
export const boardSize = [1200,760];
const C={ink:'#001f3f',paper:'#f3f6f7',white:'#ffffff',muted:'#576c7c',line:'#d9e1e5',teal:'#006d76',wash:'#e7f5f3',clay:'#af4636',sand:'#fff8da',blue:'#eef4f5'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function wrap(value,units){
 const lines=[]; let line='',n=0;
 for(const token of String(value).match(/[A-Za-z0-9][A-Za-z0-9’'/.-]*|\n|./gu)||[]){
  if(token==='\n'){lines.push(line);line='';n=0;continue;}
  const width=Array.from(token).reduce((a,ch)=>a+(ch.codePointAt(0)<=0x7f?.53:1),0);
  if(n+width>units&&line){lines.push(line.trim());line='';n=0;}
  line+=token;n+=width;
 }
 if(line)lines.push(line.trim());return lines;
}
function text(s,x,y,size=22,color=C.ink,width=1000,weight=400){
 return '<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" font-weight="'+weight+'">'+wrap(s,width/size).map((v,i)=>'<tspan x="'+x+'" dy="'+(i?size*1.5:0)+'">'+esc(v)+'</tspan>').join('')+'</text>';
}
const rect=(x,y,w,h,fill=C.white,stroke=C.line,r=0)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'"/>';
const line=(x,y,x2,y2,color=C.line,dash=false)=>'<path d="M'+x+' '+y+'L'+x2+' '+y2+'" fill="none" stroke="'+color+'" stroke-width="2"'+(dash?' stroke-dasharray="8 7"':'')+'/>';
const arrow=(x,y,x2,y2,dash=false)=>line(x,y,x2,y2,C.teal,dash)+'<path d="M'+(x2-9)+' '+(y2-6)+'L'+x2+' '+y2+'L'+(x2-9)+' '+(y2+6)+'" fill="none" stroke="'+C.teal+'" stroke-width="2"/>';
const pill=(s,x,y,w=190,fill=C.wash)=>rect(x,y,w,39,fill,'none',3)+text(s,x+13,y+26,17,fill===C.ink?C.white:C.ink,w-25,550);
function card(title,body,x,y,w,h,fill=C.white,index=''){
 const english=!/[\u3400-\u9fff]/.test(title),titleSize=english?22:25,bodySize=english?17:19;
 const titleY=y+(index?72:38),lines=wrap(title,(w-44)/titleSize).length;
 const bodyY=english?titleY+(lines-1)*titleSize*1.5+37:y+(index?116:85);
 return rect(x,y,w,h,fill)+ (index?text(index,x+22,y+34,17,C.teal,w-40,600):'') +text(title,x+22,titleY,titleSize,C.ink,w-44,600)+text(body,x+22,bodyY,bodySize,C.muted,w-44);
}
function base(title,subtitle,body,lang){
 const zh=lang==='zh';
 return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" lang="'+(zh?'zh-CN':'en')+'" role="img"><title>'+esc(title)+'</title><desc>'+esc(subtitle)+'</desc><rect width="1200" height="760" fill="'+C.paper+'"/><g font-family="'+(zh?'PingFang SC,Microsoft YaHei,Noto Sans CJK SC,Arial,sans-serif':'Arial,Helvetica,sans-serif')+'">'+text('AIelsen',40,42,20,C.ink,200,650)+text(zh?'实战案例 / 工作画板':'FIELD NOTES / WORKING ARTIFACT',780,42,16,C.muted,380)+line(40,61,1160,61)+text(title,40,112,zh?32:27,C.ink,1110,650)+text(subtitle,40,148,17,C.muted,1110)+body+line(40,697,1160,697)+text(zh?'匿名方法示例 · 用于解释工作，不是客户原始界面或经营数据':'Anonymized method example · not an original client interface or performance record',40,731,16,C.muted,1110)+'</g></svg>';
}
export function renderCaseBoard(id,lang='zh'){
 if(!boardIds.includes(id)||!['zh','en'].includes(lang))throw Error('Unknown board or unsupported language');
 const q=(zh,en)=>lang==='zh'?zh:en;
 let title='',sub='',b='';
 if(id==='velia'){
  title=q('同一份产品理解，进入四种营销交付','One product record, four marketing deliverables');
  sub=q('产品事实不变，受众、表达顺序与下一步任务分别设计。','Keep the facts consistent. Adapt the audience, narrative and next task.');
  b=rect(40,185,326,459,C.ink,C.ink)+text(q('共同底稿','SHARED RECORD'),65,223,18,'#83d2d1',270)+text(q('功能 → 差异 → 利益','Features → difference → benefit'),65,266,27,C.white,260,600);
  [[q('产品事实','Product facts'),q('哪种产品 / 什么条件下可用','Which product; under which conditions')],[q('用户利益','User benefit'),q('为谁解决什么使用问题','Who it helps and what task it solves')],[q('证明方式','Evidence'),q('资料、对照与待确认事项','Sources, comparisons and open questions')]].forEach(([a,c],i)=>{b+=text(a,65,373+i*94,20,'#83d2d1',265,600)+text(c,65,405+i*94,18,C.white,265);});
  [[q('内容与页面','Content & pages'),q('排卖点顺序，写清楚使用场景。','Prioritize benefits and show the use case.')],[q('创作者简报','Creator brief'),q('受众为什么关心，内容可以怎样拍。','Explain the audience fit and a filmable idea.')],[q('渠道计划','Channel plan'),q('继承主推组合，安排渠道与节奏。','Carry forward the offer and channel sequence.')],[q('商务材料','Business story'),q('重排证据，让另一种受众看懂。','Restructure evidence for a different audience.')]].forEach(([a,c],i)=>{const x=440+(i%2)*365,y=185+Math.floor(i/2)*245;b+=card(a,c,x,y,355,214,i<2?C.white:C.blue,'0'+(i+1));});
  b+=arrow(368,421,423,421);
 } else if(id==='oliva'){
  title=q('接住一个客户问题，留下可用的回复与知识','Handle the question. Leave a usable reply and better knowledge.');
  sub=q('客服仍掌握对外回复：Agent 把资料、上下文与待确认事项一起交过来。','The support team owns the customer reply. The Agent brings context, sources and open items.');
  b=card(q('客户已经告诉我们的','What the customer already provided'),q('产品型号、订单信息\n\n这次想问：\n配件能否兼容？\n物流进度去哪里确认？','Product model and order details.\n\nNow asking:\nIs this accessory compatible?\nWhere can delivery progress be confirmed?'),40,184,315,347,C.blue,'01');
  b+=card(q('给客服的建议回复','Suggested reply for the support team'),q('按对应型号说明兼容条件。\n\n物流状态交给订单负责人核对。\n\n已经提供的信息，不再重复索要。','Explain compatibility using the matching model guide.\n\nAsk the order owner to confirm delivery status.\n\nDo not request information already provided.'),397,184,382,347,C.white,'02');
  b+=card(q('回复为什么可信','Why the reply is usable'),q('来源：型号说明与服务规则\n\n待确认：实时订单状态\n\n不做：无依据的保证','Sources: model guide and service policy\n\nOpen: live order status\n\nAvoid: unsupported promises'),821,184,339,347,C.sand,'03');
  b+=arrow(360,350,389,350)+arrow(784,350,813,350);
  b+=rect(40,563,1120,82,C.wash)+text(q('人工核对与修订','Human review and revision'),64,599,23,C.ink,300,600)+arrow(364,605,427,605)+text(q('确认后的有效修订，更新 FAQ；重复或冲突内容不直接入库。','Confirmed corrections update the FAQ. Duplicates and conflicts do not enter unchecked.'),456,598,20,C.muted,672);
 } else if(id==='oliva-report'){
  title=q('相关分析方法：从一个猜测，拆成可检查的问题','Related analysis method: turn a guess into checkable questions');
  sub=q('这是相关报告方法，不是 Oliva 已核实的独立销售成果。','A related reporting method, not an independently verified sales outcome attributable to Oliva.');
  b=card(q('最初的猜测','Initial guess'),q('客户反馈发生变化。\n销售也发生变化。\n\n是不是前者造成了后者？\n\n同一时间发生，还不能说明因果。','Customer feedback changed.\nSales changed too.\n\nDid one cause the other?\n\nTiming alone is not causation.'),40,185,333,461,C.sand,'01');
  b+=arrow(381,400,422,400);
  [[q('流量','Traffic'),q('曝光与访问是否变化？','Did exposure or visits change?')],[q('转化','Conversion'),q('购买环节哪里出现阻力？','Where did the buying journey become harder?')],[q('客单价','Order value'),q('产品组合与购买结构是否变化？','Did offer mix or purchase composition change?')]].forEach(([a,c],i)=>{b+=card(a,c,448+i*241,185,230,275,C.white,'0'+(i+2));});
  b+=rect(448,495,712,150,C.ink,C.ink)+text(q('把客户声音放回对应环节','Place customer feedback in the relevant step'),473,537,24,C.white,650,600)+text(q('留下待核对资料、具体检查动作和接手团队。','Leave the missing information, next check and responsible team.'),473,580,20,'#cbdbe5',650);
 } else if(id==='steve'){
  title=q('交接前，先分清“写在文档里”和“实际在运行”','Before handoff, separate the written claim from actual behavior');
  sub=q('查证交付的是事实与待确认项；并不自动代表代码已经修复。','The handoff contains verified behavior and open decisions, not an assumed repair.');
  const xs=[245,548,851];
  [q('文档与配置','Documented'),q('实际读取','Read by the code'),q('进入判断','Used in a decision')].forEach((s,i)=>b+=pill(s,xs[i],184,287,C.blue));
  b+=text(q('规则甲','Rule A'),43,301,24,C.ink,180,600)+text(q('已生效','Connected'),43,335,19,C.teal,180);
  b+=text(q('规则乙','Rule B'),43,449,24,C.ink,180,600)+text(q('尚未接入','Not connected'),43,483,19,C.clay,180);
  xs.forEach((x,i)=>{b+=rect(x,250,287,112,C.wash)+text(q(['找到声明','调用链读取','条件改变输出'][i],['Claim located','Value is read','Value affects output'][i]),x+20,307,22,C.ink,247,600);if(i<2)b+=arrow(x+290,305,x+299,305);});
  xs.forEach((x,i)=>{b+=rect(x,397,287,112,i?C.paper:C.sand,i?C.line:C.clay)+text(q(['找到声明','未发现使用路径','不能认定功能生效'][i],['Claim located','No usage path found','Do not call it active'][i]),x+20,454,22,i?C.muted:C.ink,247,550);if(i<2)b+=arrow(x+290,452,x+299,452,true);});
  b+=rect(40,550,1120,97,C.ink,C.ink)+text(q('交给下一位','HANDOFF'),63,589,20,'#83d2d1',180,600)+text(q('当前实现的事实　 /　 未接入清单　 /　 需要业务负责人确认的规则','Current behavior   /   Disconnected capabilities   /   Business decisions to confirm'),262,589,22,C.white,865);
 } else if(id==='atlas'){
  title=q('把专家核查经验，变成别人能够复走的调查路径','Turn expert checks into an investigation others can retrace');
  sub=q('观察有来源，冲突有记录，缺口有下一步；不以一个总分代替判断。','Source the observations, record conflicts and give gaps a next step.');
  b=rect(40,185,685,461,C.ink,C.ink);
  const sources=[[q('时间变化','Timeline'),91,220],[q('社区反馈','Community'),464,220],[q('身份资料','Identity'),91,491],[q('内容线索','Content'),464,491]];
  sources.forEach(([s,x,y],i)=>{b+=rect(x,y,210,93,i===2?'#254553':'#ffffff','none',4)+text(s,x+18,y+42,23,i===2?'#d9e5e8':C.ink,175,600)+text(q(i===2?'待补查':'可回到来源',i===2?'Source missing':'Traceable source'),x+18,y+73,17,i===2?'#bdcfd7':C.muted,175);b+=line(x+105,y+(i<2?96:-4),380,i<2?342:447,'#8faeb0',i===2);});
  b+='<circle cx="380" cy="395" r="69" fill="#f0d242"/>'+text(q('核查问题','CHECK'),327,400,24,C.ink,130,650);
  b+=card(q('一份能复核的报告','A reviewable report'),q('已观察到什么\n对应哪一份来源\n哪些信息相互冲突\n还缺哪一项资料\n下一步由谁核对','What was observed\nWhich source supports it\nWhere sources conflict\nWhat is still missing\nWho checks next'),770,185,390,353,C.white,q('报告结构','REPORT'));
  b+=pill(q('线索 ≠ 结论；缺失 ≠ 正常','Signal ≠ verdict; missing ≠ normal'),770,573,390,C.sand);
 } else if(id==='nora'){
  title=q('同一张卡片：切换、猜测与播放，不是同一个动作','One card: switching, guessing and listening are different actions');
  sub=q('产品原则进入每一次点击；图、文、音和双端体验共同交付。','Carry the product principle through every click and every content asset.');
  b=rect(40,185,554,461,'#001f3f','none',20)+rect(59,203,516,425,C.white,'none',10);
  b+='<path d="M308 270c-5-22 10-37 27-45" fill="none" stroke="#745841" stroke-width="9"/><path d="M309 257c9-30 39-32 46-24-2 28-28 39-46 24" fill="#829a67"/><path d="M307 283c-85-55-173 5-151 99 13 58 65 119 96 93 38-26 66 18 101 4 47-19 96-91 93-146-4-65-89-90-139-50Z" fill="#c95240"/><path d="M203 324c-21 10-28 27-22 46" fill="none" stroke="#eeaa8c" stroke-width="12" stroke-linecap="round"/>';
  b+=text(q('先试一试，再主动揭晓','Try first. Reveal when ready.'),136,539,24,C.ink,390,550);
  [q('看线索','Clue'),q('主动听','Listen'),q('下一张','Next')].forEach((s,i)=>b+=pill(s,85+i*160,571,146,i===1?C.sand:C.wash));
  [[q('切换内容','Switch card'),q('只换卡，不自动播放。','Change the card without autoplay.')],[q('选择线索','Request a clue'),q('帮助探索，不直接记为掌握。','Support exploration; do not mark mastery.')],[q('主动播放','Choose to listen'),q('声音由明确操作触发。','Play audio after an explicit action.')]].forEach(([a,c],i)=>b+=card(a,c,639,185+i*156,521,140,i===1?C.sand:C.white));
 } else if(id==='leo'){
  title=q('把评论区里的新问题，变成每天能接手的工作','Turn new customer comments into a daily work list');
  sub=q('每天交付的是待处理问题及其出处；采集、补录与失败状态各自说明。','Deliver questions with their sources. Keep backfill and collection status separate.');
  b=card(q('分散的评论','Incoming comments'),q('产品使用问题\n发货与退款咨询\n负面体验与追问\n\n同一来源会被反复采集。','Product questions\nDelivery and refund queries\nNegative feedback\n\nSources are collected repeatedly.'),40,185,305,458,C.blue,'01');
  b+=arrow(354,410,396,410);
  b+=card(q('先检查再归类','Check, then classify'),q('发生在本期吗？\n过去是否处理过？\n有哪些来源没采到？\n\n按问题类型整理，\n补录不混进今天新增。','Did it happen this period?\nWas it already processed?\nWhich sources were unavailable?\n\nGroup by issue. Keep backfills separate.'),413,185,338,458,C.white,'02');
  b+=arrow(758,410,799,410);
  b+=card(q('客服与运营接手','Support takes over'),q('今天新增的问题清单\n对应的评论与来源\n需要注意的反馈类别\n运行缺口与待补项\n\n由团队判断怎样回应。','New questions today\nOriginal comments and sources\nFeedback categories\nCoverage gaps\n\nThe team decides how to respond.'),816,185,344,458,C.sand,'03');
 } else if(id==='leo-operations'){
  title=q('今天采到三条，为什么只新增一条？','Three records arrived today. Why is only one new?');
  sub=q('教学样例：先看发生时间，再看历史记录，最后交付当天要处理的内容。','Teaching example: check event time, then history, then the daily work list.');
  b=rect(40,185,797,402,C.white)+rect(40,185,797,65,C.ink,C.ink);
  [q('记录','Record'),q('发生时间','Event time'),q('历史状态','History'),q('怎样处理','Treatment')].forEach((s,i)=>b+=text(s,64+i*195,227,20,C.white,180,550));
  const rows=[[q('记录甲','Record A'),q('过去','Earlier'),q('尚未入库','Not stored'),q('历史补录','Backfill')],[q('记录乙','Record B'),q('本期','This period'),q('尚未处理','Not seen'),q('本期新增','New this period')],[q('记录丙','Record C'),q('本期','This period'),q('已经存在','Already stored'),q('查重后排除','Exclude duplicate')]];
  rows.forEach((row,i)=>{b+=rect(41,251+i*112,795,111,i===1?C.wash:C.white,'none');row.forEach((s,j)=>b+=text(s,64+j*195,308+i*112,21,j===3&&i===1?C.teal:C.ink,170,j===3?600:400));});
  b+=rect(871,185,289,402,C.ink,C.ink)+text(q('本期真正新增','NEW THIS PERIOD'),896,232,18,'#83d2d1',240,550)+text('1',912,395,145,C.white,215,550)+text(q('只把记录乙\n交给当期运营处理','Only record B enters\nthe current work list.'),898,466,25,C.white,235,550);
  b+=pill(q('来源失败、迟到与补录另列，不把“运行成功”当成“覆盖完整”。','Track failed sources, delays and backfills separately.'),40,616,1120,C.sand);
 } else if(id==='iris'){
  title=q('用户反馈进入上市决策，上市结果再改进提问','Use research for launch decisions; use launch learning for better questions');
  sub=q('研究不止形成结论，还要进入页面、视频、产品组合与下一轮验证。','Carry findings into pages, video, offer design and the next round of research.');
  const items=[[q('拆开问卷问题','Separate questions'),q('兴趣、情境、意愿和顾虑，分别看口径与样本。','Read interest, context, intent and hesitation with their own sample limits.')],[q('交给上市团队','Inform the launch'),q('形成表达顺序、内容任务与有前提的组合建议。','Develop message priorities, content tasks and conditional offer proposals.')],[q('上市后再对照','Review after launch'),q('回看实际方案，找出原假设遗漏的选择。','Compare the actual offer and find choices the first study missed.')]];
  items.forEach(([a,c],i)=>{const x=40+i*381;b+=card(a,c,x,185,358,307,i===1?C.blue:C.white,'0'+(i+1));if(i<2)b+=arrow(x+361,340,x+375,340);});
  b+=rect(40,537,1120,108,C.ink,C.ink)+text(q('下一轮：不再只问“喜不喜欢整套”','NEXT ROUND: go beyond liking the full bundle'),64,577,25,C.white,1060,600)+text(q('分别核对核心产品、扩展能力、完整组合，以及每种选择背后的原因。','Ask about the core, extension and complete bundle, and the reason behind each choice.'),64,616,20,'#cbdbe5',1060);
 } else if(id==='iris-decisions'){
  title=q('用户研究不止排偏好，要回答下一步怎么做','User research must lead to the next decision');
  sub=q('不同问题分别分析；不把功能兴趣直接当成购买意愿。','Read each question on its own terms. Feature interest is not purchase intent.');
  const rows=[[q('什么吸引我','What attracts me'),q('功能兴趣','Interest'),q('决定表达入口','Prioritize the message')],[q('我会在哪里用','Where I would use it'),q('使用情境','Context'),q('安排内容与拍摄任务','Plan content and scenes')],[q('我现在准备买吗','Am I ready to buy'),q('购买意愿','Intent'),q('区分人群与验证任务','Separate audiences and tests')],[q('为什么还没买','What stops me'),q('购买顾虑','Hesitation'),q('回应上手、替代与组合问题','Address learning, substitutes and bundles')]];
  rows.forEach(([question,label,output],i)=>{const y=185+i*118;b+=rect(40,y,1120,101,i%2?C.white:C.blue)+pill('0'+(i+1),60,y+28,53,C.ink)+text(question,136,y+59,25,C.ink,310,600)+arrow(454,y+52,496,y+52)+text(label,526,y+59,22,C.teal,200,600)+arrow(748,y+52,790,y+52)+text(output,822,y+48,23,C.ink,300,550);});
 } else if(id==='iris-bundle'){
  title=q('先问买什么，再问愿意付多少','Ask what people want to buy before asking the price');
  sub=q('上市后的组合方案，促使下一轮研究把原来的整套问题拆开。','The launch bundle structure prompts a more precise next round of research.');
  b=card(q('原问题','ORIGINAL QUESTION'),q('如果只能评价一整套，\n就看不见“先买核心能力，\n再考虑扩展”的选择。','Rating only the complete bundle hides the option to buy the core capability first and add more later.'),40,185,305,457,C.sand,'01');
  b+=arrow(354,408,400,408);
  [[q('基础产品','Core product'),q('核心任务是否值得购买？','Is the core task worth buying?')],[q('扩展能力','Extension'),q('什么情境下才需要增加？','When is the extension useful?')],[q('完整组合','Complete bundle'),q('整套购买解决什么额外问题？','What extra problem does the bundle solve?')]].forEach(([a,c],i)=>{b+=card(a,c,422+i*248,185,235,304,i===1?C.blue:C.white,'0'+(i+2));b+=rect(447+i*248,400,56+i*18,54,i===1?C.clay:C.teal,'none',8);});
  b+=rect(422,534,738,108,C.ink,C.ink)+text(q('下一轮问卷：组合选择 + 愿付 + 替代方案','Next survey: bundle choice + willingness to pay + alternatives'),447,577,25,C.white,690,600);
 } else if(id==='ruby'){
  title=q('把一份产品资料，接成完整的网红合作开发','Connect a product brief to a complete creator-outreach workflow');
  sub=q('家庭体感游戏产品：从找对频道、写对选题，到有上下文的回复与交接。','A family active-play device: channel fit, content ideas, replies and informed handoff.');
  const rows=[[q('看频道','CHANNEL FIT'),q('受众为什么会关心这类产品？','Why would this audience care?'),q('留下匹配理由与核验状态','Record the fit and verification status')],[q('写选题','CONTENT PITCH'),q('产品可以进入怎样的一段内容？','What kind of story can the product support?'),q('形成具体场景、提议与下一步','Propose a scene, angle and next step')],[q('接回复','FOLLOW UP'),q('对方的兴趣、条件与问题是什么？','What interests, terms or questions came back?'),q('延续原线程，不重复丢失背景','Retain the thread and its context')],[q('交机会','HANDOFF'),q('商务团队需要接着确认什么？','What must the commercial team confirm?'),q('交清已知、未定、负责人和行动','Handoff known facts, open items and owners')]];
  rows.forEach(([s,a,c],i)=>{const y=185+i*116;b+=rect(40,y,1120,101,i%2?C.white:C.blue)+text(s,63,y+56,23,C.teal,220,600)+text(a,289,y+46,20,C.ink,355)+arrow(657,y+53,693,y+53)+text(c,725,y+46,21,C.ink,406,550);});
 } else if(id==='ruby-pitch'){
  title=q('家庭体感游戏设备，怎样成为创作者的一个选题？','How does a family active-play device become a creator story?');
  sub=q('不是在模板里换名字，而是为不同受众写出不同的内容理由。','Personalization changes the content idea, not only the recipient name.');
  b=card(q('仅介绍产品','PRODUCT-ONLY INTRO'),q('我们有很多功能。\n适合家庭使用。\n希望有机会合作。\n\n对方仍不知道：\n为什么是我的频道？','Our product has many features.\nIt is for families.\nWe would like to collaborate.\n\nBut why this channel?'),40,185,322,457,C.sand,q('对照示例','COMPARISON EXAMPLE'));
  b+=arrow(370,408,412,408);
  b+=card(q('亲子内容频道','FAMILY CHANNEL'),q('观众关系：一起参与的家庭活动\n\n可拍提议：客厅轮流挑战，记录孩子和家长各自的体验。\n\n下一步：先确认内容形式与关注点。','Audience fit: shared family activities.\n\nPitch: a living-room turn-taking challenge, showing each participant’s experience.\n\nNext: agree the format and questions.'),438,185,352,457,C.white,'01');
  b+=card(q('科技体验频道','TECH REVIEW CHANNEL'),q('观众关系：新交互是否真的好用\n\n可拍提议：上手准备、动作反馈、空间要求与限制。\n\n下一步：先确认评测问题与安排。','Audience fit: whether the new interaction is usable.\n\nPitch: setup, motion feedback, space and limitations.\n\nNext: agree the evaluation questions.'),813,185,347,457,C.blue,'02');
 } else if(id==='ruby-handoff'){
  title=q('每一封回复，都要变成一个清楚的下一步','Turn every reply into a clear next action');
  sub=q('意向、报价、评测安排与暂停分别记录，不把邮件往来写成已完成合作。','Keep interest, quotes, review arrangements and pauses distinct from completed collaborations.');
  const rows=[[q('表达兴趣','INTEREST'),q('想进一步了解产品','Wants product details'),q('确认受众与内容形式','Confirm audience and format')],[q('提出报价','QUOTE'),q('给出合作费用或条件','Shares price or conditions'),q('交给商务评估，不擅自承诺','Handoff for commercial review')],[q('考虑替代形式','ALTERNATIVE'),q('视频不合适，讨论图文评测','Discusses a written review instead'),q('保留目的，重新核对交付形式','Keep the objective; review the format')],[q('项目暂停','PAUSED'),q('暂时不能继续或项目结束','Cannot continue at this stage'),q('暂停触达，保留历史与状态','Pause outreach and retain context')]];
  rows.forEach(([s,a,c],i)=>{const y=185+i*116;b+=rect(40,y,1120,101,i%2?C.white:C.blue)+text(s,63,y+56,23,C.teal,220,600)+text(a,309,y+47,20,C.ink,340)+arrow(657,y+53,693,y+53)+text(c,725,y+47,21,C.ink,406,550);});
 }
 return base(title,sub,b,lang);
}
