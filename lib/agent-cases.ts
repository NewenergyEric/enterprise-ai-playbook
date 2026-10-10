import type { Lang } from './site';

export const agentCaseSlugs = [
  'bella',
  'velia',
  'oliva',
  'steve',
  'atlas',
  'nora',
  'leo',
  'iris',
  'ruby',
] as const;

export type AgentCaseSlug = (typeof agentCaseSlugs)[number];

export function agentCasesPath(lang: Lang, slug?: AgentCaseSlug) {
  return `/agent-cases/${lang === 'en' ? 'en/' : ''}${slug ? `cases/${slug}/` : ''}`;
}

export const relatedAgentCases: Record<
  string,
  readonly { slug: AgentCaseSlug; zh: string; en: string }[]
> = {
  'frontline-support': [
    {
      slug: 'oliva',
      zh: '客服怎样得到有依据的回复草稿',
      en: 'Evidence-backed drafts for customer support',
    },
  ],
  'creator-partnerships': [
    {
      slug: 'ruby',
      zh: '让家庭体感产品进入创作者的选题',
      en: 'Turn a family motion-gaming product into creator story ideas',
    },
  ],
  'content-production': [
    {
      slug: 'bella',
      zh: '从产品研究、FAB 到全案文案与 TVC',
      en: 'From product research and FAB to campaign copy and TVC',
    },
    {
      slug: 'velia',
      zh: '一份产品底稿怎样服务多个渠道',
      en: 'One product brief across marketing channels',
    },
  ],
  'business-analysis': [
    {
      slug: 'steve',
      zh: '广告分析工具的规则怎样核对与交接',
      en: 'Verify the rules behind an advertising analysis tool',
    },
  ],
};
