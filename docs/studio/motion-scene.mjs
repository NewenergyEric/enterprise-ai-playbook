// Original vector motion design. Every position is a deterministic function of time.
// No reference bitmap, customer footage, external font or network request is used.
export const WIDTH=1100, HEIGHT=650, FPS=20, DURATION=18;
const C={ink:'#001f3f',teal:'#007d86',blue:'#3246ff',muted:'#526578',line:'#d9e1e5',paper:'#f3f6f7',white:'#ffffff'};
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=v=>1-Math.pow(1-clamp(v),3);
const mix=(a,b,p)=>a+(b-a)*p;
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const f=v=>Number(v.toFixed(3));
const rect=(x,y,w,h,fill=C.white,r=6,stroke=C.line)=>`<rect x="${f(x)}" y="${f(y)}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
const line=(x1,y1,x2,y2,color=C.line,width=2)=>`<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
const text=(x,y,label,size=16,color=C.ink,weight=400,anchor='start')=>`<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}">${esc(label)}</text>`;
const path=(d,color=C.ink,width=2,fill='none')=>`<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"/>`;
const group=(body,x=0,y=0,angle=0,opacity=1,scale=1)=>`<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)}) scale(${f(scale)})" opacity="${f(clamp(opacity))}">${body}</g>`;
const stamp=(label,x,y,w=115)=>rect(x,y,w,27,C.paper,2,'none')+text(x+10,y+18,label,12,C.teal,700);
const draw=(d,p,color=C.teal,width=3)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${f(1-clamp(p))}"/>`;
function sheet(w,h,title,accent=C.teal){
 let s=rect(5,7,w,h,'#e5ecef',4,'none')+rect(0,0,w,h,C.white,4,C.ink)+rect(0,0,5,h,accent,0,'none');
 s+=text(16,28,title,14,C.ink,700)+line(16,42,w-16,42);
 for(let i=0;i<4;i++) s+=line(16,62+i*15,w-20-(i%2)*23,62+i*15,i===0?C.muted:C.line,3);
 return s;
}
function miniDoc(x,y,rot=0,accent=C.teal){return group(rect(0,0,27,34,C.white,2,C.ink)+path('M17 0V10H27')+line(6,16,19,16,accent,2)+line(6,23,19,23,C.line,2),x,y,rot);}
function cube(x,y,scale=1,color=C.blue){return group(path('M0 15L28 0 56 15 28 30Z',C.ink,1.5,'#e4e9f8')+path('M0 15V49L28 65V30Z',C.ink,1.5,C.white)+path('M28 30L56 15V49L28 65Z',C.ink,1.5,color),x,y,0,1,scale);}
function tick(x,y,p){return group(`<circle cx="0" cy="0" r="12" fill="white" stroke="${C.teal}" stroke-width="1.5"/>`+draw('M-5 0L-1 4 6-5',p,C.teal,2.4),x,y);}
const copy={
 zh:{eyebrow:'从业务现场，到可验收的交付',titles:[['先弄清楚，','工作卡在哪里。'],['让 Agent 接手','一段完整工作。'],['把工作做出来，','也把依据留下。'],['交付一个项目，','留下团队能力。']],sub:[['资料聚拢，问题被定位。','先形成可以开工的需求简报。'],['研究、FAB、文案与分镜接力。','工具围绕同一个业务任务协作。'],['报告、文案、分镜逐项展开。','产出经过核对，才进入交付。'],['规则、模板、评估一同归档。','下一次工作从已有经验出发。']],steps:['发现问题','组织执行','核验交付','沉淀复用'],words:{research:'研究资料',voice:'客户问题',facts:'产品事实',brief:'需求简报',goal:'任务目标',source:'研究',fab:'FAB',copy:'文案',film:'分镜',report:'研究简报',campaign:'营销文案',evidence:'验收记录',storyboard:'TVC 分镜',rules:'规则',templates:'模板',evals:'评估',kit:'交付工具包',next:'下一次项目',scope:'范围与验收',check:'核对依据',pack:'可复用资产'},foot:'FDE 服务  /  Agent 案例  /  FDE Academy',note:'方法示意 · 非客户记录'},
 en:{eyebrow:'FROM FIELD PROBLEMS TO VERIFIED DELIVERY',titles:[['Find where','the work gets stuck.'],['Give the agent','a whole workflow.'],['Show the work.','Keep the evidence.'],['Deliver the project.','Leave the capability.']],sub:[['Bring the information together.','Turn the problem into a usable brief.'],['Research, FAB, copy and storyboards.','Connected tools. One business task.'],['Reports, copy and storyboards take shape.','Review the outputs before handoff.'],['Package rules, templates and evaluation.','Start the next project with what you learned.']],steps:['Discover','Execute','Verify','Reuse'],words:{research:'RESEARCH',voice:'QUESTIONS',facts:'PRODUCT',brief:'PROJECT BRIEF',goal:'TASK',source:'RESEARCH',fab:'FAB',copy:'COPY',film:'STORYBOARD',report:'RESEARCH BRIEF',campaign:'CAMPAIGN COPY',evidence:'REVIEW RECORD',storyboard:'TVC STORYBOARD',rules:'RULES',templates:'TEMPLATES',evals:'EVALUATION',kit:'DELIVERY KIT',next:'NEXT PROJECT',scope:'SCOPE & ACCEPTANCE',check:'CHECK THE EVIDENCE',pack:'REUSABLE ASSETS'},foot:'FDE SERVICES  /  AGENT CASES  /  FDE ACADEMY',note:'Method illustration · not a client record'}
};

