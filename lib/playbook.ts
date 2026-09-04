import type { Category, Play } from './content';
import type { Lang } from './site';
export function filterPlays(
  plays: Play[],
  lang: Lang,
  category: Category | 'all',
  query: string,
): Play[] {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
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
    ]
      .join(' ')
      .toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
