import { localPath, type Lang } from '@/lib/site';

export function Brand({ lang }: { lang: Lang }) {
  return (
    <a
      className="brand"
      href={localPath(lang)}
      aria-label={lang === 'zh' ? 'AIelsen FDE 首页' : 'AIelsen FDE home'}
    >
      <span className="brand-identity" aria-hidden="true">
        <span className="brand-mark" />
        AIelsen
      </span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-service" aria-hidden="true">
        FDE<span className="brand-arrow">↗</span>
      </span>
    </a>
  );
}