// Scene 1: source documents converge, a magnifier inspects them, and a brief emerges.
function discover(t,w){
 let s='';
 const gather=ease((t-2.2)/1.5),inP=ease(t/.7);
 const documents=[{x:26,y:39,rot:-7,title:w.research},{x:342,y:32,rot:7,title:w.voice},{x:325,y:224,rot:-5,title:w.facts}];
 for(let i=0;i<3;i++){
  const d=documents[i],p=ease((t-i*.09)/.7);
  s+=group(sheet(156,128,d.title,i===2?C.blue:C.teal),mix(d.x,220,gather),mix(d.y-38*(1-p),162,gather),mix(d.rot,0,gather),1-gather*.82);
 }
 // A hand-drawn selection circle grows around the useful evidence.
 s+=group(draw('M145 151C167 133 216 132 237 151C258 180 216 195 175 183C143 174 140 160 145 151',ease((t-.9)/1.1),C.blue,2),0,0,0,1-gather);
 const mx=170+60*Math.sin(t*1.3),my=171+19*Math.cos(t*1.7);
 let lens=`<circle cx="0" cy="0" r="38" fill="white" fill-opacity=".6" stroke="${C.ink}" stroke-width="5"/><circle cx="0" cy="0" r="31" fill="none" stroke="${C.line}" stroke-width="2"/>`+path('M26 29L65 70',C.ink,14)+path('M30 33L60 66',C.teal,6);
 s+=group(lens,mx,my,9*Math.sin(t),inP*(1-ease((t-2.8)/.65)));
 for(let i=0;i<3;i++){
   const u=(t*.38+i*.31)%1;
   s+=miniDoc(mix(440,239,u),mix(110+i*65,224,u)-Math.sin(u*Math.PI)*45,mix(15,-3,u),i===2?C.blue:C.teal);
 }
 const bp=ease((t-2.65)/.8);
 let brief=sheet(215,176,w.brief)+line(17,130,195,130,C.teal,3)+stamp(w.scope,16,140,183);
 brief+=tick(186,25,ease((t-3.15)/.65));
 s+=group(brief,176,138+40*(1-bp),0,bp,.92+.08*bp);
 s+=group(path('M76 333C130 392 221 389 280 352',C.line,2)+draw('M76 333C130 392 221 389 280 352',(t*.19)%1,C.teal,3),0,0,0,1-gather);
 return s;
}

function curve(points,u){const v=1-u;return [v*v*v*points[0][0]+3*v*v*u*points[1][0]+3*v*u*u*points[2][0]+u*u*u*points[3][0],v*v*v*points[0][1]+3*v*v*u*points[1][1]+3*v*u*u*points[2][1]+u*u*u*points[3][1]];}
// Scene 2: packets physically travel between the task and tools. The dial tracks processing.
function execute(t,w){
 const nodes=[{x:22,y:162,label:w.goal},{x:234,y:22,label:w.source},{x:437,y:104,label:w.fab},{x:439,y:274,label:w.copy},{x:229,y:338,label:w.film}];
 const curves=[[[126,192],[187,192],[163,220],[220,220]],[[288,77],[288,132],[280,122],[280,163]],[[438,139],[385,139],[403,199],[339,205]],[[438,299],[377,299],[402,249],[339,238]],[[282,338],[282,309],[287,309],[287,276]]];
 let s='';
 curves.forEach((p,i)=>{
  const d=`M${p[0]}C${p[1]} ${p[2]} ${p[3]}`;
  s+=path(d,C.line,2)+draw(d,ease((t-i*.14)/.7),C.teal,2.5);
  const u=(t*.46+i*.19)%1,pt=curve(p,i===0?u:1-u);
  s+=miniDoc(pt[0]-11,pt[1]-14,-8+u*16,i===2?C.blue:C.teal);
 });
 nodes.forEach((n,i)=>{
  const p=ease((t-i*.06)/.5);
  let card=rect(0,0,108,55,C.white,5,C.ink)+text(54,33,n.label,12,C.ink,700,'middle');
  if(i===0)card=sheet(108,112,n.label)+stamp('→',17,78,74);
  s+=group(card,n.x,n.y+18*(1-p),0,p);
 });
 let core=`<circle cx="0" cy="0" r="59" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/><circle cx="0" cy="0" r="49" fill="${C.paper}"/>`;
 const angle=t*86;
 core+=group(path('M0-58A58 58 0 0 1 55 18',C.teal,5),0,0,angle);
 core+=text(0,4,'Agent',24,C.ink,700,'middle')+text(0,25,'FDE',11,C.teal,700,'middle');
 s+=group(core,281,220);
 // The current task card moves across a physical work queue, not just a progress bar.
 const q=(t*.29)%1;
 s+=group(rect(0,0,143,58,C.white,3,C.ink)+text(13,23,[w.source,w.fab,w.copy,w.film][Math.min(3,Math.floor(t/.95))],12,C.teal,700)+line(13,38,119,38,C.line,3),75+q*44,303-q*15,-5+q*5);
 return s;
}

