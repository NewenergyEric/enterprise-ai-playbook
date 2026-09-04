import { ProcessPage } from '@/components/fde/process';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('en', 'process');
export default function Page() {
  return <ProcessPage lang="en" />;
}
