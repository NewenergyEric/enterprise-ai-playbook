'use client';
import Image from 'next/image';
import {
  ArrowUpRight,
  ArrowRight,
  Layers3,
  Compass,
  Workflow,
  Download,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Shell, CallToAction } from './shell';
import { Artifact } from './artifact';
import { Architecture } from './architecture';
import { faqs, plays } from '@/lib/content';
import { localPath, type Lang } from '@/lib/site';

export function HomePage({ lang }: { lang: Lang }) {
  const zh = lang === 'zh';
  return (
    <Shell lang={lang} view="home">
      <section className="home-hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            EXPERTISE. ENGINEERED.
          </p>
          <h1>
            {zh ? (
              <>
                让专业判断，
                <br />
                成为<em>企业能力。</em>
              </>
            ) : (
              <>
                Turn expertise
                <br />
                into <em>capability.</em>
              </>
            )}
          </h1>
          <p className="hero-intro">
            {zh
              ? '把市场洞察、岗位经验与专业方法，转化为可用的业务产出，以及能够持续工作的 Skill 和 Agent。'
              : 'Turn market insight, frontline know-how and professional methods into useful business outputs, and Skills and Agents your team can keep using.'}
          </p>
          <div className="hero-actions">
            <a
              className="button-link primary"
              href={localPath(lang, 'playbook')}
            >
              {zh ? '找到你的业务切入点' : 'Find your starting point'}
              <ArrowUpRight />
            </a>
            <a className="text-link" href={localPath(lang, 'process')}>
              {zh ? '了解我们怎样交付' : 'See how we deliver'}
              <ArrowRight />
            </a>
          </div>
          <p className="hero-footnote">
            {zh
              ? '业务判断 × 专业 Skill × 岗位 Agent × FDE 交付'
              : 'Business judgment × Professional Skills × Role Agents × FDE'}
          </p>
        </div>
        <figure className="hero-visual">
          <Image
            width={1536}
            height={1024}
            src="/images/business-landscape.png"
            alt={
              zh
                ? '连接研究、内容、一线服务与运营的概念场景'
                : 'A concept scene connecting research, content, frontline service and operations'
            }
            fetchPriority="high"
          />
          <div className="visual-topline">
            FIELDNOTES / 001<span>BUSINESS CAPABILITY</span>
          </div>
          <div className="visual-card">
            <small>
              {zh ? '我们留下的，不只是一份答案' : 'MORE THAN AN ANSWER'}
            </small>
            <strong>
              {zh ? (
                <>
                  一份可用结果。
                  <br />
                  一套可复用方法。
                </>
              ) : (
                <>
                  A useful result.
                  <br />A reusable method.
                </>
              )}
            </strong>
            <ArrowUpRight />
          </div>
        </figure>
      </section>
      <section id="services" className="value-intro wrap">
        <div className="section-top">
          <p className="eyebrow">01 / OUR VALUE</p>
          <h2>
            {zh ? (
              <>
                从更好的判断，
                <br />
                到下一次仍然做得好。
              </>
            ) : (
              <>
                Better decisions today.
                <br />
                Repeatable work tomorrow.
              </>
            )}
          </h2>
        </div>
        <div className="value-grid">
          {(zh
            ? [
                [
                  '先把问题看清',
                  '在市场、客户、渠道和运营的多种视角中，找到值得解决的真实问题。',
                ],
                [
                  '交出可用的结果',
                  '不是停在一次对话。交付业务能审阅、能跟进、能使用的报告和工作产物。',
                ],
                [
                  '把能力留在企业',
                  '把这次的方法、判断规则和有效修正，沉淀为企业 Skill 与 Agent。',
                ],
              ]
            : [
                [
                  'See the real problem',
                  'Use market, customer, channel and operating perspectives to identify the work worth doing.',
                ],
                [
                  'Deliver something useful',
                  'Go beyond a conversation. Produce reports and work outputs the business can review, use and act on.',
                ],
                [
                  'Keep the capability',
                  'Capture methods, decision criteria and effective corrections in enterprise Skills and Agents.',
                ],
              ]
          ).map(([h, p], i) => {
            const Icon = [Compass, Workflow, Layers3][i];
            return (
              <article key={h}>
                <span className="number">0{i + 1}</span>
                <Icon />
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="proof-section">
        <div className="wrap proof-grid">
          <div className="proof-copy">
            <p className="eyebrow">02 / WHAT GOOD LOOKS LIKE</p>
            <h2>
              {zh ? (
                <>
                  一份答案，
                  <br />
                  应该有下一步。
                </>
              ) : (
                <>
                  A good answer
                  <br />
                  has a next step.
                </>
              )}
            </h2>
            <p>
              {zh
                ? '一个市场值不值得进入？我们不只给一篇综述，而是把结论、不同视角、证据与未知项放在同一张决策简报中。'
                : 'Is a market worth entering? Bring the recommendation, different perspectives, evidence and unknowns into one decision brief, not just a long overview.'}
            </p>
            <p className="proof-pullquote">
              {zh
                ? '知道为什么，也知道还不知道什么。'
                : 'Know why. And know what you do not yet know.'}
            </p>
            <a
              className="text-link"
              href={localPath(lang, 'playbook') + '#market-entry'}
            >
              {zh ? '拆开这个场景看一看' : 'Explore this play'}
              <ArrowRight />
            </a>
          </div>
          <Artifact lang={lang} compact />
        </div>
      </section>
      <Architecture lang={lang} />
      <section className="plays-preview wrap">
        <div className="section-top">
          <p className="eyebrow">04 / ENTERPRISE PLAYBOOK</p>
          <div>
            <h2>
              {zh
                ? '从你正在做的工作切入。'
                : 'Start with work you already do.'}
            </h2>
            <p>
              {zh
                ? '市场、增长、运营、知识——不是泛泛的“AI 赋能”，而是具体的任务、方法和交付物。'
                : 'Markets, growth, operations and knowledge: specific tasks, methods and deliverables, not an abstract AI promise.'}
            </p>
          </div>
        </div>
        <div className="play-preview-grid">
          {[plays[0], plays[1], plays[3], plays[5]].map((p) => (
            <a
              key={p.id}
              href={localPath(lang, 'playbook') + '#' + p.id}
              className="play-preview-card"
            >
              <div>
                <span className="number">{p.number} / PLAY</span>
                <ArrowUpRight />
              </div>
              <h3>{p.title[lang]}</h3>
              <p>{p.promise[lang]}</p>
              <span className="play-deliverable">{p.outputs[lang][0]}</span>
            </a>
          ))}
        </div>
        <a className="text-link all-plays" href={localPath(lang, 'playbook')}>
          {zh
            ? '探索 9 个详细打法与更多业务机会'
            : 'Explore 9 detailed plays and more opportunities'}
          <ArrowRight />
        </a>
      </section>
      <section className="engagement-section">
        <div className="wrap">
          <div className="section-top">
            <p className="eyebrow">05 / HOW WE WORK TOGETHER</p>
            <h2>
              {zh ? (
                <>
                  一个切入点，
                  <br />
                  逐步长出的能力。
                </>
              ) : (
                <>
                  One starting point.
                  <br />
                  Room to grow.
                </>
              )}
            </h2>
          </div>
          <div className="engagement-grid">
            {(zh
              ? [
                  [
                    '01',
                    '问题诊断',
                    '先把值得做的事选出来。',
                    '业务问题拆解 / 现状样本 / 试点范围与评价标准',
                  ],
                  [
                    '02',
                    '场景共建',
                    '做出第一份真正可用的产出。',
                    '企业 Skill / 工具适配 / 岗位工作链 / 样本对照',
                  ],
                  [
                    '03',
                    '能力扩展',
                    '把有效方法带到下一项工作。',
                    '能力版本与维护 / 新任务验证 / 复用和迭代',
                  ],
                ]
              : [
                  [
                    '01',
                    'Frame the opportunity',
                    'Choose the work worth improving.',
                    'Problem framing / Current examples / Pilot scope and evaluation',
                  ],
                  [
                    '02',
                    'Build the first use case',
                    'Produce something the team can actually use.',
                    'Enterprise Skills / Tool adaptation / Role workflows / Comparative tests',
                  ],
                  [
                    '03',
                    'Expand the capability',
                    'Take a working method into the next task.',
                    'Versions and ownership / Fresh-task testing / Reuse and iteration',
                  ],
                ]
            ).map(([n, t, d, o]) => (
              <article key={n}>
                <span className="engagement-number">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <small>{o}</small>
              </article>
            ))}
          </div>
          <div className="engagement-bottom">
            <span>
              {zh
                ? '交付范围、节奏与工具依赖，在具体场景中共同确认。'
                : 'Scope, pace and tool dependencies are agreed around the specific use case.'}
            </span>
            <a className="text-link" href={localPath(lang, 'process')}>
              {zh ? '查看完整 6 步流程' : 'See the six-step process'}
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
      <section className="resources-section wrap" id="resources">
        <div>
          <p className="eyebrow">TAKE THE CONVERSATION FURTHER</p>
          <h2>
            {zh
              ? '把讨论带给你的团队。'
              : 'Bring the conversation to your team.'}
          </h2>
          <p>
            {zh
              ? '两份独立的参考手册。流程讲清如何落地；Playbook 讲清从哪里创造价值。网站新增的市场进入打法可在场景库中查看。'
              : 'Two separate reference guides: how delivery works, and where to create value. Explore the website for the additional market-entry play.'}
          </p>
        </div>
        <div className="resource-links">
          <a href={'/resources/fde-process-' + lang + '.pdf'} download>
            <span className="resource-icon">
              <Workflow />
            </span>
            <span>
              <b>{zh ? 'FDE 交付流程' : 'The FDE Process'}</b>
              <small>
                PDF · {zh ? '中文版 · 14 页' : 'English · 14 pages'}
              </small>
            </span>
            <Download />
          </a>
          <a href={'/resources/enterprise-playbook-' + lang + '.pdf'} download>
            <span className="resource-icon">
              <Layers3 />
            </span>
            <span>
              <b>{zh ? '企业场景 Playbook' : 'Enterprise Playbook'}</b>
              <small>
                PDF ·{' '}
                {zh
                  ? '中文版 · 20 页 · 8 个参考场景'
                  : 'English · 20 pages · 8 reference plays'}
              </small>
            </span>
            <Download />
          </a>
        </div>
      </section>
      <section className="faq-section wrap" id="faq">
        <div>
          <p className="eyebrow">A FEW GOOD QUESTIONS</p>
          <h2>
            {zh
              ? '开始之前，\n值得说清楚。'
              : 'Before we start,\nlet’s be clear.'}
          </h2>
        </div>
        <Accordion className="faq-list">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={'faq-' + i}>
              <AccordionTrigger>{f.q[lang]}</AccordionTrigger>
              <AccordionContent>{f.a[lang]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CallToAction lang={lang} />
    </Shell>
  );
}
