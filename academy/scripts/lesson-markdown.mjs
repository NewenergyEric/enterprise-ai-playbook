// Small escaped Markdown renderer for the controlled, local teaching manuscripts.
// Raw HTML is not accepted. Content changes only through reviewed source files.
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function inline(s){
 const tokens=[];
 s=s.replace(/`([^`]+)`/g,(_,v)=>{tokens.push(`<code>${escape(v)}</code>`);return `\u0000${tokens.length-1}\u0000`;});
 s=escape(s).replace(/\[([^\]]+)\]\(([^\s)]+)\)/g,(_,label,url)=>{
  if(!/^(https:\/\/|\/(?!\/))/.test(url))throw Error('Unsupported manuscript link: '+url);
  return `<a href="${url}"${url.startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}>${label}${url.startsWith('https:')?' ↗':''}</a>`;
 }).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
 return s.replace(/\u0000(\d+)\u0000/g,(_,n)=>tokens[Number(n)]);
}
export function renderNotes(source){
 const lines=source.replaceAll('\r','').split('\n'),toc=[];let out='',i=0,section=0,open=false;
 while(i<lines.length){const line=lines[i];
  if(!line.trim()){i++;continue;}
  if(line.startsWith('## ')){
   if(open)out+='</section>';
   const title=line.slice(3),id='topic-'+(++section);toc.push({id,title});
   out+=`<section class="lecture-section" id="${id}"><h2>${inline(title)}</h2>`;open=true;i++;continue;
  }
  if(line.startsWith('### ')){out+=`<h3>${inline(line.slice(4))}</h3>`;i++;continue;}
  if(line.startsWith('```')){const lang=line.slice(3)||'text';let code=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i++]);if(i>=lines.length)throw Error('Unclosed code fence');i++;out+=`<figure class="lecture-code"><figcaption>${escape(lang.toUpperCase())} <span>教学示例 / TEACHING EXAMPLE</span></figcaption><pre tabindex="0" aria-label="${escape(lang)} 代码示例"><code>${escape(code.join('\n'))}</code></pre></figure>`;continue;}
  if(line.startsWith('|')){
   const rows=[];while(i<lines.length&&lines[i].startsWith('|'))rows.push(lines[i++].trim().slice(1,-1).split('|').map(s=>s.trim()));
   if(rows.length<2||!rows[1].every(c=>/^:?-+:?$/.test(c)))throw Error('Invalid teaching table');
   out+=`<div class="table-wrap lecture-table" tabindex="0" role="region" aria-label="${escape(toc.at(-1)?.title||'教学表格')}"><table><thead><tr>${rows[0].map(c=>`<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(r=>`<tr>${r.map(c=>`<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;continue;
  }
  if(line.startsWith('- ')){let items=[];while(i<lines.length&&lines[i].startsWith('- '))items.push(lines[i++].slice(2));out+=`<ul>${items.map(x=>`<li>${inline(x)}</li>`).join('')}</ul>`;continue;}
  const para=[line];i++;while(i<lines.length&&lines[i].trim()&&!/^(#{2,3} |```|\||- )/.test(lines[i]))para.push(lines[i++]);
  out+=`<p>${inline(para.join(' '))}</p>`;
 }
 if(open)out+='</section>';
 return {html:out,toc};
}
