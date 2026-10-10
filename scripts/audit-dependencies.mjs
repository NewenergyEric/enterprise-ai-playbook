import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { evaluateAudit } from './audit-policy.mjs';

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run this check with npm run security:audit.');
const result = spawnSync(process.execPath, [npmCli, 'audit', '--json'], {
  encoding: 'utf8', maxBuffer: 10_000_000,
});
if (result.error || ![0, 1].includes(result.status)) throw new Error('npm audit failed to run.');
const report = JSON.parse(result.stdout);
const policy = JSON.parse(await readFile('docs/security/dependency-exceptions.json', 'utf8'));
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
console.log('npm audit:', report.metadata?.vulnerabilities);
const outcome = evaluateAudit(report, policy, lock);
if (outcome.accepted)
  console.warn(`KNOWN, NOT FIXED: ${policy.advisory}; ${outcome.count} affected dependency entries; scoped build-only exception expires ${policy.expiresOn}.`);
else console.log('No known dependency advisories returned by npm audit.');
