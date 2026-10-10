// Build-time configuration becomes public HTML/RSC. Never serialize raw secrets.
export function publicHttpsUrl(value: string, allowLocal = false): string {
  try {
    const url = new URL(value.trim());
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (url.username || url.password || url.search || url.hash) return '';
    if (local && !allowLocal) return '';
    if (url.protocol !== 'https:' && !(allowLocal && local && url.protocol === 'http:')) return '';
    return url.toString();
  } catch { return ''; }
}

export function leadConfiguration(endpoint: string, privacy: string, allowLocal = false) {
  const privacyUrl = publicHttpsUrl(privacy, allowLocal);
  return { privacyUrl, leadEndpoint: privacyUrl ? publicHttpsUrl(endpoint, allowLocal) : '' };
}
