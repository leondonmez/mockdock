# mockdock.dev

**Free, zero-friction, zero-signup Mock API Sandbox & Webhook Simulator.**

MockDock is 100% serverless in the literal sense: there is no API server. Every
mock a user builds — body, status code, latency, headers — is deflate-compressed,
base64url-encoded, and packed into the **URL hash**:

```
https://mockdock.dev/api/v1#data=eNqrVspMUbJSKkotLs0pKVayUsrJT08…
```

URL fragments are never transmitted to servers, so mocks are shareable *and*
private by construction. The `/api/v1` page is a static client interceptor that
decodes the fragment, honors simulated latency, and renders the response.

## Stack

- **Astro** — static generation, one dynamic route fans out into all 12 tool pages
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — dark terminal-console theme
- **Vanilla JS** — native `CompressionStream` / `DecompressionStream`, zero runtime deps

## Architecture

| Path | Role |
| --- | --- |
| `src/data/toolsDictionary.js` | Centralized pSEO dictionary: titles, descriptions, keywords, intro copy, and template payloads for all 12 tools. Single source of truth for nav, home grid, sitemap, and meta tags. |
| `src/lib/hashCodec.js` | Envelope codec: JSON → deflate-raw → base64url (and back). |
| `src/layouts/BaseLayout.astro` | Global HTML shell with SEO metadata ingestion (OG, Twitter, JSON-LD, canonical). |
| `src/components/ConsoleShell.astro` | Dark monospace console chrome with sticky left-rail nav + active states. |
| `src/pages/index.astro` | 12-grid home panel. |
| `src/pages/api/v1.astro` | Catch-all client interceptor: reads `location.hash`, inflates, renders status line + headers + highlighted body. |
| `src/pages/mock/[slug].astro` | The 12-tool workbench: template presets, live JSON validation, status/latency controls, hash URL exporter, clipboard action. |

## The 12 tools

1. `/mock/stripe-webhook-events` — Stripe `invoice.paid` & `charge.refunded`
2. `/mock/crud-api-endpoint` — REST users list / product entity / 201 create
3. `/mock/graphql-query-response` — GraphQL data trees & `errors` arrays
4. `/mock/http-status-404-500` — 404 / 500 / 429 error envelopes with headers
5. `/mock/jwt-token-claims` — bearer tokens with admin role claims & expiry
6. `/mock/oauth-token-response` — OIDC token exchange success & `invalid_grant`
7. `/mock/shopify-order-creation` — `orders/create` & `refunds/create` webhooks
8. `/mock/github-pull-request-event` — PR `opened` & merged events for CI
9. `/mock/paginated-api-response` — `page`/`per_page`/`total` & cursor shells
10. `/mock/delayed-api-response` — 3s / 8s latency for skeleton & timeout tests
11. `/mock/invalid-json-api` — intentionally broken JSON payloads
12. `/mock/cors-preflight-options` — permissive / credentialed / broken CORS

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

## Adding a tool

Add one entry to `TOOLS` in `src/data/toolsDictionary.js`. The nav rail, home
grid, sitemap, and a fully interactive `/mock/<slug>` page are generated from it
automatically — no other file changes required.
