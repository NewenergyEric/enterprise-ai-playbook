/* All editorial content is static HTML. These controls only illustrate methods. */
const artifactButtons=[...document.querySelectorAll('[data-artifact]')];
if(artifactButtons.length){
 const dialog=document.createElement('dialog');dialog.className='artifact-dialog';dialog.setAttribute('aria-label','案例图片放大查看');
 dialog.innerHTML='<div class="artifact-dialog-inner"><div class="artifact-dialog-tools"><p data-artifact-count aria-live="polite"></p><div class="artifact-dialog-buttons"><button type="button" data-artifact-prev aria-label="上一张图片">←</button><button type="button" data-artifact-next aria-label="下一张图片">→</button><button type="button" data-artifact-zoom aria-pressed="false">查看细节 +</button><button type="button" data-artifact-close>关闭 ×</button></div></div><div class="artifact-viewport" tabindex="0" role="region" aria-label="图片阅读区，可滚动查看细节"><img alt=""></div><p class="artifact-dialog-caption"></p></div>';
 document.body.append(dialog);let current=0,opener=null,previousOverflow='';
 const imageViewport=dialog.querySelector('.artifact-viewport'),zoomButton=dialog.querySelector('[data-artifact-zoom]');
 function setZoom(zoomed){dialog.classList.toggle('is-zoomed',zoomed);zoomButton.setAttribute('aria-pressed',String(zoomed));zoomButton.textContent=zoomed?'适应窗口 −':'查看细节 +';imageViewport.scrollTop=0;imageViewport.scrollLeft=0;}
 function show(index){setZoom(false);current=(index+artifactButtons.length)%artifactButtons.length;const b=artifactButtons[current],img=dialog.querySelector('img');img.src=b.dataset.artifact;img.alt=b.querySelector('img').alt;dialog.querySelector('[data-artifact-count]').textContent=`图解 ${current+1} / ${artifactButtons.length}`;dialog.querySelector('.artifact-dialog-caption').textContent=b.dataset.caption;}
 artifactButtons.forEach((b,i)=>b.addEventListener('click',()=>{opener=b;previousOverflow=document.body.style.overflow;show(i);dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('[data-artifact-close]').focus();}));
 dialog.querySelector('[data-artifact-close]').addEventListener('click',()=>dialog.close());
 zoomButton.addEventListener('click',()=>setZoom(!dialog.classList.contains('is-zoomed')));
 dialog.querySelector('[data-artifact-prev]').addEventListener('click',()=>show(current-1));dialog.querySelector('[data-artifact-next]').addEventListener('click',()=>show(current+1));
 dialog.addEventListener('keydown',e=>{if(dialog.classList.contains('is-zoomed')&&imageViewport.contains(e.target))return;if(e.key==='ArrowLeft'){e.preventDefault();show(current-1);}if(e.key==='ArrowRight'){e.preventDefault();show(current+1);}});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;opener?.focus();});
}
const filterButtons=[...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;
  document.querySelectorAll('.catalog-grid .case-tile').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
  document.getElementById('case-count').textContent=document.documentElement.lang==='en'
    ? `${count} ${count===1?'case':'cases'} · ${button.textContent} · Each case identifies its delivery stage`
    : `${count} 个案例 · ${button.textContent} · 各案均标注真实交付阶段`;
}));
const demos={
 growth:{content:['内容表达','同一事实，转成不同受众的表达。','先确定目标人群在意什么，再组织卖点顺序；换表达，不悄悄换产品事实。'],creator:['创作者合作','找到内容与产品价值真正相关的人。','从底稿提取与创作者受众相关的利益，结合合作方式与状态安排下一步，而不是复制同一封介绍。'],channel:['渠道计划','用同一口径，安排不同渠道的任务。','在已确认的主推组合、预算与商业约束内分配内容和节奏；新方案不悄悄推翻旧决策。'],deck:['商务叙事','换一种受众，重新组织证据。','为商务沟通整理问题、方案、应用与验证材料；同样的事实形成另一种叙事，不把材料交付说成融资成功。']},
 knowledge:{known:['','按已经确认的内容回答','把明确的事实组织成客服可用的回复，并保留可核对的来源位置。'],conditional:['','说明适用条件，不一律退回','资料支持部分解释时，说明前提与适用范围；不要把有限信息扩成保证。'],missing:['','缺的事实，不能用一句承诺补上','精确参数、服务或政策缺少依据时，指出需要确认的内容，交由对应负责人核实。']},
 audit:{defined:['','找到定义，不能证明功能正在生效。','继续查找读取与执行路径；本图说明查证方法，不展示客户原始代码。'],connected:['','调用路径能说明它怎样参与判断。','接入流程只是查证的一部分，仍需核对条件与输出；业务是否采用该规则须单独确认。']},
 evidence:{complete:['','线索齐备，也需要人工复核。','不同来源用于相互核对；报告同时说明观察到什么，以及仍不能推出什么。'],gap:['','来源缺失，不等于没有风险。','缺口进入待补查项。不要把空值当成正常，也不要在资料不足时给出确定判断。']},
 timeline:{collected:['','本次采到的记录','还不能直接称为“本期新增”；需要检查发生时间，并与历史集合对照。'],event:['','本期真正新增','样例中只有 B 同时满足本期发生和历史中不存在；A 是旧事件，C 是重复记录。']}
};
document.querySelectorAll('[data-board]').forEach(board=>{
 const type=board.dataset.board;
 board.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
  board.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  const key=button.dataset.view,[label,title,text]=demos[type][key];
  for(const [selector,value] of [['[data-result-label]',label],['[data-result-title]',title],['[data-result-text]',text]]){const e=board.querySelector(selector);if(e)e.textContent=value;}
  if(type==='audit')board.querySelectorAll('[data-trace]').forEach(e=>e.classList.toggle('is-on',key==='connected'));
  if(type==='evidence'){const e=board.querySelector('[data-gap-source]');e.classList.toggle('is-missing',key==='gap');e.querySelector('small').textContent=key==='gap'?'尚缺资料':'资料来源';}
  if(type==='timeline'){board.querySelector('[data-result-count]').textContent=key==='event'?'1':'3';board.querySelectorAll('[data-event]').forEach(e=>{e.classList.toggle('is-excluded',key==='event'&&e.dataset.event!=='new');e.classList.toggle('is-current',key==='event'&&e.dataset.event==='new');});}
 }));
 if(type==='learning'){
  let card=0;const words=['Apple / 苹果','Car / 汽车'],clues=['线索：一种长在树上的水果。','线索：一种在道路上行驶的交通工具。'];
  const clue=board.querySelector('[data-learning-clue]'),word=board.querySelector('[data-learning-word]'),log=board.querySelector('[data-learning-log]');
  board.querySelectorAll('[data-learning]').forEach(button=>button.addEventListener('click',()=>{
   if(button.dataset.learning==='clue'){clue.hidden=!clue.hidden;clue.textContent=clues[card];button.setAttribute('aria-expanded',String(!clue.hidden));log.textContent='查看线索只是探索或求助，不等于已经掌握。';}
   if(button.dataset.learning==='confirm'){word.textContent=words[card];log.textContent='确认动作显示名称。真实产品中由主动点击触发音频；本示意不播放音频。';}
   if(button.dataset.learning==='next'){card=1-card;word.textContent='先尝试，再揭晓。';clue.hidden=true;board.querySelector('[data-learning="clue"]').setAttribute('aria-expanded','false');const template=board.querySelector(card?'[data-vehicle]':'[data-apple]');board.querySelector('[data-learning-art]').replaceChildren(template.content.cloneNode(true));log.textContent='切换只改变卡片，不自动揭晓、不自动播放，也不记录个人数据。';}
  }));
 }
});
function reveal(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const el=document.getElementById(id);if(!el)return;let parent=el;while(parent){if(parent.matches('details'))parent.open=true;parent=parent.parentElement;}requestAnimationFrame(()=>el.scrollIntoView({block:'start',behavior:'instant'}));}
window.addEventListener('hashchange',reveal);
document.querySelectorAll('.series-route a').forEach(a=>a.addEventListener('click',()=>{const el=document.getElementById(a.hash.slice(1));if(el)el.open=true;}));reveal();
const printState=new Map();window.addEventListener('beforeprint',()=>document.querySelectorAll('.stage,.engineering-details,.pitch-english').forEach(d=>{printState.set(d,d.open);d.open=true;}));window.addEventListener('afterprint',()=>{printState.forEach((open,d)=>d.open=open);printState.clear();});
