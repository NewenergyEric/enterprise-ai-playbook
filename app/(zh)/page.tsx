import { HomePage } from '@/components/fde/home';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('zh', 'home');
export default function Page() {
  return <HomePage lang="zh" />;
}
