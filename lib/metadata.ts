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
    zh: '企业 Playbook · 详细打法与更多业务场景',
    en: 'Enterprise Playbook · Detailed plays and more opportunities',
  },
  toolkit: {
    zh: 'FDE 工具箱 · 申请私有访问',
    en: 'FDE Toolkit · Request private access',
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
    zh: '探索市场进入、客户开发、红人合作、内容、一线服务、经营分析、供应链、情报与知识复用，在各场景的 More 中查看具体应用、专业方法和交付产物。',
    en: 'Explore practical applications within nine business plays, from market entry and sales to operations and knowledge reuse. Each More tab connects real work to methods and useful outputs.',
  },
  toolkit: {
    zh: '申请 AIelsen FDE 工具箱的私有预览或购买咨询。工具包不公开下载，访问范围、版本与支付方式在审核后单独确认。',
    en: 'Request a private preview or purchase conversation for the AIelsen FDE Toolkit. The toolkit is not publicly downloadable; access, version and payment details are confirmed after review.',
  },
};
export function pageMetadata(lang: Lang, view: View): Metadata {
  const title = titles[view][lang] + ' · AIelsen FDE';
  const description = descriptions[view][lang];
  const path = localPath(lang, view);
  return {
    title,
    description,
    icons: { icon: '/favicon.svg?v=aielsen' },
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
      siteName: 'AIelsen FDE / Business Capability',
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
