#!/usr/bin/env node
/**
 * generate-og-card.mjs — renders the 1200x630 OpenGraph / Twitter summary card
 * referenced by BaseLayout (SITE.ogImage) to public/og-card.png. Uses the sharp
 * instance Astro already ships — no new dependency. Run via `npm run og`.
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#05080f"/>
      <stop offset="1" stop-color="#0d1420"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="1" y="1" width="1198" height="628" fill="none" stroke="#1b2536" stroke-width="2"/>

  <!-- traffic lights -->
  <circle cx="70" cy="70" r="9" fill="#f87171"/>
  <circle cx="100" cy="70" r="9" fill="#fbbf24"/>
  <circle cx="130" cy="70" r="9" fill="#34d399"/>

  <text x="70" y="250" font-family="ui-monospace, Menlo, monospace" font-size="34" fill="#5b6b85">$ curl https://mockdock.dev --free --no-signup</text>

  <text x="68" y="340" font-family="ui-monospace, Menlo, monospace" font-size="76" font-weight="700" fill="#ffffff">Mock any API.</text>
  <text x="68" y="420" font-family="ui-monospace, Menlo, monospace" font-size="76" font-weight="700" fill="#ffffff">Simulate any webhook.</text>
  <text x="68" y="500" font-family="ui-monospace, Menlo, monospace" font-size="76" font-weight="700" fill="#22d3ee">The data is in the URL.</text>

  <text x="70" y="575" font-family="ui-monospace, Menlo, monospace" font-size="30" fill="#8b9cb8">12 free tools · no server · no database · shareable mock URLs</text>

  <text x="1130" y="80" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="30" fill="#34d399">mockdock.dev</text>
</svg>`;

const out = resolve(root, 'public/og-card.png');
const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(out, png);
console.log(`[og] wrote ${png.length.toLocaleString()} bytes → public/og-card.png (1200x630)`);
