import { HomePage } from '@/components/fde/home';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('en', 'home');
export default function Page() {
  return <HomePage lang="en" />;
}
