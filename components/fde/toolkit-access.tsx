'use client';

import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Mail, MoveUpRight } from 'lucide-react';
import { Shell } from './shell';
import { ToolkitVerification } from './toolkit-verification';
import { localPath, type Lang } from '@/lib/site';
import './toolkit-access.css';

type FormState = 'idle' | 'submitting' | 'success' | 'error';
const examples = [
  { label: ['市场研究', 'Market research'], detail: ['把资料变成有依据的研究简报', 'Turn sources into a grounded research brief'], note: ['我想用 Agent 整理市场资料，做出有来源的研究简报。', 'I want my agent to turn market sources into a research brief with references.'] },
  { label: ['内容与营销', 'Content & marketing'], detail: ['从产品信息，走到一份可执行的内容计划', 'Go from product information to a content plan'], note: ['我想把产品信息整理成内容计划，再和团队一起打磨。', 'I want to turn product information into a content plan my team can refine.'] },
  { label: ['创作者合作', 'Creator partnerships'], detail: ['理清合作要求、候选人和下一步', 'Organize the brief, candidates and next steps'], note: ['我想梳理创作者合作的要求、候选人和跟进事项。', 'I want to organize a creator brief, candidates and follow-up work.'] },
  { label: ['工程与交接', 'Engineering & handoff'], detail: ['让工作规则、交付清单和接续记录跟上', 'Keep working rules and handoff notes together'], note: ['我想给 Agent 配上工作规则，并把交付和交接记录整理好。', 'I want to equip my agent with working rules and clear delivery and handoff notes.'] },
];

