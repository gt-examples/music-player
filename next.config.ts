import { withGTConfig } from 'gt-next/config';

const nextConfig = withGTConfig({}, {
  locales: ['en', 'es', 'fr', 'ja', 'zh'],
  defaultLocale: 'en',
});

export default nextConfig;
