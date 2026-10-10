// Read-only loopback server for the showcase preview. Explicit file allowlist.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||4197);
const files=new Map([['/',['preview.html','text/html; charset=utf-8']],['/preview.html',['preview.html','text/html; charset=utf-8']]]);
for(const lang of ['zh','en'])for(const ext of ['gif','png'])files.set(`/media/fde-motion-${lang}.${ext}`,[`../media/fde-motion-${lang}.${ext}`,`image/${ext}`]);
http.createServer(async(req,res)=>{
 const pathname=new URL(req.url,'http://127.0.0.1').pathname,entry=files.get(pathname);
 if(!entry||!['GET','HEAD'].includes(req.method)){res.writeHead(404);res.end('Not found');return;}
 try{const bytes=await fs.readFile(path.resolve(base,entry[0]));res.writeHead(200,{'content-type':entry[1],'content-length':bytes.length,'cache-control':'no-store','x-content-type-options':'nosniff'});res.end(req.method==='HEAD'?undefined:bytes);}catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Motion preview http://127.0.0.1:${port}/`));
