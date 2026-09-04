import { ProcessPage } from '@/components/fde/process';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('zh', 'process');
export default function Page() {
  return <ProcessPage lang="zh" />;
}