function artifactCard(label,kind,t){
 let s=rect(4,5,163,169,'#e5ecef',4,'none')+rect(0,0,163,169,C.white,4,C.ink)+text(13,25,label,11,C.ink,700)+line(13,37,150,37);
 if(kind===0){
  s+=line(16,139,146,139,C.line,1);
  [0,1,2,3].forEach(i=>{const h=(22+i*15)*ease((t-i*.11)/.8);s+=rect(19+i*31,132-h,18,h,C.teal,1,'none');});
  s+=draw('M21 87L49 76 82 85 114 62 145 67',ease(t/1.2),C.blue,2.5);
 }else if(kind===1){
  s+=cube(53,51,.79,C.blue);
  s+=group(line(14,127,146,127,C.ink,5)+line(14,142,102,142,C.line,4),0,9*(1-ease(t/.8)),0,ease(t/.8));
 }else{
  [0,1,2,3].forEach(i=>{s+=line(43,66+i*25,145,66+i*25,C.line,3);s+=group(draw('M0 0L4 5 12-6',ease((t-.28-i*.36)/.35),C.teal,2.5),20,65+i*25);});
 }
 return s;
}
// Scene 3: deliverables fan out, charts draw, checks appear and the filmstrip plays.
function verify(t,w){
 let s='';
 [w.report,w.campaign,w.evidence].forEach((label,i)=>{const p=ease((t-i*.08)/.68);s+=group(artifactCard(label,i,Math.max(0,t-.45)),mix(188,22+i*188,p),mix(100,28,p),mix((i-1)*-12,0,p),p);});
 const fp=ease((t-.7)/.65);
 let film=rect(0,0,550,133,C.ink,6,C.ink)+text(14,25,w.storyboard,12,C.white,700);
 for(let i=0;i<18;i++) film+=rect(12+i*30,35,10,5,C.white,0,'none')+rect(12+i*30,118,10,5,C.white,0,'none');
 film+='<defs><clipPath id="strip"><rect x="12" y="46" width="526" height="65" rx="2"/></clipPath></defs><g clip-path="url(#strip)">';
 const drift=(t*37)%142;
 for(let i=-1;i<6;i++){
  const x=12+i*142-drift;
  film+=rect(x,46,130,65,i%2===0?'#f3f6f7':'#e4e9f8',2,'none');
  film+=cube(x+45,53,.72,i%2===0?C.teal:C.blue);
  film+=path(`M${x+8} 52H${x+17}M${x+8} 52V61M${x+122} 105H${x+113}M${x+122} 105V96`,C.muted,1);
 }
 film+='</g>';
 const px=24+(t*.17%1)*500;
 film+=path(`M${px-5} 41H${px+5}L${px} 46Z`,C.blue,1,C.blue)+line(px,46,px,111,C.blue,2);
 s+=group(film,22,239+35*(1-fp),0,fp);
 const checkAt=ease((t-1.1)/.4);
 s+=group(stamp(w.check,0,0,185)+tick(172,13,checkAt),211,202,0,checkAt);
 return s;
}

