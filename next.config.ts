import type { NextConfig } from 'next';

// Vinext 1.0.0-beta.5 prerenders bare route paths. Keep router redirects off
// that path; postbuild mirrors flat exports into portable directory indexes.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
