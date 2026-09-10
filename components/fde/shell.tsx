'use client';
import { useSyncExternalStore, type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react';
import { localPath, type Lang, type View } from '@/lib/site';
import { Brand } from './brand';
import { academyPath } from '@/lib/academy';
import { agentCasesPath } from '@/lib/agent-cases';
import {
  subscribeFragment,
  getFragment,
  getServerFragment,
} from '@/lib/browser-fragment';

export function Shell({
  lang,
  view,
  children,
}: {
  lang: Lang;
  view: View;
  children: ReactNode;
}) {
  const zh = lang === 'zh';
  const fragment = useSyncExternalStore(
    subscribeFragment,
    getFragment,
    getServerFragment,
  );
  return (
    <div className="site-shell" lang={zh ? 'zh-CN' : 'en'}>
      <a className="skip-link" href="#main">
        {zh ? '跳到正文' : 'Skip to content'}
      </a>
      <div className="utility">
        <div className="wrap">
          {zh
            ? '从业务现场，到可复用的企业能力。'
            : 'From fieldwork to lasting business capability.'}
          <span>FORWARD-DEPLOYED ENGINEERING</span>
        </div>
      </div>
      <header className="site-header wrap">
        <Brand lang={lang} />
        <nav aria-label={zh ? '主导航' : 'Main navigation'}>
          <a
            href={localPath(lang)}
            aria-current={view === 'home' ? 'page' : undefined}
          >
            {zh ? '我们的价值' : 'Our value'}
          </a>
          <a
            href={localPath(lang, 'process')}
            aria-current={view === 'process' ? 'page' : undefined}
          >
            {zh ? '交付流程' : 'The process'}
          </a>
          <a
            href={localPath(lang, 'playbook')}
            aria-current={view === 'playbook' ? 'page' : undefined}
          >
            Playbook
          </a>
          <a href={academyPath(lang)}>{zh ? 'FDE 学院' : 'FDE Academy'}</a>
          <a href={agentCasesPath(lang)} hrefLang={zh ? 'zh-CN' : 'en'}>
            {zh ? 'Agent 案例' : 'Agent Cases'}
          </a>
        </nav>
        <div className="language" aria-label={zh ? '语言' : 'Language'}>
          {(['zh', 'en'] as Lang[]).map((l) => (
            <a
              key={l}
              href={
                localPath(l, view) +
                (view === 'playbook' && fragment ? '#' + fragment : '')
              }
              lang={l === 'zh' ? 'zh-CN' : 'en'}
              hrefLang={l === 'zh' ? 'zh-CN' : 'en'}
              aria-label={l === 'zh' ? '切换到中文' : 'Switch to English'}
              aria-current={l === lang ? 'page' : undefined}
            >
              {l === 'zh' ? '中文' : 'EN'}
            </a>
          ))}
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="wrap footer-main">
          <div>
            <Brand lang={lang} />
            <p>
              {zh
                ? '真实问题。专业方法。持续可用的能力。'
                : 'Real problems. Expert methods. Lasting capability.'}
            </p>
          </div>
          <div className="footer-links">
            <a href={agentCasesPath(lang)} hrefLang={zh ? 'zh-CN' : 'en'}>
              {zh ? 'Agent 实战案例' : 'Agent case studies'}
              <ArrowUpRight />
            </a>
            <a href={academyPath(lang)}>
              {zh ? 'FDE 学院' : 'FDE Academy'}
              <ArrowUpRight />
            </a>
            <a href={academyPath(lang, 'enterprise')}>
              {zh ? '企业共训' : 'Team learning'}
              <ArrowUpRight />
            </a>
            <a href={localPath(lang, 'process')}>
              {zh ? '交付流程' : 'Delivery process'}
              <ArrowUpRight />
            </a>
            <a href={localPath(lang, 'playbook')}>
              {zh ? '场景 Playbook' : 'Enterprise Playbook'}
              <ArrowUpRight />
            </a>
            <a href={localPath(lang) + '#resources'}>
              {zh ? '下载资料' : 'Resources'}
              <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>EXPERTISE. ENGINEERED. / ZH + EN</span>
          <p>
            {zh
              ? '本站样张为合成示意，不含客户数据，不构成成效承诺。'
              : 'Samples are synthetic illustrations, not client data or performance guarantees.'}
          </p>
          <a href={localPath(lang) + '#faq'}>
            {zh ? '常见问题与使用边界' : 'FAQ & boundaries'}
          </a>
        </div>
      </footer>
    </div>
  );
}

export function CallToAction({ lang }: { lang: Lang }) {
  const zh = lang === 'zh';
  return (
    <section className="start-section" id="start">
      <div className="wrap start-grid">
        <div>
          <p className="eyebrow">START WITH ONE REAL PROBLEM</p>
          <h2>
            {zh ? (
              <>
                带来一个真实问题。
                <br />
                我们把第一步做具体。
              </>
            ) : (
              <>
                Bring a real problem.
                <br />
                Make the first step concrete.
              </>
            )}
          </h2>
          <p>
            {zh
              ? '不需要先写完整的 AI 战略。一个反复出现的问题、一份现有样本、一位真正会使用结果的人，就能开启有依据的讨论。'
              : 'You do not need a complete AI strategy. Start with a recurring problem, one existing example and someone who will actually use the result.'}
          </p>
        </div>
        <div className="start-actions">
          <a
            className="button-link inverse"
            href={'/resources/pilot-brief-' + lang + '.md'}
            download
          >
            {zh ? '下载试点问题简报' : 'Download the pilot brief'}
            <Download />
          </a>
          <a className="text-link" href={localPath(lang, 'playbook')}>
            {zh
              ? '还没选好问题？浏览场景'
              : 'Need a starting point? Explore the plays'}
            <ArrowRight />
          </a>
          <small>
            {zh
              ? '可编辑 Markdown · 本地填写 · 不上传数据'
              : 'Editable Markdown · Complete locally · No data upload'}
          </small>
        </div>
      </div>
    </section>
  );
}
