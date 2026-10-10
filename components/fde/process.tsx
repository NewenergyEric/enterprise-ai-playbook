import {
  ArrowRight,
  ArrowUpRight,
  Download,
  CircleCheck,
  FileText,
  UserRound,
  RefreshCw,
} from 'lucide-react';
import { Shell, CallToAction } from './shell';
import { stages } from '@/lib/content';
import { academyPath, stageLearning } from '@/lib/academy';
import { localPath, type Lang } from '@/lib/site';
export function ProcessPage({ lang }: { lang: Lang }) {
  const zh = lang === 'zh';
  return (
    <Shell lang={lang} view="process">
      <section className="process-hero wrap">
        <p className="eyebrow">THE FDE PROCESS / FIELD TO CAPABILITY</p>
        <div className="process-heading">
          <h1>
            {zh ? (
              <>
                从一个业务问题，
                <br />
                走到<em>持续可用的能力。</em>
              </>
            ) : (
              <>
                From a real problem
                <br />
                to <em>lasting capability.</em>
              </>
            )}
          </h1>
          <div>
            <p>
              {zh
                ? 'FDE 是深入业务现场的工程交付：理解工作中的判断，接通专业方法与工具，用真实任务证明结果，再让有效方法留下来。'
                : 'Forward-deployed engineering brings delivery into real work: understand the judgments, connect methods and tools, evaluate on real tasks, and retain what works.'}
            </p>
            <a
              className="text-link"
              href={'/resources/fde-process-' + lang + '.pdf'}
              download
            >
              {zh ? '下载独立流程手册' : 'Download the process guide'}
              <Download />
            </a>
          </div>
        </div>
        <div
          className="process-route"
          aria-label={zh ? '六步交付流程' : 'Six-step delivery flow'}
        >
          {stages.map((s, i) => (
            <a href={'#stage-' + (i + 1)} key={s.title.en}>
              <span>0{i + 1}</span>
              <strong>{s.title[lang]}</strong>
              <ArrowRight />
            </a>
          ))}
        </div>
        <div className="route-legend">
          <span>
            {zh
              ? '一个真实任务 → 一套可运行方法 → 一个可复用能力包'
              : 'A real task → A working method → A reusable capability pack'}
          </span>
          <span>
            <RefreshCw />
            {zh
              ? '根据验证反馈迭代，而非机械走完六步'
              : 'Iterate on evidence, not a mechanical checklist'}
          </span>
        </div>
      </section>
      <section className="process-core">
        <div className="wrap process-body">
          <aside className="process-aside">
            <p className="eyebrow">DELIVERY, MADE TANGIBLE</p>
            <h2>
              {zh ? (
                <>
                  每一步，
                  <br />
                  都有具体产物。
                </>
              ) : (
                <>
                  Every step leaves
                  <br />
                  something useful.
                </>
              )}
            </h2>
            <p>
              {zh
                ? '流程的重点不是增加审批，而是减少模糊：问题是什么、方法为什么有效、产出怎样使用、价值如何被验证。'
                : 'The point is not more sign-offs. It is less ambiguity: what the problem is, why the method works, how outputs are used and how value is evaluated.'}
            </p>
            <a className="text-link" href={localPath(lang, 'playbook')}>
              {zh ? '把流程放进一个场景' : 'See the process in a play'}
              <ArrowUpRight />
            </a>
          </aside>
          <div className="stage-list">
            {stages.map((s, i) => (
              <article
                id={'stage-' + (i + 1)}
                className="stage"
                key={s.title.en}
              >
                <span className="stage-number">0{i + 1}</span>
                <div className="stage-content">
                  <h2>{s.title[lang]}</h2>
                  <p className="stage-detail">{s.detail[lang]}</p>
                  <p className="stage-work">{s.work[lang]}</p>
                  <div className="stage-facts">
                    <div>
                      <FileText />
                      <span>{zh ? '带走的产物' : 'THE DELIVERABLE'}</span>
                      <strong>{s.output[lang]}</strong>
                    </div>
                    <div>
                      <UserRound />
                      <span>{zh ? '一起完成的工作' : 'YOUR TEAM’S ROLE'}</span>
                      <p>{s.client[lang]}</p>
                    </div>
                  </div>
                  <div className="stage-done">
                    <CircleCheck />
                    <span>
                      <b>
                        {zh
                          ? '怎样判断这一步有用'
                          : 'What makes this step useful'}
                      </b>
                      {s.done[lang]}
                    </span>
                  </div>
                  <a
                    className="stage-learning"
                    href={academyPath(
                      lang,
                      'curriculum/' + stageLearning[i].week,
                    )}
                  >
                    <span>
                      {zh
                        ? 'FDE 学院 · 对应课程'
                        : 'FDE ACADEMY · RELATED MODULE'}
                    </span>
                    W{stageLearning[i].week} / {stageLearning[i][lang]}{' '}
                    <ArrowUpRight />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="field-lessons wrap">
        <div className="section-top">
          <p className="eyebrow">WHAT FIELDWORK TEACHES US</p>
          <h2>
            {zh
              ? '真正费功夫的地方，\n也是差异产生的地方。'
              : 'Where the hard work happens\nis where the difference shows.'}
          </h2>
        </div>
        <div className="lessons-grid">
          {(zh
            ? [
                [
                  '01',
                  '先把数据含义对齐',
                  '同名客户未必是同一主体；累计数据未必能相加。先对齐身份、粒度、时间和口径，再谈自动分析。',
                  '留下：业务口径卡与验证样本',
                ],
                [
                  '02',
                  '把“看起来不错”拆开',
                  '高潜力不等于高确定性。保留证据、分歧和未知项，才能让业务知道什么可以跟进、什么应该核实。',
                  '留下：判断规则与证据索引',
                ],
                [
                  '03',
                  '验证完整工作，不只看演示',
                  '生成成功不代表发出、被采用或解决了问题。要算上人工修正、等待、工具成本和真实使用。',
                  '留下：对照结果与改进清单',
                ],
              ]
            : [
                [
                  '01',
                  'Align the meaning first',
                  'Matching names may hide different entities. Cumulative data may not be additive. Resolve identity, grain, time and definitions before automating analysis.',
                  'Retain: definition cards and test cases',
                ],
                [
                  '02',
                  'Unpack “looks promising”',
                  'High potential is not high confidence. Retain evidence, disagreement and unknowns so the business knows what to pursue and what to verify.',
                  'Retain: judgment rules and an evidence index',
                ],
                [
                  '03',
                  'Evaluate the complete job',
                  'Generation does not prove sending, adoption or resolution. Include human corrections, waiting, tool costs and actual use.',
                  'Retain: comparisons and improvements',
                ],
              ]
          ).map(([n, t, p, o]) => (
            <article key={n}>
              <span>{n} / FIELDNOTE</span>
              <h3>{t}</h3>
              <p>{p}</p>
              <strong>{o}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="handoff-section">
        <div className="wrap">
          <div>
            <p className="eyebrow">THE COMPOUNDING OUTPUT</p>
            <h2>
              {zh
                ? '这次解决问题，\n下次不再重新解释一遍。'
                : 'Solve the task now.\nKeep the method for next time.'}
            </h2>
          </div>
          <div className="handoff-grid">
            {(zh
              ? [
                  ['业务产物', '简报、清单、草稿、分析与建议'],
                  ['方法资产', 'Skill、模板、反例与评价样本'],
                  ['工作能力', '岗位 Agent、工具配置与工作入口'],
                  ['维护约定', '来源、依赖、版本与负责人'],
                ]
              : [
                  [
                    'Business outputs',
                    'Briefs, shortlists, drafts, analysis and options',
                  ],
                  [
                    'Method assets',
                    'Skills, templates, counterexamples and test cases',
                  ],
                  [
                    'Working capability',
                    'Role Agents, tool configurations and entry points',
                  ],
                  [
                    'Maintenance',
                    'Sources, dependencies, versions and ownership',
                  ],
                ]
            ).map(([a, b], i) => (
              <div key={a}>
                <span>0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
          <p className="boundary-note">
            {zh
              ? '可复用的通用方法，与企业专属数据、配置及商业信息分别管理；复用不等于带走或公开客户资料。'
              : 'Manage shared methods separately from client-specific data, configuration and commercial information. Reuse does not mean taking or publishing client material.'}
          </p>
        </div>
      </section>
      <CallToAction lang={lang} />
    </Shell>
  );
}