export function ToolkitAccessPage({ lang, leadEndpoint, privacyUrl }: { lang: Lang; leadEndpoint: string; privacyUrl: string }) {
  const zh = lang === 'zh';
  const textIndex = zh ? 0 : 1;
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const openedAt = useRef(0);
  useEffect(() => { openedAt.current = Date.now(); }, []);
  const pending = useRef(false);
  const submission = useRef<{ id: string; payload: string } | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const noteField = useRef<HTMLTextAreaElement>(null);
  const busy = state === 'submitting';
  const enabled = Boolean(leadEndpoint && privacyUrl);

  function edit() { setState('idle'); setError(''); }
  function chooseExample(value: string) {
    if (busy || state === 'success') return;
    setNote(value); edit(); noteField.current?.focus();
  }

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || !enabled || state === 'success') return;
    if (!email.trim() || !consent) return;
    pending.current = true; setState('submitting'); setError('');
    const data = { method: 'email', contact: email.trim(), message: note.trim(), locale: lang, consent: true, website: honeypot.current?.value || '', source: 'fde-toolkit', policyVersion: 'fde-toolkit-2026-10-13' };
    const payload = JSON.stringify(data);
    if (submission.current?.payload !== payload) submission.current = { id: crypto.randomUUID(), payload };
    try {
      const response = await fetch(leadEndpoint, {
        method: 'POST', credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer',
        signal: AbortSignal.timeout(15000), headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, submissionId: submission.current.id, captchaToken, formOpenedAt: openedAt.current }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true || result?.status !== 'queued' || typeof result?.requestId !== 'string') {
        const code = result?.error?.code;
        throw new Error(code === 'RATE_LIMITED' ? 'RATE_LIMITED' : code === 'VERIFICATION_REQUIRED' ? 'VERIFICATION_REQUIRED' : 'UNKNOWN');
      }
      setReceipt(result.requestId); setState('success'); setEmail(''); setNote(''); setConsent(false);
      submission.current = null;
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : '';
      setState('error');
      setError(code === 'RATE_LIMITED'
        ? (zh ? '纸条送得有点快，请稍后再试。你填写的内容还在。' : 'A few too many notes. Try again later; your draft is still here.')
        : code === 'VERIFICATION_REQUIRED'
          ? (zh ? '请完成验证，或稍等几秒再试。你填写的内容还在。' : 'Complete the verification, or wait a few seconds and try again. Your draft is still here.')
          : (zh ? '暂未确认收到。你填写的内容还在，可以稍后重试；同一张纸条会去重。' : 'Receipt is not confirmed. Your draft is still here. You can retry later; the same note is deduplicated.'));
    } finally {
      pending.current = false; setCaptchaToken(''); setVerificationAttempt(value => value + 1);
    }
  }

  return <Shell lang={lang} view="toolkit">
    <div className="toolkit-page">
      {leadEndpoint.startsWith('http://127.0.0.1:') ? <p className="tk-preview-note">{zh ? '本地演示 · 纸条只在内存中接收，不发送邮件' : 'Local preview · Notes stay in memory. No email is sent.'}</p> : null}
      <section className="tk-desk wrap" aria-labelledby="toolkit-title">
        <div className="tk-story">
          <p className="tk-kicker"><span aria-hidden="true" />FDE TOOLKIT <span className="tk-kicker-rule" /> {zh ? '给 Agent 选技能' : 'SKILLS FOR YOUR AGENT'}</p>
          <h1 id="toolkit-title">{zh ? <>你需要什么样的<br /><span className="tk-title-mark">技能呢？</span></> : <>What skills<br /><span className="tk-title-mark">do you need?</span></>}</h1>
          <p className="tk-intro">{zh ? '市场研究、内容营销、创作者合作，还是工程交付？FDE Tool 把这些工作方法整理成 Skills，帮你为 Agent 选到合适的技能。' : 'Market research, content marketing, creator partnerships or engineering delivery? FDE Tool brings these working methods into Skills to help you find the right capabilities for your agent.'}</p>
          <a className="tk-mobile-contact" href="#request-access">{zh ? '给 Eric 留个邮箱' : 'Leave Eric a note'}<ArrowRight aria-hidden="true" /></a>
          <div className="tk-worklist" aria-labelledby="tk-worklist-title">
            <p id="tk-worklist-title" className="tk-list-title">{zh ? '你想了解哪类技能？点一项，写进纸条。' : 'Which skills interest you? Pick a starting point for your note.'}</p>
            {examples.map((example, index) => <button key={example.label[1]} className="tk-example" type="button" onClick={() => chooseExample(example.note[textIndex])} disabled={busy || state === 'success'}>
              <span className="tk-example-number">0{index + 1}</span><span><strong>{example.label[textIndex]}</strong><span>{example.detail[textIndex]}</span></span><MoveUpRight aria-hidden="true" />
            </button>)}
          </div>
          <p className="tk-margin-note">{zh ? '不确定技能叫什么也没关系。说说你想解决的问题就好。' : 'You do not need to know the skill’s name. Just tell me what you want help with.'}</p>
        </div>

        <div className="tk-letter-wrap" id="request-access">
          <div className="tk-paper-tab" aria-hidden="true">{zh ? '留给 Eric 的一页' : 'A NOTE FOR ERIC'} <span>↘</span></div>
          <section className="toolkit-form tk-letter" aria-labelledby="tk-contact-title">
            <div className="tk-letter-head"><span>TO: ERIC / FDE</span><span className="tk-stamp" aria-hidden="true"><Mail /><span>LET’S<br />TALK</span></span></div>
            <h2 id="tk-contact-title">{zh ? <>留个邮箱，<span className="tk-title-phrase">聊聊你需要的技能。</span></> : 'Leave your email. Tell me which skills you need.'}</h2>
            <p className="tk-letter-intro">{zh ? '我会通过邮箱和你沟通，介绍适合的 Skills、使用方式和支持范围。' : 'I’ll follow up by email to discuss suitable Skills, how to use them and what support is available.'}</p>
            {state === 'success' ? <div className="tk-success" aria-live="polite" tabIndex={-1}>
              <span className="tk-received-stamp"><Check aria-hidden="true" />{zh ? '已收到' : 'RECEIVED'}</span>
              <h3>{zh ? '你的纸条收好了。' : 'Your note is in.'}</h3>
              <p>{zh ? 'Eric 会通过你留下的邮箱，和你聊聊所需技能与使用方式。' : 'Eric will follow up at the email you left to discuss the skills you need and how to use them.'}</p>
              <p className="tk-receipt">{zh ? '回执' : 'Reference'} · {receipt}</p>
              <a href={localPath(lang, 'playbook')} className="tk-inline-link">{zh ? '先逛逛业务场景' : 'Explore some business scenarios'}<ArrowUpRight aria-hidden="true" /></a>
            </div> : <form onSubmit={submit} aria-busy={busy}>
              <fieldset disabled={busy || !enabled} className="tk-fields">
                <legend className="tk-sr-only">{zh ? '邮箱与技能需求' : 'Email and skills enquiry'}</legend>
                <label htmlFor="tk-email">{zh ? '你的邮箱' : 'Your email'}</label>
                <input id="tk-email" name="email" type="email" required maxLength={254} autoComplete="email" autoCapitalize="none" spellCheck={false} value={email} placeholder="you@example.com" onChange={event => { setEmail(event.target.value); edit(); }} aria-describedby="tk-privacy" />
                <label htmlFor="tk-note">{zh ? '你需要哪类技能？' : 'What kinds of skills do you need?'}<span>{zh ? '选填' : 'Optional'}</span></label>
                <textarea ref={noteField} id="tk-note" name="message" rows={3} maxLength={500} value={note} placeholder={zh ? '比如：市场研究类，能帮我每周整理行业信息、生成简报。' : 'For example: market research skills for a weekly industry brief.'} onChange={event => { setNote(event.target.value); edit(); }} aria-describedby="tk-note-hint" />
                <p className="tk-field-hint" id="tk-note-hint">{zh ? '写个大概就好，不用放客户资料或账号信息。' : 'A rough idea is enough. Leave out client files and account details.'}</p>
                <div className="tk-trap" aria-hidden="true"><label htmlFor="tk-website">Website</label><input ref={honeypot} id="tk-website" name="website" tabIndex={-1} autoComplete="off" /></div>
                <label className="tk-consent"><input type="checkbox" name="consent" checked={consent} required onChange={event => { setConsent(event.target.checked); edit(); }} /><span>{zh ? '可以通过邮箱回复我这次咨询。' : 'You may email me about this enquiry.'}</span></label>
                {enabled ? <ToolkitVerification endpoint={leadEndpoint} lang={lang} active={consent} resetKey={verificationAttempt} onToken={setCaptchaToken} /> : null}
                <button type="submit" className="tk-submit" disabled={busy || !enabled}>{busy ? (zh ? '正在送出纸条…' : 'Sending your note…') : (zh ? '留个邮箱，聊聊技能' : 'Let’s talk skills')}<ArrowRight aria-hidden="true" /></button>
              </fieldset>
              {!enabled ? <output className="tk-unavailable">{zh ? '邮箱登记暂未开放；此表单不会提交信息。' : 'Email enquiries are not open yet. This form will not submit information.'}</output> : null}
              {error ? <p className="tk-error" role="alert">{error}</p> : null}
              <p className="tk-privacy" id="tk-privacy">{zh ? '只用于这次沟通，不公开展示，也不订阅营销邮件。' : 'For this conversation only. Never displayed publicly or added to a marketing list.'}{privacyUrl ? <> <a href={privacyUrl} target="_blank" rel="noopener noreferrer">{zh ? '隐私与删除说明' : 'Privacy & deletion'}</a></> : null}</p>
            </form>}
            <div className="tk-letter-signoff"><span>{zh ? '从你的需要，选合适的技能。' : 'Find the skills that fit your needs.'}</span><strong>Eric <span>↗</span></strong></div>
          </section>
        </div>
      </section>

      <section className="tk-next wrap" aria-labelledby="tk-next-title">
        <div><p className="tk-kicker">BEFORE WE TALK</p><h2 id="tk-next-title">{zh ? '还没想好？从业务场景找一找。' : 'Find ideas in your day-to-day work.'}</h2><p>{zh ? 'FDE 指南里有业务场景、交付方法和学习路径。先找到与你相关的工作，再一起看看需要哪些 Skills。' : 'Explore business scenarios, delivery methods and learning paths in the FDE guide. Find the work that matters to you, then we can discuss which Skills fit.'}</p></div>
        <a className="tk-guide-link" href={localPath(lang)}>{zh ? '浏览 FDE 指南' : 'Explore the FDE guide'}<ArrowUpRight aria-hidden="true" /></a>
      </section>
    </div>
  </Shell>;
}
