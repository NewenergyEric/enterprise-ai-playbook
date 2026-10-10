import http from 'node:http';
import {readFile,stat,realpath} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=await realpath(fileURLToPath(new URL('../site/',import.meta.url)));
const port=Number(process.env.FIELDNOTES_PREVIEW_PORT||4194);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.md':'text/markdown; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(p.includes('\\')||p.includes('\0'))throw Error('invalid path');
  let file=path.resolve(root,'.'+p);
  if(file!==root&&!file.startsWith(root+path.sep))throw Error('outside');
  if((await stat(file)).isDirectory()){
    if(!p.endsWith('/')){res.writeHead(301,{Location:p+'/'});res.end();return;}
    file=path.join(file,'index.html');
  }
  file=await realpath(file);
  if(!file.startsWith(root+path.sep))throw Error('outside');
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Content-Length':data.length,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});
  res.end(req.method==='HEAD'?undefined:data);
}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`AIelsen Agent Field Notes: http://127.0.0.1:${port}/ (site only)`));
