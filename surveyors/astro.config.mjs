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
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'entry.[hash].js',
          chunkFileNames: 'chunks/chunk.[hash].js',
          assetFileNames: 'assets/asset.[hash][extname]',
        },
      },
    },
  }
});