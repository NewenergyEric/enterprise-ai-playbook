import { ToolkitAccessPage } from '@/components/fde/toolkit-access';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('zh', 'toolkit');

export default function Page() {
  return (
    <ToolkitAccessPage
      lang="zh"
      leadEndpoint={process.env.TOOLKIT_LEAD_ENDPOINT ?? ''}
    />
  );
}
