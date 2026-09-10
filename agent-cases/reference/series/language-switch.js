/* Language follows the URL. Preserve the same case and hash without a redirect guess. */
(()=>{
 const links=[...document.querySelectorAll('[data-language-link]')];
 for(const link of links)link.dataset.languageBase=link.getAttribute('href');
 function update(){for(const link of links){const destination=new URL(link.dataset.languageBase,location.href);destination.hash=location.hash;link.href=destination.href;}}
 update();window.addEventListener('hashchange',update);
 links.forEach(link=>link.addEventListener('click',update));
 const header=document.querySelector('.series-header,.topbar');
 const measureHeader=()=>{if(header)document.documentElement.style.setProperty('--case-nav-height',header.getBoundingClientRect().height+'px');};
 measureHeader();
 if(header&&'ResizeObserver' in window)new ResizeObserver(measureHeader).observe(header);
 // Direct deep links should land at the section, not animate through a long case.
 function settle(){
  let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  const target=document.getElementById(id);if(!target)return;
  let parent=target;while(parent){if(parent.matches('details'))parent.open=true;parent=parent.parentElement;}
  measureHeader();target.scrollIntoView({block:'start',behavior:'instant'});
 }
 window.addEventListener('load',settle,{once:true});
})();