// Scene 4: files arrive, are filed into three shelves, then feed the next project.
function reuse(t,w){
 let s='';
 const labels=[w.rules,w.templates,w.evals],baseX=113,baseY=159;
 s+=path('M113 159L145 136H426L394 159Z',C.ink,1.5,'#e5ecef');
 s+=path('M394 159L426 136V333L394 356Z',C.ink,1.5,'#cbd7df');
 s+=rect(baseX,baseY,281,197,C.white,0,C.ink);
 const incoming=(t*.32)%1;
 for(let i=0;i<3;i++){
  const slotY=179+i*57,open=(Math.sin((t*.7+i*.45)*Math.PI)+1)/2;
  s+=rect(126,slotY,255,42,C.paper,2,C.line)+rect(132-open*7,slotY+5,243,36,C.white,2,C.ink)+text(155-open*7,slotY+29,labels[i],13,C.ink,700)+path(`M316 ${slotY+18}H344V${slotY+24}H316Z`,C.teal,1.5);
  const u=(incoming+i*.33)%1;
  let card=sheet(95,92,labels[i],i===2?C.blue:C.teal);
  s+=group(card,mix(25+i*191,baseX+47+i*50,ease(u)),mix(27,slotY-10,ease(u)),mix((i-1)*13,0,u),1-ease((u-.73)/.27),mix(.9,.55,u));
 }
 s+=stamp(w.kit,166,374,186);
 const p=(t*.4)%1;
 s+=path('M432 257C522 257 478 181 538 181',C.line,2)+draw('M432 257C522 257 478 181 538 181',p,C.teal,3);
 const pt=curve([[432,257],[522,257],[478,181],[538,181]],p);s+=miniDoc(pt[0]-13,pt[1]-17,-5,C.blue);
 s+=group(rect(0,0,120,61,C.white,4,C.ink)+text(60,28,w.next,11,C.ink,700,'middle')+line(18,42,102,42,C.teal,3),441,102);
 return s;
}
const scenes=[discover,execute,verify,reuse];

export function renderFrame(lang,time){
 if(!copy[lang]) throw new Error('Expected zh or en');
 const t=((time%DURATION)+DURATION)%DURATION,index=Math.min(3,Math.floor(t/4.5)),local=t-index*4.5,c=copy[lang];
 let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}"><rect width="1100" height="650" fill="white"/><g font-family="Microsoft YaHei,Arial,sans-serif">`;
 s+=text(42,52,'AIelsen / FDE',28,C.ink,700)+text(1058,50,lang==='zh'?'从问题到交付 · 连续动画':'FIELDWORK IN MOTION',13,C.teal,700,'end')+line(42,79,1058,79);
 s+=text(42,127,`0${index+1} / ${c.steps[index]}`,15,C.teal,700);
 const enter=ease(local/.4),exit=ease((local-4.1)/.4),op=1-exit;
 c.titles[index].forEach((a,i)=>s+=group(text(42,208+i*54,a,lang==='zh'?38:35,C.ink,700),0,18*(1-enter)-15*exit,0,Math.min(enter+.4,1)*op));
 c.sub[index].forEach((a,i)=>s+=text(42,339+i*29,a,lang==='zh'?17:14,C.muted));
 s+=rect(42,407,367,43,C.paper,2,'none')+text(58,434,[c.words.scope,c.words.goal+' → '+c.words.film,c.words.check,c.words.pack][index],lang==='zh'?16:12,C.teal,700);
 s+='<defs><clipPath id="stage"><rect x="453" y="96" width="605" height="416"/></clipPath></defs><g clip-path="url(#stage)">';
 s+=group(scenes[index](local,c.words),453,99+28*(1-enter)-28*exit,0,op);
 s+='</g>';
 s+=line(42,524,1058,524);
 c.steps.forEach((label,i)=>{
  const x=42+i*257,active=i===index;
  s+=rect(x,549,244,43,active?C.ink:C.paper,2,'none')+text(x+13,577,`0${i+1}`,13,active?'#5ec7c7':C.teal,700)+text(x+43,577,label,16,active?C.white:C.muted,600);
  if(active)s+=`<path d="M${x} 596H${x+244*local/4.5}" stroke="${C.teal}" stroke-width="3"/>`;
 });
 s+=text(42,629,c.foot,11,C.muted)+text(1058,629,c.note,10,C.muted,400,'end');
 return s+'</g></svg>';
}

// Evidence used by the QA script: points describing meaningful scene objects,
// not the footer progress bar or decorative motion.
export function motionProbe(time){
 const t=((time%DURATION)+DURATION)%DURATION,i=Math.floor(t/4.5),p=t-i*4.5;
 if(i===0)return [170+60*Math.sin(p*1.3),171+19*Math.cos(p*1.7),(p*.38)%1];
 if(i===1)return curve([[438,139],[385,139],[403,199],[339,205]],(p*.46+.38)%1);
 if(i===2)return [(p*37)%142,24+(p*.17%1)*500];
 return [Math.sin(p*.7*Math.PI),(p*.32)%1,(p*.4)%1];
}
