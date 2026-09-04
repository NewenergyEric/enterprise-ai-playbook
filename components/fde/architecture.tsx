import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Layers3,
  Bot,
  Compass,
} from 'lucide-react';
import type { Lang } from '@/lib/site';
export function Architecture({ lang }: { lang: Lang }) {
  const zh = lang === 'zh';
  const layers = zh
    ? [
        [
          '标准产品与运行底座',
          '连接已有系统，提供知识、工具与运行环境。',
          '连接器 / 知识工作区 / 运行与可观测能力',
        ],
        [
          '企业 Skill',
          '把专业经验封装成有输入、有判断、有产出的工作方法。',
          '方法 / 模板 / 来源 / 反例 / 测试',
        ],
        [
          '岗位 Agent',
          '围绕一个岗位或任务，持续组织上下文并调用方法与工具。',
          '目标 / 业务上下文 / Skill 组合 / 工作入口',
        ],
        [
          'FDE 交付与演进',
          '深入实际工作，适配方法、完成工程、验证价值并留下能力。',
          '现场拆解 / 共建适配 / 真实验证 / 维护交接',
        ],
      ]
    : [
        [
          'Products & runtime',
          'Connect existing systems with knowledge, tools and a working environment.',
          'Connectors / Knowledge workspace / Runtime and observability',
        ],
        [
          'Enterprise Skills',
          'Package expertise as methods with clear inputs, judgment and outputs.',
          'Methods / Templates / Sources / Counterexamples / Tests',
        ],
        [
          'Role Agents',
          'Organize context, methods and tools around a role or recurring task.',
          'Goals / Business context / Skill combinations / Work entry points',
        ],
        [
          'FDE delivery & evolution',
          'Understand the work, adapt methods, engineer the workflow and test value.',
          'Fieldwork / Co-building / Real-task evaluation / Handover',
        ],
      ];
  return (
    <section className="architecture-section wrap" id="architecture">
      <div className="architecture-copy">
        <p className="eyebrow">03 / A MODULAR SERVICE MODEL</p>
        <h2>
          {zh ? (
            <>
              每一次交付，
              <br />
              都不必从零开始。
            </>
          ) : (
            <>
              Not every engagement
              <br />
              should start from zero.
            </>
          )}
        </h2>
        <p>
          {zh
            ? '通用能力做成产品，专业方法做成 Skill，连续工作交给 Agent。FDE 把它们带进企业的真实任务，再把有效经验带回能力库。'
            : 'Productize shared capabilities. Package methods as Skills. Give recurring work to Agents. FDE brings these pieces into real tasks, then feeds useful learning back into the capability library.'}
        </p>
        <div className="architecture-loop">
          <span>{zh ? '现场工作' : 'FIELDWORK'}</span>
          <ArrowRight />
          <span>{zh ? '能力资产' : 'CAPABILITY'}</span>
          <ArrowRight />
          <span>{zh ? '下一次复用' : 'REUSE'}</span>
        </div>
        <p className="boundary-note">
          {zh
            ? '服务架构示意。具体模块的可用性、适配范围与商业边界按项目确认，不代表所有能力均为现成标准产品。'
            : 'A proposed service architecture. Availability, adaptation and commercial scope are confirmed per engagement; not every module is an off-the-shelf product.'}
        </p>
      </div>
      <div className="layer-stack">
        {layers.map(([title, description, parts], i) => {
          const Icon = [Boxes, Layers3, Bot, Compass][i];
          return (
            <article key={title} className={'layer layer-' + i}>
              <div className="layer-top">
                <span className="number">L0{i + 1}</span>
                <Icon />
                <h3>{title}</h3>
                <ArrowUpRight className="layer-arrow" />
              </div>
              <p>{description}</p>
              <small>{parts}</small>
            </article>
          );
        })}
      </div>
    </section>
  );
}
