// Original editorial vector illustrations. Abstract teaching scenes, never client sites.
const navy='#001f3f',teal='#007d86',edge='#789ba8';
const line=(d,c=edge,w=2,dash='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${dash?` stroke-dasharray="${dash}"`:''}/>`;
const poly=(p,fill,stroke=edge)=>`<polygon points="${p}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
const circle=(x,y,r,fill,stroke=teal)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
function slab(x,y,w=150,d=82,h=26,c='#c7e8df'){
 return poly(`${x},${y} ${x+w},${y-50} ${x+w+d},${y-5} ${x+d},${y+45}`,c)+poly(`${x+d},${y+45} ${x+w+d},${y-5} ${x+w+d},${y-5+h} ${x+d},${y+45+h}`,'#9ebfc7')+poly(`${x},${y} ${x+d},${y+45} ${x+d},${y+45+h} ${x},${y+h}`,'#e2edee');
}
function person(x,y,c=teal){return circle(x,y-39,9,'#c7e8df',c)+line(`M${x} ${y-28}v34m0-22-18 12m18-12 15 9m-15 13-10 20m10-20 12 17`,c,4);}
function server(x,y){return slab(x,y,90,44,108,'#f5faf9')+line(`M${x+52} ${y+40}l76-24m-76 43 76-24m-76 43 76-24`,navy,4)+circle(x+67,y+57,3,teal)+circle(x+67,y+76,3,teal);}
const phases=[['现场与判断','Discovery and judgment'],['业务与 Agent 建模','Business and agent modeling'],['执行与生产工程','Execution and production'],['验收与产品化复用','Acceptance and reuse']];
export function phaseOf(week){return Math.min(3,Math.floor((Number(week)-1)/3));}
export function phaseArt(phase,l='zh'){
 let art=poly('36,296 425,76 766,257 379,465','#edf4f3','#c1d7d9');
 for(let i=0;i<7;i++)art+=line(`M${83+i*43} ${323+i*23}l363-207`,'#d7e4e5',1);
 for(let i=0;i<7;i++)art+=line(`M${82+i*48} ${271-i*27}l315 168`,'#d7e4e5',1);
 if(phase===0){
  art+=slab(116,261,208,133,19,'#f4f7f5');
  art+=poly('116,261 116,141 324,70 324,191','#dcebed')+poly('324,70 459,145 459,266 324,191','#bfd8de');
  art+=poly('126,156 317,91 317,107 126,173',navy,navy)+poly('339,111 439,167 439,202 339,146','#f8faf8');
  for(let i=0;i<3;i++)art+=poly(`${144+i*54},217 ${178+i*54},205 ${178+i*54},236 ${144+i*54},248`,'#82bdb7');
  art+=slab(197,268,111,49,62,'#fff')+line('M199 299l109-37',teal,3)+person(335,291,navy)+person(483,329,teal);
  art+=line('M461 217l85-48 107 60-70 40-41-22-44 27',teal,3,'6 7');
  art+=circle(563,211,54,'#ffffffdd',teal)+circle(563,211,40,'#e1f3ed',edge)+line('M596 254l55 55',navy,13)+line('M548 207h30m-15-15v30',teal,2);
  art+=poly('541,359 625,311 680,341 596,390','#fff')+line('M564 360l53-30m-36 42 53-30',edge,2);
 }else if(phase===1){
  [0,1,2].forEach(i=>art+=slab(106,310-i*44,100,67,22,i===2?'#c7e8df':'#e7f1f0'));
  art+=line('M271 268l90-52 109 60',teal,3,'6 7');
  [[350,188],[457,139],[500,243],[397,284]].forEach(([x,y],i)=>{art+=line(`M423 214L${x} ${y}`,teal,2)+circle(x,y,19,i===1?navy:'#e0f2ea',teal)});
  art+=circle(423,214,38,'#fff',teal)+circle(423,214,23,'#c4e6da',teal);
  art+=slab(469,367,124,81,24,'#b9dce1')+slab(480,327,108,75,22,'#e0f0ed')+slab(490,287,92,69,22,'#fff');
  art+=circle(569,198,51,'#f7fcf9',teal)+line('M518 198h102m-51-51c-35 29-35 74 0 102m0-102c35 29 35 74 0 102M531 168c24 16 53 16 77 0m-77 60c24-16 53-16 77 0',edge,1.5);
  art+=line('M326 354l62 35 80-47',navy,3)+circle(325,354,6,teal)+circle(466,343,6,teal);
  art+=poly('255,400 312,369 365,399 309,432','#fff')+line('M279 402l31-17m-16 26 31-17',edge,2);
 }else if(phase===2){
  art+=server(142,244)+server(293,159)+server(444,246);
  art+=line('M264 345l65 36 128-73m-94-53 40 22m-145 35 66-38',teal,3)+[ [266,345],[329,381],[457,308] ].map(([x,y])=>circle(x,y,6,'#fff')).join('');
  art+=poly('572,90 655,128 655,206 614,257 572,226','#d1ece4',teal)+line('M589 169l20 30 31-56',teal,7);
  art+=poly('543,348 647,288 715,326 610,385','#fff')+line('M571 346l79-43m-67 55 80-43m-64 53 77-43',edge,2)+circle(614,323,6,teal)+circle(624,340,6,navy)+circle(651,342,6,teal);
  art+=line('M239 156v-49l76-43 94 51',teal,2,'6 6')+circle(410,115,7,teal);
 }else{
  art+=poly('96,286 357,136 552,243 290,394','#fff')+line('M151 274l165-93m-146 120 165-93m-146 120 165-93m-146 120 165-93',edge,1);
  art+=line('M176 297l40-53 53 5 61-99',teal,5)+line('M193 333l50-39 68 13 60-43','#3246db',4,'7 7')+[[176,297],[216,244],[269,249],[330,150]].map(([x,y])=>circle(x,y,5,'#fff')).join('');
  [0,1,2].forEach(i=>art+=slab(480,308-i*41,109,72,22,i===2?'#c7e8df':'#f3f8f6'));
  art+=line('M451 208l-30-67 67-38m-67 38 79 17m-79-17-1-62',teal,3)+circle(488,103,15,'#e6f4ee')+circle(500,158,15,'#fff')+circle(420,79,15,navy);
  art+=poly('523,393 599,350 664,386 588,429','#d4ece5')+line('M548 391l18 14 40-38',teal,4)+person(702,331,navy);
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480" role="img" aria-label="${phases[phase][l==='zh'?0:1]}"><title>${phases[phase][l==='zh'?0:1]}</title><rect width="800" height="480" fill="#f3f7f6"/>${art}</svg>`;
}
export function phaseImage(phase,l='zh',className='phase-illustration'){return `<img class="${className}" src="/assets/illustrations/phase-${phase+1}.svg" width="800" height="480" alt="${phases[phase][l==='zh'?0:1]}" loading="lazy">`;}
export function lessonPanorama(week,l='zh'){let p=phaseOf(week);return `<div class="lesson-panorama"><div><span>FIELD JOURNAL / 0${p+1}</span><strong>${phases[p][l==='zh'?0:1]}</strong><p>${l==='zh'?'先用图解理解结构，再结合正文实现与验证。':'See the structure, then implement and verify with the notes.'}</p></div>${phaseImage(p,l)}</div>`;}
