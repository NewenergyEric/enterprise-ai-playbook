import type { Lang } from './site';

// Separate destination, shared origin. Never route these through the service app.
export function academyPath(lang: Lang, page = '') {
  return `/academy/${lang}/${page ? page.replace(/^\/+|\/+$/g, '') + '/' : ''}`;
}

export const stageLearning = [
  {
    week: '01',
    zh: 'FDE 职责与项目判断',
    en: 'FDE role and project qualification',
  },
  {
    week: '02',
    zh: '现场访谈与业务建模',
    en: 'Discovery and business modeling',
  },
  {
    week: '05',
    zh: '业务本体与建议型 Agent',
    en: 'Ontology and advisory agents',
  },
  {
    week: '08',
    zh: '执行型 Agent 与业务闭环',
    en: 'Action agents and operational integration',
  },
  {
    week: '07',
    zh: 'Agent 评估与需求变更',
    en: 'Agent evaluation and scope change',
  },
  {
    week: '11',
    zh: '交付复盘与产品化沉淀',
    en: 'Retrospective and product feedback',
  },
];

// A related teaching exercise, not a claim that a client project is public.
export const playLearning: Record<
  string,
  { case: string; week: string; zh: string; en: string }
> = {
  'market-entry': {
    case: 'expert-research',
    week: '02',
    zh: '市场进入：证据与反方论证',
    en: 'Market entry: evidence and counterarguments',
  },
  prospecting: {
    case: 'account-research',
    week: '02',
    zh: '销售研究：客户判断与会前简报',
    en: 'Account research and meeting briefs',
  },
  'creator-partnerships': {
    case: 'market-intelligence',
    week: '07',
    zh: '合作筛选：把判断写成可核验的依据',
    en: 'Partner selection: make the evidence inspectable',
  },
  'content-production': {
    case: 'enterprise-skills',
    week: '11',
    zh: '内容复用：把工作方法沉淀为 Skill',
    en: 'Content reuse: turn practice into a skill',
  },
  'frontline-support': {
    case: 'store-operations',
    week: '08',
    zh: '业务交接：从问询到结果回写',
    en: 'Operational handoffs: from inquiry to outcome',
  },
  'business-analysis': {
    case: 'business-review',
    week: '10',
    zh: '经营分析：指标、归因与验收',
    en: 'Business analysis: metrics, attribution and acceptance',
  },
  'inventory-planning': {
    case: 'enterprise-skills',
    week: '04',
    zh: '补货异常：数据适配与失败测试',
    en: 'Replenishment exceptions: adapters and failure tests',
  },
  'market-intelligence': {
    case: 'market-intelligence',
    week: '05',
    zh: '竞品研究：从参数到可验证卖点',
    en: 'Competitive research: from specs to testable claims',
  },
  'knowledge-capability': {
    case: 'manual-service',
    week: '05',
    zh: '知识服务：型号、版本与页码证据',
    en: 'Knowledge service: models, versions and citations',
  },
};
