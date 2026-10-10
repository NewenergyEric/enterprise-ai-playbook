import { ToolkitAccessPage } from '@/components/fde/toolkit-access';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('en', 'toolkit');

export default function Page() {
  return (
    <ToolkitAccessPage
      lang="en"
      leadEndpoint={process.env.TOOLKIT_LEAD_ENDPOINT ?? ''}
    />
  );
}
