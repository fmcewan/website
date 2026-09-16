// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fmcewan.dev',
  integrations: [react(), sitemap()],
  redirects: {
    '/about': '/#about',
    '/projects': '/#projects',
    '/now': '/#now',
    '/log': '/#notes',
  },
});
