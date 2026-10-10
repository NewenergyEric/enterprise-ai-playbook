import {readFile} from 'node:fs/promises';
const routes=JSON.parse(await readFile('work/route-manifest.json','utf8'));
const issues=[];
for(const route of routes){
 const html=await readFile('dist'+route+'index.html','utf8');
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';
 const headings=[...main.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map(m=>({level:Number(m[1]),title:m[2].replace(/<[^>]*>/g,'')}));
 for(let i=1;i<headings.length;i++)if(headings[i].level>headings[i-1].level+1)issues.push({route,type:'heading jump',title:headings[i].title});
 for(const m of html.matchAll(/<input\b[^>]*>|<textarea\b[^>]*>|<select\b[^>]*>/g)){
  const input=m[0];if(/type="(?:hidden|checkbox)"/.test(input))continue;
  const id=input.match(/id="([^"]+)"/)?.[1];
  if(!/aria-label(?:ledby)?=/.test(input)&&!(id&&html.includes('for="'+id+'"')))issues.push({route,type:'missing control label',id});
 }
 for(const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g))if(!/aria-label(?:ledby)?=/.test(m[1])&&!m[2].replace(/<[^>]*>/g,'').trim())issues.push({route,type:'empty button'});
 if(!/<main\b/.test(html)||!/<header\b/.test(html)||!/<footer\b/.test(html))issues.push({route,type:'missing landmark'});
}
function luminance(hex){return hex.match(/\w\w/g).map(n=>parseInt(n,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
const contrast=[];for(const [fg,bg,label] of [['001f3f','ffffff','body'],['007d86','ffffff','teal links'],['536979','ffffff','secondary text'],['3246ff','ffffff','blue links'],['b8d6df','001f3f','dark case labels']]){const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);contrast.push({label,ratio:+ratio.toFixed(2)});if(ratio<4.5)issues.push({type:'token contrast',label,ratio});}
console.log(JSON.stringify({scope:'Static structural and primary palette checks; not a full WCAG or assistive-technology certification.',pages:routes.length,contrast,issues},null,2));
if(issues.length)process.exitCode=1;
