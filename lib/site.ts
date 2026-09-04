export type Lang = 'zh' | 'en';
export type View = 'home' | 'process' | 'playbook';
export const languages: Lang[] = ['zh', 'en'];
export function localPath(lang: Lang, view: View = 'home') {
  return `/${lang}/${view === 'home' ? '' : view + '/'}`;
}
