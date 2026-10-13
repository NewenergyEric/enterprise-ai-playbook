'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/site';

type Turnstile = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }
let scriptLoad: Promise<void> | undefined;
function loadVerification() {
  if (window.turnstile) return Promise.resolve();
  if (!scriptLoad) scriptLoad = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    const timeout = window.setTimeout(() => { script.remove(); scriptLoad = undefined; reject(new Error('verification unavailable')); }, 12000);
    script.onload = () => { window.clearTimeout(timeout); resolve(); };
    script.onerror = () => { window.clearTimeout(timeout); script.remove(); scriptLoad = undefined; reject(new Error('verification unavailable')); };
    document.head.append(script);
  });
  return scriptLoad;
}

export function ToolkitVerification({ endpoint, lang, active, resetKey, onToken }: { endpoint: string; lang: Lang; active: boolean; resetKey: number; onToken: (value: string) => void }) {
  const element = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cancelled = false, widget: string | undefined;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    async function prepare() {
      try {
        const response = await fetch(endpoint + '-config', { credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer', signal: controller.signal });
        const config = await response.json();
        if (cancelled) return;
        if (!response.ok || config.available !== true) throw new Error('unavailable');
        setError(false);
        if (!config.siteKey) return;
        await loadVerification();
        if (cancelled || !element.current || !window.turnstile) return;
        widget = window.turnstile.render(element.current, {
          sitekey: config.siteKey, action: 'fde_toolkit_contact', theme: 'light', size: 'flexible', language: lang === 'zh' ? 'zh-CN' : 'en',
          callback: (token: string) => { if (!cancelled) onToken(token); },
          'expired-callback': () => { if (!cancelled) onToken(''); },
          'error-callback': () => { if (!cancelled) { onToken(''); setError(true); } },
        });
      } catch { if (!cancelled) setError(true); }
      finally { window.clearTimeout(timeout); }
    }
    void prepare();
    return () => { cancelled = true; controller.abort(); window.clearTimeout(timeout); if (widget && window.turnstile) window.turnstile.remove(widget); };
  }, [active, endpoint, lang, resetKey, retry, onToken]);
  return <div className="tk-verification"><div ref={element} className="tk-verification-widget" />{active && error ? <output>{lang === 'zh' ? '暂时连接不上。' : 'Unable to connect right now.'} <button type="button" onClick={() => setRetry(value => value + 1)}>{lang === 'zh' ? '重新连接' : 'Try again'}</button></output> : null}</div>;
}
