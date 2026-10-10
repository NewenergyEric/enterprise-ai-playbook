'use client';

import { type SyntheticEvent, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { Shell } from './shell';
import { localPath, type Lang } from '@/lib/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

function cleanEndpoint(value: string) {
  const endpoint = value.trim();
  if (!endpoint) return '';
  try {
    const url = new URL(endpoint);
    const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))
      return '';
    return url.toString();
  } catch {
    return '';
  }
}

function limit(value: string, length: number) {
  return value.trim().slice(0, length);
}

export function ToolkitAccessPage({
  lang,
  leadEndpoint,
}: {
  lang: Lang;
  leadEndpoint: string;
}) {
  const zh = lang === 'zh';
  const endpoint = cleanEndpoint(leadEndpoint);
  return (
    <Shell lang={lang} view="toolkit">
      <section className="toolkit-hero wrap">
        <div className="toolkit-hero-copy">
          <p className="eyebrow">
            <span /> PRIVATE TOOLKIT ACCESS
          </p>
          <h1>
            {zh ? (
              <>
                把可复用的工作方法，
                <br />
                交给真正要用的人。
              </>
            ) : (
              <>
                Put reusable methods
                <br />
                in the hands of the team using them.
              </>
            )}
          </h1>
          <p className="toolkit-hero-intro">
            {zh
              ? 'AIelsen FDE Toolkit 是面向真实业务任务的私有工具箱：把研究、营销、创作者合作、知识工作与工程交接整理成可选择、可组合、可核对的 Skill。它不提供公开下载，也不把未完成的能力包装成“全部可用”。'
              : 'The AIelsen FDE Toolkit is a private toolbox for real business work: research, marketing, creator partnerships, knowledge work and engineering handoffs, organized as selectable, composable and reviewable Skills. It is not publicly downloadable, and it does not present unfinished capability as universally ready.'}
          </p>
          <div className="toolkit-hero-notes">
            <span>
              <LockKeyhole />
              {zh ? '私有发行' : 'Private distribution'}
            </span>
            <span>
              <ShieldCheck />
              {zh ? '先审查，再交付' : 'Review before delivery'}
            </span>
            <span>
              <CheckCircle2 />
              {zh ? '版本与平台分开' : 'Generic + platform editions'}
            </span>
          </div>
        </div>
        <div className="toolkit-hero-card" aria-label={zh ? '工具箱交付范围' : 'Toolkit delivery scope'}>
          <div className="toolkit-card-topline">
            <span>FDE / TOOLKIT</span>
            <span>ACCESS 01</span>
          </div>
          <div className="toolkit-card-stack">
            <div>
              <small>{zh ? '通用技能正文' : 'GENERIC SKILL BODY'}</small>
              <strong>{zh ? '任务与判断' : 'Tasks & judgment'}</strong>
              <span>{zh ? '保留原始方法，独立维护' : 'Original methods, maintained separately'}</span>
            </div>
            <div>
              <small>{zh ? '平台发行版' : 'PLATFORM EDITION'}</small>
              <strong>WorkBuddy</strong>
              <span>{zh ? '字段、资源与测试包单独校验' : 'Fields, resources and test kit checked separately'}</span>
            </div>
            <div>
              <small>{zh ? '交付门禁' : 'DELIVERY GATE'}</small>
              <strong>{zh ? '审核 · 版本 · 访问' : 'Review · version · access'}</strong>
              <span>{zh ? '支付与访问方式在确认后提供' : 'Payment and access details follow confirmation'}</span>
            </div>
          </div>
          <p>
            {zh
              ? '不收集银行卡、密码、客户原始文件或生产系统权限。'
              : 'No card data, passwords, raw client files or production credentials are collected.'}
          </p>
        </div>
      </section>

      <section className="toolkit-access-grid wrap" id="request-access">
        <div className="toolkit-access-copy">
          <p className="eyebrow">01 / REQUEST A PRIVATE CONVERSATION</p>
          <h2>
            {zh ? (
              <>
                先说清楚你要解决的工作，
                <br />
                再决定哪一版值得交付。
              </>
            ) : (
              <>
                Start with the work to improve.
                <br />
                Choose the right edition after review.
              </>
            )}
          </h2>
          <p>
            {zh
              ? '留下邮箱或微信后，我们会先确认使用场景、团队角色、发行版和交付边界，再单独沟通试用、购买与后续支持。联系方式只用于这次工具箱申请，不会被放进公开页面。'
              : 'After you leave an email or WeChat ID, we first confirm the use case, team role, edition and delivery boundary, then discuss preview, purchase and support privately. Your contact is used for this toolkit request only and is never published.'}
          </p>
          <ol className="toolkit-steps">
            <li>
              <span>01</span>
              <div>
                <strong>{zh ? '确认工作场景' : 'Confirm the work'}</strong>
                <p>{zh ? '例如研究简报、全案营销、创作者合作或工程交接。' : 'For example: research briefs, full-funnel campaigns, creator work or engineering handoff.'}</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>{zh ? '审查与匹配版本' : 'Review and match an edition'}</strong>
                <p>{zh ? '核对资料边界、平台字段、依赖与已知限制。' : 'Check data boundaries, platform fields, dependencies and known limits.'}</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>{zh ? '私下提供报价与访问方式' : 'Share pricing and access privately'}</strong>
                <p>{zh ? '支付在独立流程中处理；此页不收银行卡信息。' : 'Payment is handled in a separate flow; this page never collects card details.'}</p>
              </div>
            </li>
          </ol>
          <a className="text-link" href={localPath(lang)}>
            {zh ? '先回到 FDE 服务站' : 'Return to the FDE service site'}
            <ArrowRight />
          </a>
        </div>
        <ToolkitAccessForm lang={lang} endpoint={endpoint} />
      </section>

      <section className="toolkit-boundaries wrap">
        <div>
          <p className="eyebrow">02 / WHAT THIS REQUEST IS — AND IS NOT</p>
          <h2>{zh ? '一个合格的访问请求，应该让双方都更安全。' : 'A good access request makes both sides safer.'}</h2>
        </div>
        <div className="toolkit-boundary-grid">
          <article>
            <Check />
            <h3>{zh ? '会得到什么' : 'What you can expect'}</h3>
            <p>{zh ? '针对你的任务推荐版本、明确的使用边界、可核对的交付说明，以及后续支持方式。' : 'An edition recommendation for your work, clear usage boundaries, reviewable delivery notes and a defined support path.'}</p>
          </article>
          <article>
            <LockKeyhole />
            <h3>{zh ? '不会在这里发生什么' : 'What does not happen here'}</h3>
            <p>{zh ? '不会公开展示 Toolkit 文件，不会要求客户上传原始资料，也不会在表单中处理密码、银行卡或生产权限。' : 'Toolkit files are not exposed, raw client material is not requested, and passwords, card data or production access never belong in this form.'}</p>
          </article>
          <article>
            <ShieldCheck />
            <h3>{zh ? '为什么要先审查' : 'Why review comes first'}</h3>
            <p>{zh ? '不同 Skill 的依赖、许可、平台兼容性和任务风险不同。先匹配再交付，才能把“能读”与“适合你的工作”区分开。' : 'Skills differ in dependencies, provenance, platform compatibility and task risk. Matching before delivery separates “can be read” from “fit for your work”.'}</p>
          </article>
        </div>
      </section>
    </Shell>
  );
}

