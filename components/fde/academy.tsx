import Image from 'next/image';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { academyPath, playLearning } from '@/lib/academy';
import type { Lang } from '@/lib/site';

export function AcademyTeaser({ lang }: { lang: Lang }) {
  const zh = lang === 'zh';
  return (
    <section
      className="academy-section wrap"
      id="academy"
      aria-labelledby="academy-title"
    >
      <div className="academy-copy">
        <p className="eyebrow">AIELSEN / FDE ACADEMY</p>
        <h2 id="academy-title">
          {zh ? (
            <>
              系统学习
              <br />
              企业 AI 交付。
            </>
          ) : (
            <>
              Learn the craft of
              <br />
              enterprise AI delivery.
            </>
          )}
        </h2>
        <p>
          {zh
            ? '面向 FDE 工程师、解决方案架构师与交付团队。从业务建模、数据适配到 Agent 工程、上线与验收，结合详细讲义、教学画板与工程实训，完成一套可检查的交付成果。'
            : 'For FDEs, solution architects and delivery teams. Work through business modeling, data adaptation, agent engineering, launch and acceptance—with lessons, visual boards and hands-on exercises.'}
        </p>
        <dl className="academy-facts">
          <div>
            <dt>12</dt>
            <dd>{zh ? '周课程体系' : 'weekly modules'}</dd>
          </div>
          <div>
            <dt>24</dt>
            <dd>{zh ? '张教学画板' : 'visual boards'}</dd>
          </div>
          <div>
            <dt>19</dt>
            <dd>{zh ? '个案例与实作' : 'cases & exercises'}</dd>
          </div>
        </dl>
        <div className="academy-actions">
          <a className="button-link primary" href={academyPath(lang)}>
            {zh ? '进入 FDE 学院' : 'Explore the Academy'}
            <ArrowRight />
          </a>
          <a className="text-link" href={academyPath(lang, 'curriculum')}>
            {zh ? '查看课程大纲' : 'View the curriculum'}
            <ArrowUpRight />
          </a>
        </div>
        <small>
          {zh
            ? '课程开放阅读 · 练习使用合成数据 · 企业共训可单独规划'
            : 'Open-access materials · Synthetic exercises · Team learning available'}
          {!zh && ' · Expanded lecture notes are currently in Chinese.'}
        </small>
      </div>
      <a
        className="academy-visual"
        href={academyPath(lang, 'resources') + '#visual-atlas'}
        aria-label={
          zh ? '浏览 24 张 FDE 教学画板' : 'Browse the 24 FDE visual boards'
        }
      >
        <div className="academy-visual-top">
          <span>THE DELIVERY WORKBENCH</span>
          <span>W01 → W12</span>
        </div>
        <Image
          src="/academy/assets/illustrations/phase-2.svg"
          alt={
            zh
              ? '连接数据、业务语义与 Agent 工程的课程插画'
              : 'Course illustration connecting data, business semantics and agent engineering'
          }
          width={800}
          height={480}
        />
        <div className="academy-board-preview">
          <Image
            src={`/academy/assets/boards/${lang}/ontology.svg`}
            alt={
              zh ? '业务本体教学画板缩略图' : 'Ontology teaching-board preview'
            }
            width={960}
            height={540}
          />
          <div>
            <BookOpen />
            <strong>
              {zh
                ? '看懂结构，再进入实作'
                : 'See the structure. Practice the work.'}
            </strong>
            <span>
              {zh ? '浏览画板与课程资料' : 'Browse visual boards and materials'}{' '}
              ↗
            </span>
          </div>
        </div>
      </a>
    </section>
  );
}

export function PlayLearningLink({
  lang,
  playId,
}: {
  lang: Lang;
  playId: string;
}) {
  const item = playLearning[playId];
  if (!item) return null;
  const zh = lang === 'zh';
  return (
    <aside
      className="academy-related"
      aria-label={zh ? '相关 FDE 实训' : 'Related FDE learning'}
    >
      <BookOpen />
      <div>
        <span className="eyebrow">
          {zh ? 'FDE 学院 / 相关实训' : 'FDE ACADEMY / RELATED PRACTICE'}
        </span>
        <p>{item[lang]}</p>
        <div className="academy-related-links">
          <a href={academyPath(lang, 'cases/field-' + item.case)}>
            {zh ? '查看练习与验收要求' : 'Exercise & acceptance criteria'} ↗
          </a>
          <a href={academyPath(lang, 'curriculum/' + item.week)}>
            {zh ? '对应工程课程' : 'Related engineering module'} · W{item.week}{' '}
            ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
