import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const failures=[];
for (const file of files) {
  if (/(^|\/)(?:node_modules|dist|\.env(?:\..*)?|id_rsa|id_ed25519)(\/|$)/i.test(file)) failures.push(file+': unexpected publication path');
  if (!/\.(?:md|mjs|js|ts|tsx|json|html|css|svg|txt|py|ya?ml)$/i.test(file)) continue;
  const body = await readFile(file, 'utf8');
  const rules = {
    'local workspace path': /(?:file:\/\/\/|[A-Z]:[\\/](?:Users|Business|AI(?: Project)?)[\\/])/i,
    'private conversation link': /codex:\/\/threads\/[a-f0-9-]{20,}/i,
    'credential-shaped string': /\b(?:ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{30,})\b|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  };
  for (const [reason,pattern] of Object.entries(rules)) if(pattern.test(body)) failures.push(file+': '+reason);
}
const lock=JSON.parse(await readFile('package-lock.json','utf8'));
for(const [name,pkg] of Object.entries(lock.packages)) {
  if(!name)continue;
  if(pkg.resolved&&!pkg.resolved.startsWith('https://registry.npmjs.org/'))failures.push(name+': unexpected dependency registry');
  if(pkg.resolved&&!/^sha(?:256|384|512)-/.test(pkg.integrity??''))failures.push(name+': missing strong dependency integrity');
  if(pkg.hasInstallScript&&!['node_modules/fsevents'].includes(name))failures.push(name+': unreviewed install script');
}
for(const file of ['LICENSE','LICENSING.md','SECURITY.md','COMMERCIAL.md','THIRD_PARTY_NOTICES.md'])await readFile(file,'utf8');
assert.equal(failures.length,0,failures.join('\n'));
console.log(`Publication source checks passed for ${files.length} tracked files. Binary/history scans remain separate release checks.`);
