import type { Lang } from './site';

type Copy<T = string> = Record<Lang, T>;
const t = (zh: string, en: string): Copy => ({ zh, en });
const a = (zh: string[], en: string[]): Copy<string[]> => ({ zh, en });

export type MoreScenarioCategory =
  | 'customer-operations'
  | 'finance-risk'
  | 'supply-chain'
  | 'manufacturing';

export type MoreScenarioBasis = 'project-pattern' | 'enterprise-skill';

export interface MoreScenario {
  id: string;
  number: string;
  category: MoreScenarioCategory;
  basis: MoreScenarioBasis;
  title: Copy;
  question: Copy;
  outputs: Copy<string[]>;
}

export const moreScenarioCategories: Record<MoreScenarioCategory, Copy> = {
  'customer-operations': t('增长与客户运营', 'Growth & customer operations'),
  'finance-risk': t('财务、采购与风险', 'Finance, procurement & risk'),
  'supply-chain': t('供应链与履约', 'Supply chain & fulfillment'),
  manufacturing: t('制造与质量', 'Manufacturing & quality'),
};

export const moreScenarioBasis: Record<MoreScenarioBasis, Copy> = {
  'project-pattern': t(
    '来自匿名化项目模式',
    'From an anonymized project pattern',
  ),
  'enterprise-skill': t('企业 Skill 可适配', 'Adaptable enterprise Skill'),
};

