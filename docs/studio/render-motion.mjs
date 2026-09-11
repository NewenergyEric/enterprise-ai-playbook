import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {WIDTH,HEIGHT,FPS,DURATION,renderFrame,motionProbe} from './motion-scene.mjs';
const require=createRequire(import.meta.url);
const sharp=process.env.SHARP_MODULE?require(process.env.SHARP_MODULE):require('sharp');
const media=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../media');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const selected=process.argv.includes('--zh')?['zh']:process.argv.includes('--en')?['en']:['zh','en'];
const posterOnly=process.argv.includes('--poster-only');
for(const lang of selected){
 await sharp(Buffer.from(renderFrame(lang,11.4))).png().toFile(path.join(media,`fde-motion-${lang}.png`));
 if(process.env.SHOWCASE_REVIEW_DIR){
  await fs.mkdir(process.env.SHOWCASE_REVIEW_DIR,{recursive:true});
  for(const t of [0,.8,2.4,3.8,5.4,7.7,9.8,11.4,14.1,16.3,17.6]) await sharp(Buffer.from(renderFrame(lang,t))).png().toFile(path.join(process.env.SHOWCASE_REVIEW_DIR,`${lang}-${t}.png`));
 }
 if(posterOnly)continue;
 const frames=[],frameHashes=[],probeHashes=[];
 for(let i=0;i<FPS*DURATION;i++){
  const t=(i/FPS+.6)%DURATION,buffer=await sharp(Buffer.from(renderFrame(lang,t))).png().toBuffer();
  frames.push(buffer);frameHashes.push(hash(buffer));probeHashes.push(JSON.stringify(motionProbe(t)));
  if(i%90===0)console.log(`${lang}: rendered ${i}/${FPS*DURATION} frames`);
 }
 assert.equal(new Set(frameHashes).size,frames.length,'Repeated visual frame');
 assert.equal(new Set(probeHashes).size,frames.length,'No meaningful object movement');
 const out=path.join(media,`fde-motion-${lang}.gif`);
 await sharp(frames,{join:{animated:true}}).gif({loop:0,delay:Array(frames.length).fill(1000/FPS),colours:128,dither:0,effort:4}).toFile(out);
 const m=await sharp(out,{animated:true}).metadata();
 const record={language:lang,width:m.width,height:m.pageHeight,sourceFrames:frames.length,encodedFrames:m.pages,uniqueSourceFrames:new Set(frameHashes).size,uniqueObjectStates:new Set(probeHashes).size,durationMs:m.delay.reduce((a,b)=>a+b,0),maxFrameDelayMs:Math.max(...m.delay),loop:m.loop,bytes:(await fs.stat(out)).size};
 assert(record.encodedFrames>=FPS*DURATION*.9);assert.equal(record.durationMs,DURATION*1000);assert(record.maxFrameDelayMs<=100);assert(record.bytes<5e6);
 await fs.writeFile(path.join(media,`fde-motion-${lang}.json`),JSON.stringify(record,null,2)+'\n');
 console.log(JSON.stringify(record));
}
