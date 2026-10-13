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
          <p className="tk-kicker"><span aria-hidden="true" />FDE TOOLKIT <span className="tk-kicker-rule" /> {zh ? '从一件工作开始' : 'ONE PIECE OF WORK'}</p>
          <h1 id="toolkit-title">{zh ? <>Agent 装好了，<br />接下来，<span className="tk-title-mark">做点实事。</span></> : <>Your agent is ready.<br />Let’s put it<br /><span className="tk-title-mark">to work.</span></>}</h1>
          <p className="tk-intro">{zh ? '给它合适的工具，也给它清楚的做事方法。FDE Tool 把研究、营销和交付中的工作方法整理成 Skills，帮你从眼前这件事开始。' : 'Give it the right tools and a clear way of working. FDE Tool brings research, marketing and delivery methods into Skills, starting with the work in front of you.'}</p>
          <a className="tk-mobile-contact" href="#request-access">{zh ? '给 Eric 留个邮箱' : 'Leave Eric a note'}<ArrowRight aria-hidden="true" /></a>
          <div className="tk-worklist" aria-labelledby="tk-worklist-title">
            <p id="tk-worklist-title" className="tk-list-title">{zh ? '你想先做哪件事？点一项，写进纸条。' : 'What are you working on? Pick an idea for your note.'}</p>
            {examples.map((example, index) => <button key={example.label[1]} className="tk-example" type="button" onClick={() => chooseExample(example.note[textIndex])} disabled={busy || state === 'success'}>
              <span className="tk-example-number">0{index + 1}</span><span><strong>{example.label[textIndex]}</strong><span>{example.detail[textIndex]}</span></span><MoveUpRight aria-hidden="true" />
            </button>)}
          </div>
          <p className="tk-margin-note">{zh ? '不必先想清所有需求。一件想做成的事，就够开始聊。' : 'You do not need a complete brief. One task is enough to start.'}</p>
        </div>

        <div className="tk-letter-wrap" id="request-access">
          <div className="tk-paper-tab" aria-hidden="true">{zh ? '留给 Eric 的一页' : 'A NOTE FOR ERIC'} <span>↘</span></div>
          <section className="toolkit-form tk-letter" aria-labelledby="tk-contact-title">
            <div className="tk-letter-head"><span>TO: ERIC / FDE</span><span className="tk-stamp" aria-hidden="true"><Mail /><span>LET’S<br />TALK</span></span></div>
            <h2 id="tk-contact-title">{zh ? <>留个邮箱，<span className="tk-title-phrase">聊聊你的工作。</span></> : 'Leave your email. Tell me about the work.'}</h2>
            <p className="tk-letter-intro">{zh ? '我会通过邮箱和你沟通，看看哪些工具适合、怎么开始。' : 'I’ll follow up by email to discuss which tools fit and where to start.'}</p>
            {state === 'success' ? <div className="tk-success" aria-live="polite" tabIndex={-1}>
              <span className="tk-received-stamp"><Check aria-hidden="true" />{zh ? '已收到' : 'RECEIVED'}</span>
              <h3>{zh ? '你的纸条收好了。' : 'Your note is in.'}</h3>
              <p>{zh ? 'Eric 会通过你留下的邮箱，和你聊聊这件工作。' : 'Eric will follow up at the email you left to talk about the work.'}</p>
              <p className="tk-receipt">{zh ? '回执' : 'Reference'} · {receipt}</p>
              <a href={localPath(lang, 'playbook')} className="tk-inline-link">{zh ? '先逛逛业务场景' : 'Explore some business scenarios'}<ArrowUpRight aria-hidden="true" /></a>
            </div> : <form onSubmit={submit} aria-busy={busy}>
              <fieldset disabled={busy || !enabled} className="tk-fields">
                <legend className="tk-sr-only">{zh ? '邮箱与工作需求' : 'Email and work enquiry'}</legend>
                <label htmlFor="tk-email">{zh ? '你的邮箱' : 'Your email'}</label>
                <input id="tk-email" name="email" type="email" required maxLength={254} autoComplete="email" autoCapitalize="none" spellCheck={false} value={email} placeholder="you@example.com" onChange={event => { setEmail(event.target.value); edit(); }} aria-describedby="tk-privacy" />
                <label htmlFor="tk-note">{zh ? '想让 Agent 帮你做什么？' : 'What would you like your agent to help with?'}<span>{zh ? '选填' : 'Optional'}</span></label>
                <textarea ref={noteField} id="tk-note" name="message" rows={3} maxLength={500} value={note} placeholder={zh ? '比如：每周整理行业信息，给团队做一份简报。' : 'For example: a weekly industry brief for my team.'} onChange={event => { setNote(event.target.value); edit(); }} aria-describedby="tk-note-hint" />
                <p className="tk-field-hint" id="tk-note-hint">{zh ? '写个大概就好，不用放客户资料或账号信息。' : 'A rough idea is enough. Leave out client files and account details.'}</p>
                <div className="tk-trap" aria-hidden="true"><label htmlFor="tk-website">Website</label><input ref={honeypot} id="tk-website" name="website" tabIndex={-1} autoComplete="off" /></div>
                <label className="tk-consent"><input type="checkbox" name="consent" checked={consent} required onChange={event => { setConsent(event.target.checked); edit(); }} /><span>{zh ? '可以通过邮箱回复我这次咨询。' : 'You may email me about this enquiry.'}</span></label>
                {enabled ? <ToolkitVerification endpoint={leadEndpoint} lang={lang} active={consent} resetKey={verificationAttempt} onToken={setCaptchaToken} /> : null}
                <button type="submit" className="tk-submit" disabled={busy || !enabled}>{busy ? (zh ? '正在送出纸条…' : 'Sending your note…') : (zh ? '留个邮箱，聊聊工具' : 'Let’s talk tools')}<ArrowRight aria-hidden="true" /></button>
              </fieldset>
              {!enabled ? <output className="tk-unavailable">{zh ? '邮箱登记暂未开放；此表单不会提交信息。' : 'Email enquiries are not open yet. This form will not submit information.'}</output> : null}
              {error ? <p className="tk-error" role="alert">{error}</p> : null}
              <p className="tk-privacy" id="tk-privacy">{zh ? '只用于这次沟通，不公开展示，也不订阅营销邮件。' : 'For this conversation only. Never displayed publicly or added to a marketing list.'}{privacyUrl ? <> <a href={privacyUrl} target="_blank" rel="noopener noreferrer">{zh ? '隐私与删除说明' : 'Privacy & deletion'}</a></> : null}</p>
            </form>}
            <div className="tk-letter-signoff"><span>{zh ? '先聊工作，再选工具。' : 'The work first. The tools second.'}</span><strong>Eric <span>↗</span></strong></div>
          </section>
        </div>
      </section>

      <section className="tk-next wrap" aria-labelledby="tk-next-title">
        <div><p className="tk-kicker">BEFORE WE TALK</p><h2 id="tk-next-title">{zh ? '先看看，AI 能接手哪些工作。' : 'See where AI can help with the work.'}</h2><p>{zh ? 'FDE 指南里有业务场景、交付方法和学习路径。工具箱的使用方式与支持范围，我们按你的任务沟通。' : 'The FDE guide covers business scenarios, delivery methods and learning paths. We’ll discuss Toolkit access and support around your task.'}</p></div>
        <a className="tk-guide-link" href={localPath(lang)}>{zh ? '浏览 FDE 指南' : 'Explore the FDE guide'}<ArrowUpRight aria-hidden="true" /></a>
      </section>
    </div>
  </Shell>;
}
