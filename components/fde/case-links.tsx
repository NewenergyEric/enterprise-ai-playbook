import { ArrowUpRight } from 'lucide-react';
import { agentCasesPath, relatedAgentCases } from '@/lib/agent-cases';
import type { Lang } from '@/lib/site';

export function PlayCaseLinks({
  lang,
  playId,
}: {
  lang: Lang;
  playId: string;
}) {
  const links = relatedAgentCases[playId];
  if (!links?.length) return null;
  const zh = lang === 'zh';
  return (
    <aside
      className="case-related"
      aria-label={zh ? '相关 Agent 实战案例' : 'Related Agent cases'}
    >
      <div>
        <span className="eyebrow">AGENTS IN THE FIELD</span>
        <h3>
          {zh ? '看同类工作怎样交付' : 'See how related work was delivered'}
        </h3>
      </div>
      <ul>
        {links.map((item) => (
          <li key={item.slug}>
            <a
              href={agentCasesPath(lang, item.slug)}
              hrefLang={zh ? 'zh-CN' : 'en'}
            >
              <span>{item[lang]}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
