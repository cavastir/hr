import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      customPages: ['https://www.hrsurveyors.com.au'],
      filter: (page) => !page.includes('/404'),
      entryLimit: 10000,
      serialize: (item) => ({
        ...item,
        changefreq: 'weekly',
        priority: 0.7,
      }),
      outFile: 'sitemap-index.xml',
      sitemap: {
        filename: 'sitemap-0.xml'
      }
    })
  ],
  output: 'server',
  adapter: cloudflare({
    mode: 'directory'
  }),
  site: 'https://www.hrsurveyors.com.au',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
    assets: `assets-${Date.now()}`,
    cache: false
  },
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  }
});
