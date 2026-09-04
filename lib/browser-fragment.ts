export function subscribeFragment(callback: () => void) {
  window.addEventListener('hashchange', callback);
  window.addEventListener('popstate', callback);
  return () => {
    window.removeEventListener('hashchange', callback);
    window.removeEventListener('popstate', callback);
  };
}
export const getFragment = () => window.location.hash.slice(1);
export const getServerFragment = () => '';
