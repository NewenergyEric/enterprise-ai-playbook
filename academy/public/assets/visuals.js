// Local-only board viewer. No network beyond this site's generated SVG assets.
const dialog=document.querySelector('#board-viewer');
if(dialog){
 const zh=document.documentElement.lang.startsWith('zh'),canvas=dialog.querySelector('.board-viewer-canvas'),size=dialog.querySelector('[data-board-size]');
 let opener=null,previousOverflow='';
 function setSize(actual){canvas.classList.toggle('actual-size',actual);size.setAttribute('aria-pressed',String(actual));size.textContent=actual?(zh?'适应窗口':'Fit to window'):(zh?'原尺寸':'Actual size');}
 function openBoard(button){
  const id=button.dataset.boardOpen||button.dataset.atlasOpen;
  if(!/^[a-z]+$/.test(id))return;
  const figure=button.closest('[data-teaching-board]');
  const title=figure?figure.querySelector('figcaption strong').textContent:button.dataset.boardTitle;
  const caption=figure?figure.querySelector('figcaption p').textContent:button.dataset.boardCaption;
  const src=new URL(`boards/${zh?'zh':'en'}/${id}.svg`,import.meta.url).href;
  const img=document.createElement('img');img.src=src;img.alt=caption;img.width=960;img.height=540;
  canvas.replaceChildren(img);dialog.querySelector('#board-viewer-title').textContent=title;
  dialog.querySelector('.board-viewer-caption').textContent=caption;
  const download=dialog.querySelector('[data-board-download]');download.href=src;download.download=`AIelsen-FDE-${id}-${zh?'zh':'en'}.svg`;
  opener=button;previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  setSize(window.matchMedia('(max-width:620px)').matches);dialog.showModal();canvas.scrollTo(0,0);dialog.querySelector('[data-board-close]').focus();
 }
 document.querySelectorAll('[data-board-open],[data-atlas-open]').forEach(button=>button.addEventListener('click',()=>openBoard(button)));
 size.addEventListener('click',()=>setSize(!canvas.classList.contains('actual-size')));
 dialog.querySelector('[data-board-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;opener?.focus({preventScroll:true});});
}
