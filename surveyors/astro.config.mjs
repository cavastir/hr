import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  output: 'static',
  site: 'https://www.hrsurveyors.com.au',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto'
  }
});
