import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mockdock.dev',
  trailingSlash: 'never',
  // The sitemap is generated from the pSEO dictionary into public/sitemap.xml
  // by scripts/generate-sitemap.mjs (wired to the `prebuild` npm hook), which
  // gives per-URL <priority>/<changefreq> control the @astrojs/sitemap
  // integration does not expose. See Track 3.
  vite: {
    plugins: [tailwindcss()],
  },
});
