// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    plugins: [
      {
        name: 'virtual-module',
        resolveId(id) {
          if (id.startsWith('virtual:')) {
            return id;
          }
        },
        load(id) {
          if (id.startsWith('virtual:')) {
            return ''; // Return an empty string for virtual modules
          }
        },
      },
    ],
    define: {
      'import.meta.env.GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY),
    },
  }
});