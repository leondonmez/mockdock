#!/usr/bin/env node
/**
 * generate-sitemap.mjs — Track 3 automated sitemap generator.
 *
 * Reads the pSEO dictionary and writes public/sitemap.xml so the sitemap can
 * never drift from the actual set of tool pages. Wired to the `prebuild` and
 * `predev` npm hooks, so `npm run build` / `npm run dev` always regenerate it.
 *
 *   homepage root : priority 1.0
 *   each tool page: priority 0.9, changefreq weekly
 *
 * The /api/v1 interceptor is intentionally EXCLUDED (noindex + robots Disallow).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Import the single source of truth for URLs.
const dict = await import(
  pathToFileURL(resolve(root, 'src/data/toolsDictionary.js')).href
);
const { SITE, TOOLS, LAB_TOOLS } = dict;

// lastmod uses the current calendar date (2026), full W3C datetime format.
const lastmod = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${SITE.domain}/`, changefreq: 'weekly', priority: '1.0' },
  ...TOOLS.map((tool) => ({
    loc: `${SITE.domain}/mock/${tool.slug}`,
    changefreq: 'weekly',
    priority: '0.9',
  })),
  ...(LAB_TOOLS ?? []).map((tool) => ({
    loc: `${SITE.domain}${tool.path}`,
    changefreq: 'weekly',
    priority: '0.9',
  })),
];

const body = urls
  .map(
    ({ loc, changefreq, priority }) =>
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`
  )
  .join('\n');

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${body}\n` +
  `</urlset>\n`;

const outPath = resolve(root, 'public/sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, 'utf8');

console.log(`[sitemap] wrote ${urls.length} URLs → public/sitemap.xml (lastmod ${lastmod})`);
