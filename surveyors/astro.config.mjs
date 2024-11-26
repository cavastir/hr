import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      customPages: ['https://www.hrsurveyors.com.au'],
      filter: (page) => !page.includes('/404'),
      entryLimit: 10000, // Number of URLs per sitemap file
    })
  ],
  output: 'static',
  site: 'https://www.hrsurveyors.com.au',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto'
  }
});
