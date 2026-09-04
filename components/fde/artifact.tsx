'use client';
import {
  ArrowRight,
  Check,
  FileText,
  Search,
  MessageSquare,
  Layers3,
  Flag,
  Sparkles,
  CircleHelp,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Lang } from '@/lib/site';

export function Artifact({
  id = 'market-entry',
  lang,
  compact = false,
}: {
  id?: string;
  lang: Lang;
  compact?: boolean;
}) {
  const zh = lang === 'zh';
  const T = (cn: string, en: string) => (zh ? cn : en);
  return (
    <div className={'artifact ' + (compact ? 'artifact-compact' : '')}>
      <div className="artifact-chrome">
        <span>
          <FileText />
          {T('交付样张', 'DELIVERABLE SAMPLE')}
        </span>
        <span className="sample-label">
          {T('合成示意 · 非客户数据', 'Synthetic · Not client data')}
        </span>
      </div>
      {id === 'market-entry' ? (
        <div className="decision-sample">
          <div className="sample-document-title">
            <span className="doc-number">BRIEF / 01</span>
            <h3>
              {T('某产品的市场进入判断', 'A product’s market-entry decision')}
            </h3>
            <span className="status-tag">
              {T('建议：先验证', 'RECOMMENDATION: PILOT')}
            </span>
          </div>
          <Tabs defaultValue="conclusion" className="artifact-tabs">
            <TabsList aria-label={T('判断简报内容', 'Decision brief sections')}>
              {['conclusion', 'perspectives', 'evidence', 'actions'].map(
                (tab, i) => (
                  <TabsTrigger key={tab} value={tab}>
                    {
                      (zh
                        ? ['结论', '多视角', '证据', '下一步']
                        : [
                            'Conclusion',
                            'Perspectives',
                            'Evidence',
                            'Next steps',
                          ])[i]
                    }
                  </TabsTrigger>
                ),
              )}
            </TabsList>
            <TabsContent value="conclusion">
              <div className="decision-verdict">
                <span className="big-glyph">↗</span>
                <div>
                  <h4>
                    {T(
                      '先试一个渠道，再决定投入。',
                      'Test one channel before committing.',
                    )}
                  </h4>
                  <p>
                    {T(
                      '需求假设有待验证；服务覆盖与渠道成本尚未确认。先用真实访谈和合作条件验证可行性。',
                      'Demand remains a hypothesis. Service coverage and channel costs are unconfirmed. Start with customer conversations and concrete partner terms.',
                    )}
                  </p>
                </div>
              </div>
              <div className="sample-three">
                <div>
                  <Check />
                  <b>{T('值得验证', 'Worth testing')}</b>
                  <p>
                    {T(
                      '问题与产品用途能对应',
                      'A plausible problem–product fit',
                    )}
                  </p>
                </div>
                <div>
                  <CircleHelp />
                  <b>{T('还不能判断', 'Still unknown')}</b>
                  <p>
                    {T(
                      '支付意愿与服务成本',
                      'Willingness to pay and service cost',
                    )}
                  </p>
                </div>
                <div>
                  <Flag />
                  <b>{T('本轮动作', 'Next action')}</b>
                  <p>
                    {T('验证一个细分人群', 'Validate one customer segment')}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="perspectives">
              <div className="perspective-list">
                {(zh
                  ? [
                      ['市场视角', '用户问题是否足够重要？', '需访谈验证'],
                      ['渠道视角', '伙伴能否接触到目标用户？', '需核实触达'],
                      ['交付视角', '服务承诺能否真正履行？', '需测算约束'],
                    ]
                  : [
                      [
                        'Market lens',
                        'Is the problem important enough?',
                        'Interview needed',
                      ],
                      [
                        'Channel lens',
                        'Can partners reach the target users?',
                        'Reach unverified',
                      ],
                      [
                        'Delivery lens',
                        'Can the service promise be met?',
                        'Constraints uncosted',
                      ],
                    ]
                ).map(([a, b, c]) => (
                  <div key={a}>
                    <b>{a}</b>
                    <p>{b}</p>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
              <p className="sample-note">
                {T(
                  '视角来自方法化分析，不表示任何真实个人参与或背书。',
                  'Method-based perspectives do not imply any real individual’s participation or endorsement.',
                )}
              </p>
            </TabsContent>
            <TabsContent value="evidence">
              <div className="evidence-list">
                {(zh
                  ? [
                      ['企业事实', '产品用途说明', '待补原始资料'],
                      ['外部线索', '公开渠道信息', '待核验时效'],
                      ['AI 推断', '适配场景假设', '需要业务验证'],
                    ]
                  : [
                      [
                        'Business fact',
                        'Product-use description',
                        'Original material needed',
                      ],
                      [
                        'External signal',
                        'Public channel information',
                        'Freshness unverified',
                      ],
                      [
                        'AI inference',
                        'Use-case fit hypothesis',
                        'Business validation needed',
                      ],
                    ]
                ).map(([a, b, c]) => (
                  <div key={a}>
                    <span className="evidence-type">{a}</span>
                    <b>{b}</b>
                    <small>{c}</small>
                  </div>
                ))}
              </div>
              <p className="sample-note">
                {T(
                  '真实交付会附来源、时间与出处；此处没有虚构来源链接。',
                  'Real delivery includes sources, dates and locations. This sample contains no invented citations.',
                )}
              </p>
            </TabsContent>
            <TabsContent value="actions">
              <ol className="action-list">
                {(zh
                  ? [
                      '找目标用户核实问题、当前替代方案与付费意愿。',
                      '核对渠道触达、合作条件和服务要求。',
                      '用验证结果更新进入判断，决定继续、调整或等待。',
                    ]
                  : [
                      'Validate the problem, alternatives and willingness to pay with target users.',
                      'Verify channel reach, partner terms and service requirements.',
                      'Update the decision with findings: continue, change course or wait.',
                    ]
                ).map((a, i) => (
                  <li key={a}>
                    <span>0{i + 1}</span>
                    <p>{a}</p>
                  </li>
                ))}
              </ol>
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
      {id === 'prospecting' ? (
        <div className="sample-body">
          <h3>
            {T(
              '机会价值 × 证据确定性',
              'Opportunity value × Evidence confidence',
            )}
          </h3>
          <div className="sample-table-wrap">
            <table className="sample-table">
              <thead>
                <tr>
                  {(zh
                    ? ['候选', '业务潜力', '证据', '下一步']
                    : ['Prospect', 'Potential', 'Evidence', 'Next step']
                  ).map((v) => (
                    <th key={v}>{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(zh
                  ? [
                      ['候选 A', '明确场景', '已核对', '准备会前简报'],
                      ['候选 B', '高潜力', '待补证', '先核实需求'],
                      ['候选 C', '适配弱', '已核对', '暂不跟进'],
                    ]
                  : [
                      [
                        'Account A',
                        'Clear use case',
                        'Checked',
                        'Prepare a meeting brief',
                      ],
                      [
                        'Account B',
                        'High potential',
                        'Incomplete',
                        'Verify the need',
                      ],
                      ['Account C', 'Weak fit', 'Checked', 'Do not prioritize'],
                    ]
                ).map((row) => (
                  <tr key={row[0]}>
                    {row.map((v, i) => (
                      <td key={i}>
                        {i === 2 ? <span className="table-tag">{v}</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sample-callout">
            <Search />
            <p>
              {T(
                '销售切入：从已核实的业务场景出发，而不是“我们有一款很棒的产品”。',
                'Sales angle: lead with a verified business situation, not “we have a great product.”',
              )}
            </p>
          </div>
        </div>
      ) : null}
      {id === 'creator-partnerships' ? (
        <div className="sample-body">
          <h3>
            {T(
              '从内容证据，到合作提议',
              'From content evidence to a partnership pitch',
            )}
          </h3>
          <div className="sample-columns">
            <div className="evidence-card">
              <span className="eyebrow">CONTENT FIT</span>
              <h4>
                {T('近期内容里的真实切口', 'A relevant angle from recent work')}
              </h4>
              <p>
                {T(
                  '主题与产品使用场景相关；观众问题尚未得到完整回答。',
                  'A topic connects with the product’s use case; an audience question remains unanswered.',
                )}
              </p>
              <span className="table-tag">
                {T(
                  '正式使用前核对原内容',
                  'Verify original content before use',
                )}
              </span>
            </div>
            <div className="pitch-card">
              <MessageSquare />
              <small>{T('合作邮件结构', 'PITCH STRUCTURE')}</small>
              <ol>
                {(zh
                  ? [
                      '你已经在讨论什么',
                      '我们能补充怎样的体验',
                      '为什么对你的受众有用',
                      '一个低摩擦的下一步',
                    ]
                  : [
                      'What you are already exploring',
                      'The experience we could add',
                      'Why your audience would care',
                      'One low-friction next step',
                    ]
                ).map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ) : null}
      {id === 'content-production' ? (
        <div className="sample-body">
          <h3>
            {T(
              '同一份事实，不同的渠道表达',
              'One factual core. Different channel expressions.',
            )}
          </h3>
          <div className="content-core">
            <Layers3 />
            <div>
              <b>{T('产品知识母本', 'PRODUCT KNOWLEDGE CORE')}</b>
              <p>
                {T(
                  '已验证卖点 · 使用场景 · 品牌语气 · 表达边界',
                  'Substantiated benefits · Use cases · Brand voice · Boundaries',
                )}
              </p>
            </div>
          </div>
          <div className="sample-three content-outputs">
            {(zh
              ? [
                  ['落地页', '问题 → 方案 → 证据 → 行动'],
                  ['短视频', '冲突 → 演示 → 解释 → 下一步'],
                  ['邮件', '相关情境 → 可用价值 → 对话'],
                ]
              : [
                  ['Landing page', 'Problem → Solution → Proof → Action'],
                  ['Short video', 'Tension → Demo → Explanation → Next step'],
                  ['Email', 'Relevant context → Useful value → Conversation'],
                ]
            ).map(([a, b]) => (
              <div key={a}>
                <Sparkles />
                <b>{a}</b>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {id === 'frontline-support' ? (
        <div className="sample-body">
          <h3>
            {T(
              '咨询之后，留下可跟进的意向',
              'After the inquiry, retain the intent',
            )}
          </h3>
          <div className="conversation">
            <p className="bubble customer">
              {T(
                '我们有多个使用点，这个产品能不能适配？',
                'We have several locations. Would this product fit?',
              )}
            </p>
            <div className="bubble reply">
              <small>
                {T('建议回复 · 尚未发送', 'SUGGESTED REPLY · NOT SENT')}
              </small>
              <p>
                {T(
                  '需要先确认各点位的环境与使用量，再依据产品适用条件判断。方便介绍一个典型使用点吗？',
                  'We should first confirm the environment and usage at each location, then check the product’s fit criteria. Could you describe one typical location?',
                )}
              </p>
            </div>
          </div>
          <div className="handover">
            <span>{T('交给业务', 'HAND OVER')}</span>
            <b>{T('多点位需求', 'Multi-location need')}</b>
            <span>
              {T(
                '待问：环境 / 使用量 / 时间安排',
                'Ask: environment / usage / timing',
              )}
            </span>
          </div>
        </div>
      ) : null}
      {id === 'business-analysis' ? (
        <div className="sample-body">
          <h3>
            {T(
              '先统一事实，再讨论经营',
              'Align the facts before discussing performance',
            )}
          </h3>
          <div className="definition-flow">
            <span>{T('客户身份', 'Entity identity')}</span>
            <ArrowRight />
            <span>{T('数据粒度', 'Data grain')}</span>
            <ArrowRight />
            <span>{T('时间口径', 'Time window')}</span>
            <ArrowRight />
            <span>{T('业务结论', 'Business finding')}</span>
          </div>
          <div className="sample-table-wrap">
            <table className="sample-table">
              <thead>
                <tr>
                  <th>{T('原始字段', 'Source field')}</th>
                  <th>{T('正确理解', 'Meaning')}</th>
                  <th>{T('不能这样做', 'Avoid')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{T('订单金额', 'Order value')}</td>
                  <td>{T('按订单记录的业务量', 'Value recorded per order')}</td>
                  <td>
                    {T('当成已确认收入', 'Treating it as recognized revenue')}
                  </td>
                </tr>
                <tr>
                  <td>{T('累计回款', 'Cumulative collections')}</td>
                  <td>{T('某时点的累计快照', 'A cumulative snapshot')}</td>
                  <td>
                    {T('将各月快照直接相加', 'Summing monthly snapshots')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="sample-note">
            {T(
              '每个结论附口径、计算与取数依据；这里不展示虚构经营数字。',
              'Findings carry definitions, calculations and provenance. No invented business figures are shown here.',
            )}
          </p>
        </div>
      ) : null}
      {id === 'inventory-planning' ? (
        <div className="sample-body">
          <h3>
            {T(
              '不是一张建议单，而是一组有约束的选项',
              'Not just a recommendation. A set of constrained options.',
            )}
          </h3>
          <div className="planning-inputs">
            {(zh
              ? ['需求', '可用库存', '有效在途', '物料 / 产能']
              : [
                  'Demand',
                  'Usable stock',
                  'Valid inbound',
                  'Materials / Capacity',
                ]
            ).map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <div className="option-rows">
            <div>
              <span>A</span>
              <b>{T('优先保障紧急需求', 'Protect urgent demand')}</b>
              <p>
                {T(
                  '核对缺料、交期与插单影响',
                  'Check materials, deadlines and disruption',
                )}
              </p>
            </div>
            <div>
              <span>B</span>
              <b>
                {T('减少换线与库存积压', 'Reduce changeovers and excess stock')}
              </b>
              <p>
                {T(
                  '核对合并生产与服务风险',
                  'Check batching and service tradeoffs',
                )}
              </p>
            </div>
          </div>
          <div className="sample-callout">
            <Flag />
            <p>
              {T(
                '通过历史回测比较，不以无限产能或未经核实的库存为前提。',
                'Compare options through historical backtesting, without assuming unlimited capacity or unverified stock.',
              )}
            </p>
          </div>
        </div>
      ) : null}
      {id === 'market-intelligence' ? (
        <div className="sample-body">
          <h3>
            {T(
              '一张能决定是否跟进的机会卡',
              'An opportunity card that supports a next step',
            )}
          </h3>
          <div className="opportunity-card">
            <div>
              <span className="doc-number">OPPORTUNITY / SAMPLE</span>
              <span className="status-tag">
                {T('待核验', 'VERIFICATION NEEDED')}
              </span>
            </div>
            <h4>
              {T(
                '某目标市场的品类采购机会',
                'A category procurement opportunity in a target market',
              )}
            </h4>
            <dl>
              {(zh
                ? [
                    ['有效期', '核对原站时区与最新公告'],
                    ['资格要求', '核对产品、地区和参与条件'],
                    ['匹配理由', '逐项对应产品能力与交付范围'],
                    ['进入动作', '先补证，再决定是否投入'],
                  ]
                : [
                    ['Validity', 'Check the source timezone and latest notice'],
                    [
                      'Eligibility',
                      'Check product, location and participation criteria',
                    ],
                    [
                      'Fit rationale',
                      'Map requirements to product and delivery scope',
                    ],
                    [
                      'Next action',
                      'Verify first, then decide whether to invest',
                    ],
                  ]
              ).map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ) : null}
      {id === 'knowledge-capability' ? (
        <div className="sample-body">
          <h3>
            {T(
              '把“老师傅知道”变成“团队可以调用”',
              'From expert know-how to a callable team method',
            )}
          </h3>
          <div className="skill-manifest">
            <div className="manifest-header">
              <Layers3 />
              <b>enterprise-skill / sample</b>
              <span>v0.1</span>
            </div>
            <div className="manifest-grid">
              {(zh
                ? [
                    ['INPUT', '材料与适用条件'],
                    ['METHOD', '判断步骤与排除规则'],
                    ['OUTPUT', '产物结构与业务用途'],
                    ['CHECK', '新样本、反例与复核点'],
                    ['SOURCE', '来源、授权与工具依赖'],
                    ['OWNER', '版本与维护责任'],
                  ]
                : [
                    ['INPUT', 'Materials and fit conditions'],
                    ['METHOD', 'Judgment steps and exclusions'],
                    ['OUTPUT', 'Output contract and business use'],
                    ['CHECK', 'Fresh tests and counterexamples'],
                    ['SOURCE', 'Origins, licenses and dependencies'],
                    ['OWNER', 'Version and maintenance'],
                  ]
              ).map(([a, b]) => (
                <div key={a}>
                  <code>{a}</code>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className="artifact-bottom">
        <span>
          {T(
            '结构化判断 → 业务产出 → 可复用能力',
            'Structured judgment → Business output → Reusable capability',
          )}
        </span>
        <span>FDE ↗</span>
      </div>
    </div>
  );
}
