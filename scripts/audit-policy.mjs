export function evaluateAudit(report, policy, lock, now = new Date()) {
  if (!report || report.error || report.auditReportVersion !== 2 || !report.metadata?.vulnerabilities || !report.vulnerabilities)
    throw new Error('Missing or invalid npm audit response; refusing to pass.');
  const entries = Object.entries(report.vulnerabilities);
  if (!entries.length) return { count: 0, accepted: false };
  if (now.getTime() > Date.parse(policy.expiresOn + 'T23:59:59Z'))
    throw new Error('Dependency exception expired; review required.');
  const root = lock.packages['node_modules/' + policy.package];
  if (root?.version !== policy.version) throw new Error('Exception package version changed.');
  const advisory = 'https://github.com/advisories/' + policy.advisory;
  let rootFound = false;
  for (const [name, v] of entries) {
    if (!policy.affectedChain.includes(name) || v.severity !== 'high' || !Array.isArray(v.via) || !v.via.length)
      throw new Error(`Unreviewed dependency advisory: ${name}`);
    for (const via of v.via) {
      if (typeof via === 'string') {
        if (!policy.affectedChain.includes(via) || !report.vulnerabilities[via])
          throw new Error(`Unreviewed dependency path: ${name}`);
      } else {
        if (name !== policy.package || via.url !== advisory || via.name !== policy.package || via.severity !== 'high')
          throw new Error(`Unreviewed root advisory: ${name}`);
        rootFound = true;
      }
    }
  }
  if (!rootFound) throw new Error('Expected root advisory is absent; review required.');
  return { count: entries.length, accepted: true };
}
