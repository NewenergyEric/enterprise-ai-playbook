/* Progressive enhancement only: core article and download work without JS. */
document.querySelectorAll('[data-tabs]').forEach(group=>{
  const buttons=[...group.querySelectorAll('[role="tab"]')];
  const panels=[...group.querySelectorAll('[role="tabpanel"]')];
  const activate=(button,focus=false)=>{
    buttons.forEach(b=>{const on=b===button;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;});
    panels.forEach(p=>p.hidden=p.id!==button.getAttribute('aria-controls'));
    if(focus)button.focus();
  };
  buttons.forEach((button,i)=>{
    button.addEventListener('click',()=>activate(button));
    button.addEventListener('keydown',e=>{
      let next;
      if(e.key==='ArrowRight')next=(i+1)%buttons.length;
      if(e.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;
      if(e.key==='Home')next=0;
      if(e.key==='End')next=buttons.length-1;
      if(next!==undefined){e.preventDefault();activate(buttons[next],true);}
    });
  });
  activate(buttons[0]);
});

const dialog=document.getElementById('lightbox');
const preview=document.getElementById('lightbox-image');
const caption=document.getElementById('lightbox-caption');
let previousFocus;
document.querySelectorAll('[data-zoom]').forEach(link=>link.addEventListener('click',event=>{
  if(typeof dialog.showModal!=='function')return;
  event.preventDefault();
  previousFocus=link;
  preview.src=link.getAttribute('href');
  preview.alt=link.querySelector('img')?.alt||(document.documentElement.lang==='en'?'A detail from the case':'案例画面局部');
  caption.textContent=link.dataset.caption||preview.alt;
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
document.getElementById('close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus({preventScroll:true});});

const revealHash=()=>{
  const id=decodeURIComponent(location.hash.slice(1));
  if(!id)return;
  const target=document.getElementById(id);
  if(target?.matches('details'))target.open=true;
};
window.addEventListener('hashchange',revealHash);
document.querySelectorAll('.route-map a').forEach(link=>link.addEventListener('click',()=>{
  const target=document.getElementById(link.hash.slice(1));
  if(target)target.open=true;
}));
revealHash();
if('IntersectionObserver' in window){
  const links=[...document.querySelectorAll('.topbar nav a[href^="#"]')];
  const visibleSections=new Map();
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>visibleSections.set(entry.target.id,entry.isIntersecting));
    const activeId=[...visibleSections].find(([,visible])=>visible)?.[0];
    links.forEach(link=>{
      const active=link.hash==='#'+activeId;
      link.classList.toggle('active',active);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
  },{rootMargin:'-16% 0px -68% 0px',threshold:0});
  links.forEach(link=>{const el=document.getElementById(link.hash.slice(1));if(el)observer.observe(el);});
}
const printState=new Map();
window.addEventListener('beforeprint',()=>document.querySelectorAll('.stage').forEach(el=>{printState.set(el,el.open);el.open=true;}));
window.addEventListener('afterprint',()=>printState.forEach((open,el)=>el.open=open));
