import { PlaybookPage } from '@/components/fde/playbook';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('zh', 'playbook');
export default function Page() {
  return <PlaybookPage lang="zh" />;
}