function ToolkitAccessForm({
  lang,
  endpoint,
}: {
  lang: Lang;
  endpoint: string;
}) {
  const zh = lang === 'zh';
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    email: '',
    wechat: '',
    organization: '',
    role: '',
    interest: 'private-preview',
    useCase: '',
    consent: false,
    website: '',
  });

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    if (state !== 'idle') {
      setState('idle');
      setMessage('');
    }
  }

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = limit(form.email, 254);
    const wechat = limit(form.wechat, 80);
    if (!endpoint) {
      setState('error');
      setMessage(
        zh
          ? '此页面尚未配置安全的接收地址；你的信息没有被提交。请让部署 Agent 配置 TOOLKIT_LEAD_ENDPOINT 后再启用。'
          : 'This page has no secure receiving endpoint configured; nothing was submitted. Ask the deployment Agent to configure TOOLKIT_LEAD_ENDPOINT before enabling it.',
      );
      return;
    }
    if (!email && !wechat) {
      setState('error');
      setMessage(zh ? '请至少填写邮箱或微信。' : 'Add an email address or a WeChat ID.');
      return;
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setState('error');
      setMessage(zh ? '请检查邮箱格式。' : 'Check the email format.');
      return;
    }
    if (!form.consent) {
      setState('error');
      setMessage(zh ? '请先同意我们仅为本次申请联系你。' : 'Consent to contact you about this request first.');
      return;
    }
    if (form.website.trim()) return;
    setState('submitting');
    setMessage('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          wechat,
          organization: limit(form.organization, 160),
          role: limit(form.role, 120),
          interest: form.interest,
          useCase: limit(form.useCase, 1200),
          language: lang,
          consent: true,
          source: 'fde-web-toolkit-access',
          website: '',
        }),
      });
      if (!response.ok) throw new Error('lead endpoint rejected request');
      setState('success');
      setMessage(
        zh
          ? '申请已收到。我们会先做范围与安全审查，再通过你留下的联系方式沟通版本、报价与访问方式。'
          : 'Request received. We will review scope and safety first, then use your chosen contact to discuss the edition, pricing and access.',
      );
    } catch {
      setState('error');
      setMessage(
        zh
          ? '暂时没有提交成功。请稍后重试；表单没有上传任何 Toolkit 文件。'
          : 'The request was not submitted. Try again later; no Toolkit files were uploaded.',
      );
    }
  }

  const disabled = state === 'submitting' || state === 'success';
  return (
    <form className="toolkit-form" onSubmit={submit} noValidate>
      <div className="toolkit-form-topline">
        <span>{zh ? '私有访问申请' : 'Private access request'}</span>
        <span>
          <LockKeyhole /> {zh ? '安全边界' : 'Safety first'}
        </span>
      </div>
      <div className="toolkit-form-fields">
        <label>
          <span>{zh ? '工作邮箱' : 'Work email'}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            placeholder={zh ? '至少填写邮箱或微信' : 'Email or WeChat is required'}
            maxLength={254}
          />
        </label>
        <label>
          <span>{zh ? '微信号（可选）' : 'WeChat ID (optional)'}</span>
          <input
            type="text"
            name="wechat"
            autoComplete="off"
            value={form.wechat}
            onChange={(event) => update('wechat', event.target.value)}
            placeholder={zh ? '不方便留邮箱时可填写' : 'Use this if email is not convenient'}
            maxLength={80}
          />
        </label>
        <label>
          <span>{zh ? '组织 / 团队（可选）' : 'Organization / team (optional)'}</span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            value={form.organization}
            onChange={(event) => update('organization', event.target.value)}
            maxLength={160}
          />
        </label>
        <label>
          <span>{zh ? '你的角色（可选）' : 'Your role (optional)'}</span>
          <input
            type="text"
            name="role"
            autoComplete="organization-title"
            value={form.role}
            onChange={(event) => update('role', event.target.value)}
            maxLength={120}
          />
        </label>
        <label>
          <span>{zh ? '你想先了解什么' : 'What are you exploring?'}</span>
          <select name="interest" value={form.interest} onChange={(event) => update('interest', event.target.value)}>
            <option value="private-preview">{zh ? '私有预览' : 'Private preview'}</option>
            <option value="purchase">{zh ? '购买与授权' : 'Purchase and licensing'}</option>
            <option value="team-adaptation">{zh ? '团队适配 / FDE 共建' : 'Team adaptation / FDE co-build'}</option>
          </select>
        </label>
        <label className="toolkit-form-wide">
          <span>{zh ? '准备解决的工作（可选）' : 'Work you want to improve (optional)'}</span>
          <textarea
            name="useCase"
            rows={4}
            value={form.useCase}
            onChange={(event) => update('useCase', event.target.value)}
            placeholder={zh ? '例如：把研究、FAB、文案和 TVC 变成一条可复用的营销工作链。不要粘贴客户原始资料。' : 'For example: connect research, FAB, copy and TVC into a reusable marketing workflow. Do not paste raw client material.'}
            maxLength={1200}
          />
        </label>
      </div>
      <label className="toolkit-consent">
        <input type="checkbox" name="consent" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} />
        <span>{zh ? '我同意 AIelsen 仅为本次工具箱申请联系我，并理解访问与支付需另行确认。' : 'I agree that AIelsen may contact me about this toolkit request, with access and payment confirmed separately.'}</span>
      </label>
      <label className="toolkit-honeypot" aria-hidden="true">
        <span>Website</span>
        <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={(event) => update('website', event.target.value)} />
      </label>
      <div className="toolkit-form-actions">
        <button type="submit" className="button-link primary" disabled={disabled}>
          {state === 'submitting' ? (zh ? '正在提交…' : 'Sending…') : zh ? '提交私有访问申请' : 'Request private access'}
          <ArrowRight />
        </button>
        <small>{zh ? '不上传 Toolkit 文件 · 不收集支付卡信息' : 'No Toolkit upload · No card data collected'}</small>
      </div>
      {message ? (
        <output className={'toolkit-form-message ' + (state === 'success' ? 'success' : 'error')}>
          {state === 'success' ? <CheckCircle2 /> : <ShieldCheck />}
          {message}
        </output>
      ) : null}
      <div className="toolkit-form-support">
        <span><Mail /> {zh ? '邮箱' : 'Email'}</span>
        <span><MessageCircle /> {zh ? '微信' : 'WeChat'}</span>
        <span><ShieldCheck /> {zh ? '人工审查' : 'Human review'}</span>
      </div>
    </form>
  );
}