export const moreScenarios: MoreScenario[] = [
  {
    id: 'commerce-daily-operations',
    number: '10',
    category: 'customer-operations',
    basis: 'project-pattern',
    title: t('电商经营日报与动作建议', 'Daily commerce operations & actions'),
    question: t(
      'GMV、投放、退货和库存每天都在变，谁把异常变成今天该做的动作？',
      'GMV, media spend, returns and stock move every day. Who turns the exceptions into today’s actions?',
    ),
    outputs: a(
      ['经营日报', '异常雷达', '商品与渠道动作清单'],
      ['Operating brief', 'Exception radar', 'Product and channel actions'],
    ),
  },
  {
    id: 'voice-of-customer-diagnosis',
    number: '11',
    category: 'customer-operations',
    basis: 'project-pattern',
    title: t('销量 × 客诉根因诊断', 'Sales × voice-of-customer diagnosis'),
    question: t(
      '销量下滑来自流量、转化还是产品问题？客诉究竟能证明哪一段？',
      'Is a sales decline driven by traffic, conversion or the product—and which part can customer feedback actually support?',
    ),
    outputs: a(
      ['漏斗归因图', 'VOC 变化信号', '改进优先级'],
      ['Funnel attribution', 'VOC movement signals', 'Improvement priorities'],
    ),
  },
  {
    id: 'support-learning-loop',
    number: '12',
    category: 'customer-operations',
    basis: 'project-pattern',
    title: t('客服知识库持续学习', 'Continuously learning support knowledge'),
    question: t(
      '客服回答如何引用可信知识，又把不会的问题和人工纠错持续沉淀？',
      'How can support cite trusted knowledge while turning unknown questions and human corrections into better coverage?',
    ),
    outputs: a(
      ['带来源的回复建议', '未知问题队列', 'FAQ 增补单'],
      [
        'Source-backed reply suggestions',
        'Unknown-question queue',
        'FAQ update brief',
      ],
    ),
  },
  {
    id: 'revenue-billing-truth',
    number: '13',
    category: 'customer-operations',
    basis: 'enterprise-skill',
    title: t('收入与账单事实核对', 'Revenue & billing truth'),
    question: t(
      '退款、重复扣费、套餐与销售口径冲突时，团队依据哪份事实做决定？',
      'When refunds, duplicate charges, plans and sales language conflict, what source of truth should the team use?',
    ),
    outputs: a(
      ['收入状态快照', '异常分类', '修复与跟进建议'],
      [
        'Revenue-state snapshot',
        'Incident classification',
        'Remediation and follow-up',
      ],
    ),
  },
  {
    id: 'evidence-led-risk-review',
    number: '14',
    category: 'finance-risk',
    basis: 'project-pattern',
    title: t(
      '多源风险调查与证据链',
      'Multi-source risk review & evidence chain',
    ),
    question: t(
      '多源信号相互矛盾时，如何把风险判断变成别人能够复核的证据链？',
      'When signals conflict across sources, how do you turn a risk judgment into evidence another person can audit?',
    ),
    outputs: a(
      ['红旗矩阵', '可复核证据链', '分级判断'],
      ['Red-flag matrix', 'Auditable evidence chain', 'Tiered risk judgment'],
    ),
  },
  {
    id: 'energy-procurement-portfolio',
    number: '15',
    category: 'finance-risk',
    basis: 'enterprise-skill',
    title: t(
      '多站点能源采购与用能成本',
      'Multi-site energy procurement & cost',
    ),
    question: t(
      '固定价、指数价、峰值需量与绿电目标互相牵制时，怎样选择合同组合？',
      'When fixed prices, index exposure, peak demand and renewable targets pull in different directions, what contract mix makes sense?',
    ),
    outputs: a(
      ['负荷与费率画像', '供应商报价对比', '合同组合与预算风险'],
      [
        'Load and tariff profile',
        'Supplier bid comparison',
        'Contract mix and budget risk',
      ],
    ),
  },
  {
    id: 'trade-compliance-preflight',
    number: '16',
    category: 'finance-risk',
    basis: 'enterprise-skill',
    title: t('跨境贸易合规预检', 'Cross-border trade preflight'),
    question: t(
      '发货前，商品归类、原产地、交易方与单证还有哪些缺口？',
      'Before goods move, what gaps remain in classification, origin, party screening and documentation?',
    ),
    outputs: a(
      ['单证缺口清单', '分类与来源依据', '放行或升级建议'],
      [
        'Document gap list',
        'Classification rationale',
        'Release or escalation guidance',
      ],
    ),
  },
  {
    id: 'logistics-exception-desk',
    number: '17',
    category: 'supply-chain',
    basis: 'enterprise-skill',
    title: t('物流异常处置台', 'Logistics exception desk'),
    question: t(
      '延误、破损、短少与丢失同时发生时，先处理什么，需要留下哪些证据？',
      'When delays, damage, shortages and losses collide, what comes first and what evidence must be preserved?',
    ),
    outputs: a(
      ['异常分级', '处置路线', '索赔证据包'],
      ['Exception severity', 'Resolution route', 'Claims evidence pack'],
    ),
  },
  {
    id: 'returns-recovery',
    number: '18',
    category: 'supply-chain',
    basis: 'enterprise-skill',
    title: t('退货与逆向物流回收', 'Returns & reverse-logistics recovery'),
    question: t(
      '一件退货该补货、翻新、清算还是退供应商，怎样兼顾体验与毛利？',
      'Should a return be restocked, refurbished, liquidated or sent to the vendor—and how do you balance experience with margin?',
    ),
    outputs: a(
      ['RMA 判断', '成色与风险分级', '处置经济性'],
      ['RMA decision', 'Condition and risk grade', 'Disposition economics'],
    ),
  },
  {
    id: 'carrier-portfolio',
    number: '19',
    category: 'supply-chain',
    basis: 'enterprise-skill',
    title: t('承运商组合与运力策略', 'Carrier portfolio & capacity strategy'),
    question: t(
      '最低报价并不等于最低风险，运量该怎样在成本、服务与运力之间分配？',
      'The lowest rate is not the lowest risk. How should volume be allocated across cost, service and capacity?',
    ),
    outputs: a(
      ['承运商评分卡', '线路分配方案', '谈判简报'],
      ['Carrier scorecard', 'Lane allocation scenarios', 'Negotiation brief'],
    ),
  },
  {
    id: 'production-rescheduling',
    number: '20',
    category: 'manufacturing',
    basis: 'enterprise-skill',
    title: t(
      '生产排程与中断重排',
      'Production scheduling & disruption response',
    ),
    question: t(
      '插单、缺料或设备停机时，怎样重排而不让整个计划每天推倒重来？',
      'When rush orders, shortages or downtime hit, how do you reschedule without rebuilding the whole plan every day?',
    ),
    outputs: a(
      ['瓶颈地图', '可执行重排计划', '交期影响说明'],
      [
        'Constraint map',
        'Executable revised schedule',
        'Delivery-impact brief',
      ],
    ),
  },
  {
    id: 'quality-nonconformance',
    number: '21',
    category: 'manufacturing',
    basis: 'enterprise-skill',
    title: t('质量异常与纠正闭环', 'Quality non-conformance & corrective loop'),
    question: t(
      '发现质量异常后，如何先止损，再把根因、纠正动作和有效性证据闭环？',
      'After a quality issue is found, how do you contain it and close the loop on root cause, corrective action and effectiveness?',
    ),
    outputs: a(
      ['NCR 摘要', '根因树', 'CAPA 与效果记录'],
      ['NCR summary', 'Root-cause tree', 'CAPA and effectiveness record'],
    ),
  },
];
