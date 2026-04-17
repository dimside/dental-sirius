// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://siriusdental.com.ua',
  output: 'static',
  base: '/',
  integrations: [sitemap()],
});
