import type { Metadata } from 'next';
import { localPath, type Lang, type View } from './site';
const siteURL = process.env.SITE_URL?.replace(/\/$/, '');
if (siteURL && !/^https?:\/\//.test(siteURL))
  throw new Error('SITE_URL must be an absolute HTTP(S) URL.');
const titles = {
  home: {
    zh: '企业 AI 应用指南 · 工作流程与 FDE 学院',
    en: 'Enterprise AI Playbook · Workflows and FDE Academy',
  },
  process: {
    zh: '六步 FDE 工作流程 · 判断、验证与交接',
    en: 'Six-step FDE workflow · Decisions, validation and handoff',
  },
  playbook: {
    zh: '企业 AI Playbook · 9 类业务与 66 个应用场景',
    en: 'Enterprise AI Playbook · 9 plays and 66 application scenarios',
  },
  toolkit: {
    zh: 'FDE 工具箱 · 给 Agent 选工具，从一件工作开始',
    en: 'FDE Toolkit · Put your agent to work',
  },
};
const descriptions = {
  home: {
    zh: '从一项具体工作开始，学习企业如何使用 AI。六步工作流程、9 类业务应用、Agent 案例与 12 周 FDE 学院，连接业务判断、工程实训与证据评审。',
    en: 'Learn how enterprises use AI through six-step workflows, business scenarios and Agent cases. Follow a 12-week FDE Academy with hands-on practice and evidence reviews.',
  },
  process: {
    zh: '从选准业务问题到交接复用，沿六步工作流程明确输入、关键判断、责任人与验收证据，并进入对应的 FDE 学院课程与实训。',
    en: 'Follow six steps from choosing a business problem to reusable handoff. Define inputs, decisions, owners and acceptance evidence, with links to FDE Academy practice.',
  },
  playbook: {
    zh: '从 9 类业务、66 个应用场景中选择一项任务，核对输入、专业方法与交付产物，再进入课程和案例分析。场景用于学习与分析，不等于已验证客户案例。',
    en: 'Explore 9 business plays and 66 application scenarios: inputs, methods and deliverables linked to courses and case analysis. Scenarios are not validated customer deployments.',
  },
  toolkit: {
    zh: '从市场研究、内容营销、创作者合作或工程交接开始。留下邮箱，和 Eric 聊聊适合你的 Agent 工具与 Skills。',
    en: 'Start with research, marketing, creator partnerships or engineering handoff. Leave your email to discuss the right agent tools and Skills with Eric.',
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
      siteName: 'Enterprise AI Playbook / AIelsen FDE',
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
