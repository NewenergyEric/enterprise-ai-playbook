import {workshops} from '../content/workshops.mjs';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function workshop(w,l){
 const item=workshops[w.id];if(!item)return '';
 const t=(zh,en)=>l==='zh'?zh:en;
 return `<section class="workshop" id="workshop"><div class="eyebrow">FIELD WORKSHOP / W${w.id}</div><h2>${esc(item.title[l])}</h2><p>${esc(item.intro[l])}</p><ol class="workshop-agenda">${item.agenda.map((s,i)=>`<li><span aria-hidden="true">0${i+1}</span><p>${esc(s[l])}</p></li>`).join('')}</ol><div class="workshop-sample"><h3>${t('产物片段 · 合成示例','Artifact excerpt · synthetic example')}</h3><pre class="code"><code>${esc(item.artifact[l])}</code></pre></div><div class="workshop-review"><h3>${t('讲师核验重点','Instructor review')}</h3><p>${esc(item.review[l])}</p></div><details class="workshop-challenge"><summary>${t('加一道现场追问','An unseen field challenge')} ↗</summary><p>${esc(item.challenge[l])}</p></details><a class="text-link" href="/downloads/fde-practice-kit.zip" download>${t('下载离线实作包','Download offline practice kit')} ↓</a></section>`;
}
