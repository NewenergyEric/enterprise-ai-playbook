// Original AIelsen motion composition. Sharp rasterizes SVG and encodes GIF;
// no browser, client data, cloud call or website dependency is required.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const sharp=process.env.SHARP_MODULE ? require(process.env.SHARP_MODULE) : require('sharp');
const dir=path.dirname(fileURLToPath(import.meta.url));
const media=path.resolve(dir,'../media');
const art='data:image/png;base64,'+(await fs.readFile(path.join(media,'fde-comic-art.png'))).toString('base64');
const navy='#001f3f',teal='#007d86',blue='#3246ff',gray='#526578';
const W=1100,H=650;
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const copy={
 zh:{tag:'从业务现场，到可验收的交付',title:['AI，不止于回答。','FDE，把工作做完。'],sub:['服务找准切入点，案例展开工作过程。','学院训练交付，工具沉淀可复用方法。'],steps:['发现业务问题','接起工作流程','核验交付结果','留下团队能力'],titles:[['先找业务卡点，','再选 AI 能力。'],['让 Agent 接手','一段完整工作。'],['交出来的东西，','经得起核对。'],['项目交付之后，','团队还能继续做。']],descs:[['研究客户、追问需求，拆清关键判断。','不是先找一个模型，再找地方使用。'],['从研究、FAB 到文案与分镜；','从知识检索，到有依据的服务回复。'],['对照需求、过程和最终产物，','说明完成了什么，还有哪些边界。'],['把规则、模板与评估方法留下，','让经验能复用，而不只留在对话里。']],deliver:['问题定义 · 范围 · 验收标准','工具连接 · 工作流 · 可用产物','前后对照 · 测试 · 证据','Playbook · 培训 · 复用'],footer:'FDE 服务  /  Agent 案例  /  FDE Academy',note:'方法示意 · 非客户项目记录'},
 en:{tag:'FROM FIELD PROBLEMS TO VERIFIED DELIVERY',title:['AI can answer.','FDE delivers.'],sub:['Find the opportunity. See the work unfold.','Build the engineering practice to repeat it.'],steps:['Find the problem','Connect the work','Verify the output','Build team capability'],titles:[['Start with the work.','Then choose the AI.'],['Give the agent','a whole workflow.'],['Make the output','stand up to review.'],['Deliver the project.','Leave the capability.']],descs:[['Research the customer and define the decision.','Set the scope before choosing a model.'],['From research and FAB to copy and storyboards.','From scattered knowledge to grounded replies.'],['Compare the brief, the process and the output.','Show what is done and what remains uncertain.'],['Hand over rules, templates and evaluation.','Turn field experience into a repeatable method.']],deliver:['PROBLEM · SCOPE · ACCEPTANCE','TOOLS · WORKFLOW · DELIVERABLES','COMPARISON · TESTS · EVIDENCE','PLAYBOOK · TRAINING · REUSE'],footer:'FDE SERVICES  /  AGENT CASES  /  FDE ACADEMY',note:'Method illustration · not a client record'}
};
function text(x,y,value,size=20,color=navy,weight=400){return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(value)}</text>`;}
function frame(lang,scene,reveal=1){
 const c=copy[lang],intro=scene<0,title=intro?c.title:c.titles[scene],desc=intro?c.sub:c.descs[scene];
 const views=['8 8 752 496','777 8 752 496','8 520 752 496','777 520 752 496'];
 let s=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="1100" height="650" fill="white"/><g font-family="Microsoft YaHei,Arial,sans-serif">`;
 s+=text(42,51,'AIelsen / FDE',28,navy,700)+text(790,49,'FIELDNOTES  —  01',15,teal,700);
 s+='<path d="M42 77H1058" stroke="#d9e1e5"/>';
 s+=text(42,125,intro?c.tag:`0${scene+1} / ${c.steps[scene]}`,lang==='zh'?17:14,teal,700);
 const ty=intro?205:211;
 title.forEach((a,i)=>s+=text(42,ty+i*57,a,lang==='zh'?39:39,navy,700));
 desc.forEach((a,i)=>s+=text(42,350+i*31,a,lang==='zh'?19:15,gray));
 s+=`<rect x="42" y="432" width="408" height="43" fill="${intro?navy:'#f3f6f7'}"/>`;
 s+=text(58,459,intro?(lang==='zh'?'研究 → 判断 → 行动 → 交付':'RESEARCH → DECISIONS → ACTION → DELIVERY'):c.deliver[scene],lang==='zh'?17:12,intro?'white':teal,700);
 s+=`<svg x="486" y="107" width="572" height="383" viewBox="${intro?'0 0 1536 1024':views[scene]}" preserveAspectRatio="xMidYMid slice"><image width="1536" height="1024" xlink:href="${art}"/></svg>`;
 // Reveal by an editorial wipe; retain the original art without recolouring.
 if(reveal<1) s+=`<rect x="${486+572*reveal}" y="107" width="${572*(1-reveal)}" height="383" fill="white"/>`;
 s+='<path d="M42 521H1058" stroke="#d9e1e5"/>';
 c.steps.forEach((a,i)=>{const x=42+i*257,active=intro||i===scene;s+=`<rect x="${x}" y="545" width="244" height="48" rx="2" fill="${active?navy:'#f3f6f7'}"/>`+text(x+12,575,`0${i+1}`,14,active?'#5ec7c7':teal,700)+text(x+43,575,a,lang==='zh'?17:13,active?'white':gray,600);if(i<3)s+=text(x+247,575,'›',17,gray);});
 s+=text(42,629,c.footer,12,gray)+text(825,629,c.note,lang==='zh'?12:10,gray);
 return s+'</g></svg>';
}
const quick=process.argv.includes('--poster-only');
for(const lang of ['zh','en']){
 const svg=frame(lang,-1);
 await sharp(Buffer.from(svg)).png().toFile(path.join(media,`fde-showcase-${lang}.png`));
 if(process.env.SHOWCASE_REVIEW_DIR){
   await fs.mkdir(process.env.SHOWCASE_REVIEW_DIR,{recursive:true});
   for(let scene=0;scene<4;scene++) await sharp(Buffer.from(frame(lang,scene))).png().toFile(path.join(process.env.SHOWCASE_REVIEW_DIR,`${lang}-scene-${scene+1}.png`));
 }
 if(quick) continue;
 const frames=[],delays=[];
 for(const scene of [-1,0,1,2,3,-1]){
   if(scene>=0){for(const reveal of [.12,.4,.72,1]) {frames.push(await sharp(Buffer.from(frame(lang,scene,reveal))).png().toBuffer());delays.push(100);}}
   frames.push(await sharp(Buffer.from(frame(lang,scene))).png().toBuffer());delays.push(scene<0?2400:3200);
 }
 await sharp(frames,{join:{animated:true}}).gif({loop:0,delay:delays,colours:192,effort:7,dither:0.35}).toFile(path.join(media,`fde-showcase-${lang}.gif`));
 const meta=await sharp(path.join(media,`fde-showcase-${lang}.gif`),{animated:true}).metadata();
 console.log(JSON.stringify({language:lang,width:meta.width,height:meta.pageHeight,frames:meta.pages,durationMs:meta.delay?.reduce((a,b)=>a+b,0),bytes:(await fs.stat(path.join(media,`fde-showcase-${lang}.gif`))).size}));
}
