import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lulopdz.github.io',
  base: '/',
  integrations: [sitemap()],
  // 'directory' (default) emits /teaching/<course>/index.html so material
  // folders under public/teaching/ and their index pages share one URL.
  build: {
    format: 'directory'
  }
});

