import { ArrowUpRight, Workflow, BookOpen } from 'lucide-react';
import type { Lang } from '@/lib/site';

const repository = 'https://github.com/NewenergyEric/AIelsen-FDE-Toolkit';

export function ToolkitTeaser({ lang }: { lang: Lang }) {
  const zh = lang === 'zh';
  const readme = repository + (zh ? '' : '/blob/main/README.en.md');
  return (
    <section className="toolkit-section wrap" id="toolkit" aria-labelledby="toolkit-title">
      <div>
        <p className="eyebrow">AIELSEN / FDE TOOLKIT</p>
        <h2 id="toolkit-title">
          {zh ? <>把一段真实工作，<br />交给一组专业能力。</> : 'Put a complete workflow in capable hands.'}
        </h2>
        <p>
          {zh
            ? '从产品研究、FAB 与创作者合作，到工程契约、关键决策与操作交接。把已经加工的 Skill 按业务任务组合，配上输入、示例产出和验收条件，让下一位同事或 Agent 可以接着做。'
            : 'Connect product research, FAB and creator partnerships with capability contracts, engineering decisions and operational handoff. Adapted skills come with inputs, worked examples and acceptance conditions.'}
        </p>
        <dl className="academy-facts">
          <div><dt>539</dt><dd>{zh ? '条加工目录记录' : 'adapted catalog records'}</dd></div>
          <div><dt>8</dt><dd>{zh ? '个首批能力包' : 'starter skill bundles'}</dd></div>
          <div><dt>2</dt><dd>{zh ? '条完整示例流程' : 'worked workflow recipes'}</dd></div>
        </dl>
        <a className="button-link primary" href={readme} target="_blank" rel="noopener noreferrer">
          {zh ? '查看工具包仓库' : 'Open the toolkit repository'}<ArrowUpRight />
        </a>
        <small className="toolkit-access">
          {zh
            ? '私有协作预览 · GitHub 内容需访问权限 · 目录数量不等于全部实测可用'
            : 'Private collaboration preview · GitHub access required · Catalog count is not a tested-package count'}
        </small>
      </div>
      <div className="toolkit-workflows">
        <article>
          <Workflow aria-hidden="true" />
          <p className="eyebrow">01 / {zh ? '产品与营销' : 'PRODUCT & MARKETING'}</p>
          <h3>{zh ? '从产品资料，到一封有理由的合作邀约。' : 'From product facts to a relevant collaboration pitch.'}</h3>
          <ol aria-label={zh ? '营销工作路径' : 'Marketing workflow'}>
            {(zh ? ['客群与证据', 'FAB 与内容', '创作者筛选', '邀约与回复交接'] : ['Audience & evidence', 'FAB & campaign', 'Creator fit', 'Pitch & reply handoff']).map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p>{zh ? '每一段判断带着依据进入下一份产物；写完草稿，不等于已经发信或达成合作。' : 'Carry the evidence into each artifact. A completed draft is not a sent message or a partnership agreement.'}</p>
        </article>
        <article>
          <BookOpen aria-hidden="true" />
          <p className="eyebrow">02 / {zh ? '工程与交接' : 'ENGINEERING & HANDOFF'}</p>
          <h3>{zh ? '从业务需求，到下一位工程师接得住的交付。' : 'From a requirement to work the next engineer can continue.'}</h3>
          <ol aria-label={zh ? '工程工作路径' : 'Engineering workflow'}>
            {(zh ? ['能力契约', '状态与接口', '关键取舍', '异常与操作交接'] : ['Capability contract', 'States & interfaces', 'Key trade-offs', 'Exceptions & handoff']).map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p>{zh ? '明确必须成立的规则、尚未解决的问题，以及失败时该由谁处理。' : 'Make required invariants, unresolved decisions and failure ownership explicit.'}</p>
        </article>
      </div>
    </section>
  );
}
