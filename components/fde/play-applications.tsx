'use client';

import { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { moreScenarioBasis, type MoreScenario } from '@/lib/more-scenarios';
import type { Lang } from '@/lib/site';

export function PlayApplications({
  applications,
  lang,
  playNumber,
  total,
  filtered,
}: {
  applications: MoreScenario[];
  lang: Lang;
  playNumber: string;
  total: number;
  filtered: boolean;
}) {
  const zh = lang === 'zh';
  const [expanded, setExpanded] = useState<string | null>(
    applications[0]?.id ?? null,
  );

  return (
    <div className="detail-tab-body play-applications" data-play-applications>
      <header className="applications-heading">
        <div>
          <p className="eyebrow">MORE / PLAY {playNumber}</p>
          <h3>
            {zh ? '从这些具体工作开始。' : 'Start with the work at hand.'}
          </h3>
          <p>
            {zh
              ? '展开一项，看业务输入、专业方法与团队能拿到的产物。'
              : 'Open an application to see the inputs, method and useful outputs.'}
          </p>
        </div>
        <span className="applications-count">
          {filtered ? `${applications.length} / ${total}` : total}
          <small>
            {zh
              ? filtered
                ? '匹配应用'
                : '更多应用'
              : filtered
                ? 'matches'
                : 'applications'}
          </small>
        </span>
      </header>
      <div className="application-list">
        {applications.map((item, index) => {
          const open = expanded === item.id;
          const panelId = `application-${item.id}`;
          return (
            <section
              className="application-item"
              data-expanded={open}
              data-application-id={item.id}
              key={item.id}
            >
              <h4>
                <button
                  type="button"
                  className="application-trigger"
                  id={`${panelId}-trigger`}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setExpanded(open ? null : item.id)}
                >
                  <span className="application-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="application-title">{item.title[lang]}</span>
                  {open ? (
                    <Minus aria-hidden="true" />
                  ) : (
                    <Plus aria-hidden="true" />
                  )}
                </button>
              </h4>
              <p className="application-question">{item.question[lang]}</p>
              <div
                id={panelId}
                hidden={!open}
                aria-labelledby={`${panelId}-trigger`}
                className="application-panel"
              >
                <div className="application-route" aria-hidden="true">
                  <span>{zh ? '业务输入' : 'INPUTS'}</span>
                  <ArrowRight />
                  <span>{zh ? '专业方法' : 'METHOD'}</span>
                  <ArrowRight />
                  <span>{zh ? '可用产物' : 'OUTPUTS'}</span>
                </div>
                <dl className="application-workflow">
                  <div>
                    <dt>{zh ? '从什么开始' : 'Start with'}</dt>
                    <dd>{item.inputs[lang]}</dd>
                  </div>
                  <div>
                    <dt>{zh ? '我们怎样做' : 'How we approach it'}</dt>
                    <dd>{item.method[lang]}</dd>
                  </div>
                </dl>
                <div className="application-outputs">
                  <p>{zh ? '团队拿到什么' : 'What the team receives'}</p>
                  <ul>
                    {item.outputs[lang].map((output) => (
                      <li key={output}>{output}</li>
                    ))}
                  </ul>
                </div>
                <p className="application-basis">
                  {moreScenarioBasis[item.basis][lang]}
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
