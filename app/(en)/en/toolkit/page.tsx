import { ToolkitAccessPage } from '@/components/fde/toolkit-access';
import { pageMetadata } from '@/lib/metadata';
import { leadConfiguration } from '@/lib/lead-endpoint';

export const metadata = pageMetadata('en', 'toolkit');

export default function Page() {
  return (
    <ToolkitAccessPage
      lang="en"
      {...leadConfiguration(process.env.TOOLKIT_LEAD_ENDPOINT ?? '', process.env.TOOLKIT_PRIVACY_URL ?? '', process.env.NODE_ENV === 'development')}
    />
  );
}
