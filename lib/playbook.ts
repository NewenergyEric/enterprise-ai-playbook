import type { Category, Play } from './content';
import type { MoreScenario } from './more-scenarios';
import type { Lang } from './site';

function matchesQuery(text: string, query: string): boolean {
  const normalize = (value: string) =>
    value.normalize('NFKC').toLocaleLowerCase();
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const normalizedText = normalize(text);
  return terms.every((term) => normalizedText.includes(term));
}

export function filterApplications(
  applications: MoreScenario[],
  lang: Lang,
  playId: string,
  query = '',
): MoreScenario[] {
  return applications.filter(
    (item) =>
      item.playId === playId &&
      matchesQuery(
        [
          item.title[lang],
          item.question[lang],
          item.inputs[lang],
          item.method[lang],
          ...item.outputs[lang],
        ].join(' '),
        query,
      ),
  );
}

export function filterPlays(
  plays: Play[],
  lang: Lang,
  category: Category | 'all',
  query: string,
  applications: MoreScenario[] = [],
): Play[] {
  return plays.filter((play) => {
    if (category !== 'all' && play.category !== category) return false;
    const text = [
      play.title[lang],
      play.promise[lang],
      play.question[lang],
      play.value[lang],
      play.method[lang],
      play.inputs[lang],
      ...play.steps[lang],
      ...play.outputs[lang],
    ].join(' ');
    // A query must match one complete application, not unrelated terms
    // scattered across several children of the same play.
    return (
      matchesQuery(text, query) ||
      filterApplications(applications, lang, play.id, query).length > 0
    );
  });
}
