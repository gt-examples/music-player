import { withGTConfig } from 'gt-next/config';

const nextConfig = withGTConfig({}, {
  locales: ['en', 'es', 'fr', 'ja', 'zh'],
  defaultLocale: 'en',
  loadTranslationsPath: 'src/loadTranslations.ts',
});

export default nextConfig;
