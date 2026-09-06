'use client';
import { useState, useSyncExternalStore } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  X,
  Lightbulb,
  Target,
  PackageCheck,
  FileInput,
  Gauge,
  Info,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shell, CallToAction } from './shell';
import { Artifact } from './artifact';
import { PlayApplications } from './play-applications';
import { plays, categories, type Category } from '@/lib/content';
import { moreScenarios } from '@/lib/more-scenarios';
import { filterApplications, filterPlays } from '@/lib/playbook';
import { localPath, type Lang } from '@/lib/site';
import {
  subscribeFragment,
  getFragment,
  getServerFragment,
} from '@/lib/browser-fragment';

export function PlaybookPage({ lang }: { lang: Lang }) {
  const zh = lang === 'zh';
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const hash = useSyncExternalStore(
    subscribeFragment,
    getFragment,
    getServerFragment,
  );
  const visible = filterPlays(plays, lang, category, query, moreScenarios);
  const selected = visible.find((p) => p.id === hash) ?? visible[0];
  const applications = selected
    ? filterApplications(moreScenarios, lang, selected.id)
    : [];
  const matchingApplications = selected
    ? filterApplications(moreScenarios, lang, selected.id, query)
    : [];
  const showApplicationMatches =
    query.trim().length > 0 && matchingApplications.length > 0;
  const visibleApplicationCount = visible.reduce(
    (sum, play) =>
      sum + filterApplications(moreScenarios, lang, play.id, query).length,
    0,
  );
  // Only explicit filter actions may change the URL. An initial hydration
  // effect would overwrite a valid deep link with the server's default play.
  function updateFilters(nextCategory: Category | 'all', nextQuery: string) {
    const matches = filterPlays(
      plays,
      lang,
      nextCategory,
      nextQuery,
      moreScenarios,
    );
    const next = matches.find((p) => p.id === getFragment()) ?? matches[0];
    setCategory(nextCategory);
    setQuery(nextQuery);
    if (next && next.id !== getFragment()) {
      window.history.replaceState(null, '', '#' + next.id);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  }
  function selectPlay(id: string) {
    window.history.pushState(null, '', '#' + id);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    if (window.matchMedia('(max-width: 850px)').matches)
      requestAnimationFrame(() =>
        document.getElementById('play-details')?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
          block: 'start',
        }),
      );
  }
  return (
    <Shell lang={lang} view="playbook">
      <section className="playbook-heading wrap">
        <div>
          <p className="eyebrow">
            ENTERPRISE PLAYBOOK / {plays.length} PLAYS · {moreScenarios.length}{' '}
            MORE APPLICATIONS
          </p>
          <h1>
            {zh ? (
              <>
                找到你的<em>业务切入点。</em>
              </>
            ) : (
              <>
                Find your <em>starting point.</em>
              </>
            )}
          </h1>
          <p>
            {zh
              ? `从 9 个主场景找到业务方向，再在每个场景的 More 中探索 ${moreScenarios.length} 项具体应用：从市场判断、销售机会，到经营诊断与岗位知识。`
              : `Find your direction in nine core plays, then explore ${moreScenarios.length} practical applications inside their More tabs—from market decisions and sales opportunities to operating insight and role knowledge.`}
          </p>
        </div>
        <div className="playbook-heading-actions">
          <a className="text-link" href={localPath(lang, 'process')}>
            {zh ? '先看怎样交付' : 'See how delivery works'}
            <ArrowUpRight />
          </a>
        </div>
      </section>
      <section
        className="playbook-workspace wrap"
        aria-label={zh ? '可浏览的企业场景库' : 'Enterprise playbook explorer'}
      >
        <div className="playbook-tools">
          <div
            className="category-filter"
            aria-label={zh ? '按业务方向筛选' : 'Filter by business area'}
          >
            {(['all', ...Object.keys(categories)] as (Category | 'all')[]).map(
              (c) => (
                <Button
                  key={c}
                  variant="ghost"
                  className="category-button"
                  aria-pressed={category === c}
                  onClick={() => updateFilters(c, query)}
                >
                  {c === 'all'
                    ? zh
                      ? '全部场景'
                      : 'All plays'
                    : categories[c][lang]}
                </Button>
              ),
            )}
          </div>
          <div className="search-field">
            <Search />
            <Input
              aria-label={
                zh ? '搜索场景、方法或产出' : 'Search plays, methods or outputs'
              }
              placeholder={
                zh ? '搜索场景、方法、产出…' : 'Search plays, methods, outputs…'
              }
              value={query}
              onChange={(e) => updateFilters(category, e.target.value)}
            />
            {query ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateFilters(category, '')}
                aria-label={zh ? '清空搜索' : 'Clear search'}
              >
                <X />
              </Button>
            ) : null}
          </div>
        </div>
        <output className="results-summary" aria-live="polite">
          {zh
            ? `${visible.length} 个主场景 · ${visibleApplicationCount} 项${query.trim() ? '匹配' : '更多'}应用`
            : `${visible.length} core plays · ${visibleApplicationCount} ${query.trim() ? 'matching' : 'more'} applications`}
          <span>
            {zh
              ? '所有样张为合成示意；能力成熟度按场景标注。'
              : 'All samples are synthetic. The basis of each capability is stated.'}
          </span>
        </output>
        {selected ? (
          <div className="playbook-grid">
            <aside
              className="play-selector"
              aria-label={zh ? '选择场景' : 'Choose a play'}
            >
              {visible.map((p) => (
                <button
                  className="play-option"
                  key={p.id}
                  type="button"
                  aria-pressed={selected.id === p.id}
                  aria-controls="play-details"
                  onClick={() => selectPlay(p.id)}
                >
                  <span className="option-index">{p.number}</span>
                  <span>
                    <strong>{p.title[lang]}</strong>
                    <small>{p.promise[lang]}</small>
                    <span className="option-more">
                      More ·{' '}
                      {filterApplications(moreScenarios, lang, p.id).length}
                    </span>
                  </span>
                  <ArrowUpRight />
                </button>
              ))}
            </aside>
            <article
              className="play-detail"
              id="play-details"
              key={selected.id}
            >
              <div className="play-detail-heading">
                <div className="play-kicker">
                  <span>PLAY / {selected.number}</span>
                  <span>{categories[selected.category][lang]}</span>
                </div>
                <h2>{selected.title[lang]}</h2>
                <p className="play-promise">{selected.promise[lang]}</p>
                <div className="buyer-question">
                  <Lightbulb />
                  <p>{selected.question[lang]}</p>
                </div>
              </div>
              <div className="play-sample">
                <Artifact id={selected.id} lang={lang} />
              </div>
              <Tabs
                key={`${selected.id}:${query}`}
                defaultValue={showApplicationMatches ? 'more' : 'value'}
                className="detail-tabs"
              >
                <TabsList aria-label={zh ? '场景说明' : 'Play details'}>
                  {(zh
                    ? [
                        ['value', '业务价值'],
                        ['method', '怎么做'],
                        ['deliverables', '交付什么'],
                        ['evaluation', '如何验证'],
                      ]
                    : [
                        ['value', 'Value'],
                        ['method', 'Method'],
                        ['deliverables', 'Deliverables'],
                        ['evaluation', 'Evaluation'],
                      ]
                  ).map(([value, label]) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className={
                        !zh && ['deliverables', 'evaluation'].includes(value)
                          ? 'has-short-label'
                          : undefined
                      }
                    >
                      <span className="tab-label-full">{label}</span>
                      {!zh && ['deliverables', 'evaluation'].includes(value) ? (
                        <span className="tab-label-short">
                          {value === 'deliverables' ? 'Outputs' : 'Measures'}
                        </span>
                      ) : null}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger
                    value="more"
                    className={`more-tab${zh ? ' has-short-label' : ''}`}
                  >
                    <span className="tab-label-full">
                      {zh ? 'More · 更多' : 'More'}
                    </span>
                    {zh ? <span className="tab-label-short">更多</span> : null}
                    <span className="more-tab-count">
                      {applications.length}
                    </span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="value">
                  <div className="detail-tab-body">
                    <div className="detail-label">
                      <Target />
                      <h3>
                        {zh
                          ? '业务为什么需要它'
                          : 'Why it matters to the business'}
                      </h3>
                    </div>
                    <p className="detail-lead">{selected.value[lang]}</p>
                    <div className="method-summary">
                      <span>
                        {zh ? '方法的关键' : 'THE METHOD THAT MATTERS'}
                      </span>
                      <p>{selected.method[lang]}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="method">
                  <div className="detail-tab-body">
                    <h3>
                      {zh
                        ? '从输入，到可以使用的产出'
                        : 'From inputs to a useful output'}
                    </h3>
                    <ol className="method-steps">
                      {selected.steps[lang].map((step, i) => (
                        <li key={step}>
                          <span>0{i + 1}</span>
                          <p>{step}</p>
                          {i < 3 ? <ArrowRight /> : null}
                        </li>
                      ))}
                    </ol>
                    <p>{selected.method[lang]}</p>
                  </div>
                </TabsContent>
                <TabsContent value="deliverables">
                  <div className="detail-tab-body">
                    <div className="input-output-grid">
                      <div>
                        <div className="detail-label">
                          <FileInput />
                          <h3>
                            {zh ? '从这些材料开始' : 'Start with these inputs'}
                          </h3>
                        </div>
                        <p>{selected.inputs[lang]}</p>
                      </div>
                      <div>
                        <div className="detail-label">
                          <PackageCheck />
                          <h3>
                            {zh ? '团队拿到的产物' : 'What the team receives'}
                          </h3>
                        </div>
                        <ul className="check-list">
                          {selected.outputs[lang].map((output) => (
                            <li key={output}>{output}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="evaluation">
                  <div className="detail-tab-body">
                    <div className="detail-label">
                      <Gauge />
                      <h3>
                        {zh
                          ? '用同一批任务，检验真实价值'
                          : 'Evaluate real value on comparable tasks'}
                      </h3>
                    </div>
                    <div className="measure-grid">
                      {selected.measures[lang].map((m, i) => (
                        <div key={m}>
                          <span>0{i + 1}</span>
                          <b>{m}</b>
                        </div>
                      ))}
                    </div>
                    <p className="sample-note">
                      {zh
                        ? '先约定基线、样本与业务判断标准，再记录质量、完整耗时、返工、工具费用和实际采用。指标是验证方向，不是收益承诺。'
                        : 'Agree a baseline, samples and business criteria first. Track quality, total time, rework, tool costs and actual adoption. These are evaluation dimensions, not performance promises.'}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="more">
                  <PlayApplications
                    applications={
                      showApplicationMatches
                        ? matchingApplications
                        : applications
                    }
                    lang={lang}
                    playNumber={selected.number}
                    total={applications.length}
                    filtered={showApplicationMatches}
                  />
                </TabsContent>
              </Tabs>
              <div className="judgment-note">
                <Info />
                <div>
                  <strong>
                    {zh
                      ? '最容易被忽略的专业判断'
                      : 'THE JUDGMENT THAT IS EASY TO MISS'}
                  </strong>
                  <p>{selected.judgment[lang]}</p>
                </div>
              </div>
              <div className="pilot-strip">
                <div>
                  <span className="eyebrow">YOUR FIRST PILOT</span>
                  <p>{selected.pilot[lang]}</p>
                </div>
                <a
                  className="text-link"
                  href={'/resources/pilot-brief-' + lang + '.md'}
                  download
                >
                  {zh ? '下载问题简报' : 'Get the pilot brief'}
                  <ArrowUpRight />
                </a>
              </div>
              <p className="evidence-basis">
                {zh ? '能力依据：' : 'Capability basis: '}
                {selected.evidence[lang]}
                <span>
                  {zh
                    ? '具体可用范围及依赖需在试点前确认。'
                    : 'Confirm availability and dependencies before a pilot.'}
                </span>
              </p>
            </article>
          </div>
        ) : (
          <div className="empty-state">
            <Search />
            <h2>{zh ? '没有匹配的场景' : 'No matching plays'}</h2>
            <p>
              {zh
                ? '试试“市场”“销售”“知识”，或者清除筛选查看全部场景。'
                : 'Try “market”, “sales” or “knowledge”, or clear the filters to see all plays.'}
            </p>
            <Button
              className="button-link primary"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
            >
              {zh ? '清除全部筛选' : 'Clear all filters'}
            </Button>
          </div>
        )}
      </section>
      <CallToAction lang={lang} />
    </Shell>
  );
}
