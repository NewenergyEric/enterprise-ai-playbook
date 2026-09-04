import type { Metadata } from 'next';
import { localPath, type Lang, type View } from './site';
const siteURL = process.env.SITE_URL?.replace(/\/$/, '');
if (siteURL && !/^https?:\/\//.test(siteURL))
  throw new Error('SITE_URL must be an absolute HTTP(S) URL.');
const titles = {
  home: {
    zh: '让专业判断，成为企业能力',
    en: 'Turn expertise into business capability',
  },
  process: {
    zh: 'FDE 交付流程 · 从真实问题到持续能力',
    en: 'The FDE process · From real work to lasting capability',
  },
  playbook: {
    zh: '企业 Playbook · 9 个业务切入点',
    en: 'Enterprise Playbook · 9 business starting points',
  },
};
const descriptions = {
  home: {
    zh: '把市场洞察、岗位经验与专业方法，转化为可用的业务产出、企业 Skill 与岗位 Agent。',
    en: 'Turn market insight, frontline know-how and professional methods into useful outputs, enterprise Skills and role Agents.',
  },
  process: {
    zh: '看清真实工作，沉淀专业方法，组装工作链，用同一批任务验证价值，留下可复用的能力。',
    en: 'Understand real work, capture methods, assemble workflows and evaluate on comparable tasks. Leave your team with reusable capability.',
  },
  playbook: {
    zh: '探索市场进入、客户开发、红人合作、内容生产、销售支持、经营分析、库存计划、情报与知识沉淀的具体打法。',
    en: 'Explore market entry, prospecting, creators, content, frontline support, analysis, planning, intelligence and knowledge capability.',
  },
};
export function pageMetadata(lang: Lang, view: View): Metadata {
  const title = titles[view][lang] + ' · FDE';
  const description = descriptions[view][lang];
  const path = localPath(lang, view);
  return {
    title,
    description,
    icons: { icon: '/favicon.svg' },
    robots: { index: true, follow: true },
    ...(siteURL
      ? {
          metadataBase: new URL(siteURL),
          alternates: {
            canonical: siteURL + path,
            languages: {
              'zh-CN': siteURL + localPath('zh', view),
              en: siteURL + localPath('en', view),
              'x-default': siteURL + localPath('zh', view),
            },
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: [lang === 'zh' ? 'en_US' : 'zh_CN'],
      siteName: 'FDE / Business Capability',
      ...(siteURL
        ? {
            url: siteURL + path,
            images: [
              {
                url: siteURL + '/og.png',
                width: 1672,
                height: 941,
                alt: 'Expertise. Engineered. — FDE Business Capability',
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(siteURL ? { images: [siteURL + '/og.png'] } : {}),
    },
  };
}
