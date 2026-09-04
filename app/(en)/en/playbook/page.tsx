import { PlaybookPage } from '@/components/fde/playbook';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('en', 'playbook');
export default function Page() {
  return <PlaybookPage lang="en" />;
}
