/**
 * toolsDictionary.js — the centralized pSEO data dictionary.
 *
 * Every tool page, nav entry, home card, sitemap entry, and meta tag on
 * mockdock.dev is generated from this single file. Each entry carries:
 *
 *   slug        -> /mock/<slug> (also the getStaticPaths key)
 *   name        -> human tool name (H1 / cards)
 *   navLabel    -> short label for the console left rail
 *   tagline     -> one-liner for the home grid card
 *   title       -> distinct SEO <title>
 *   description -> distinct long-tail meta description
 *   keywords    -> long-tail keyword targets
 *   intro       -> unique on-page copy block (pSEO content, not boilerplate)
 *   templates   -> >= 2 industry-standard presets. Each template defines the
 *                  simulated status, latency, headers and body. `raw: true`
 *                  marks bodies that are intentionally NOT valid JSON.
 */

export const SITE = {
  name: 'MockDock',
  domain: 'https://mockdock.dev',
  tagline: 'Free mock API sandbox & webhook simulator. No signup. No server. The data is in the URL.',
  homeTitle: 'MockDock — Free Mock API Sandbox & Webhook Simulator',
  homeDescription:
    '14 free tools to mock APIs and webhooks: Stripe and Shopify events, fake REST endpoints, JWT claims, CORS and latency — no signup, no server.',
  homeKeywords: [
    'mock api sandbox free',
    'webhook simulator online',
    'fake api endpoint no signup',
    'test webhooks without server',
    'mock json payload generator',
  ],
  ogImage: '/og-card.png',
};

// SERP length budgets enforced at build time (see validation at file bottom).
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

export const TOOLS = [
  // ── 01 ────────────────────────────────────────────────────────────────
  {
    slug: 'stripe-webhook-events',
    name: 'Stripe Webhook Event Mocker',
    navLabel: 'stripe-events',
    tagline: 'Fake invoice.paid & charge.refunded events for local webhook handlers.',
    title: 'Free Stripe Webhook Event Mocker & Simulator | MockDock',
    description:
      'Mock Stripe webhook events like invoice.paid and charge.refunded free. No account needed — edit the JSON payload and copy an instant test URL.',
    keywords: [
      'stripe webhook test payload',
      'mock stripe events online',
      'invoice.paid example json',
      'charge.refunded webhook sample',
      'stripe webhook simulator free',
    ],
    intro:
      'Building a Stripe integration means handling webhooks long before real money moves. This tool ships editable, spec-shaped Stripe event envelopes — pick invoice.paid or charge.refunded, tweak the fields your handler cares about, and get a URL that replays the payload instantly. No Stripe CLI, no test-mode keys, no tunneling.',
    templates: [
      {
        id: 'invoice-paid',
        label: 'invoice.paid — subscription invoice settled',
        status: 200,
        delay: 0,
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 't=1751702400,v1=mock_5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd',
        },
        body: {
          id: 'evt_1PXaK2LkdIwHu7ixVp2qzLbT',
          object: 'event',
          api_version: '2025-03-31',
          created: 1751702400,
          type: 'invoice.paid',
          livemode: false,
          pending_webhooks: 1,
          request: { id: 'req_9m4XKzT2ahF3Lo', idempotency_key: null },
          data: {
            object: {
              id: 'in_1PXaJyLkdIwHu7ix8VQyWkbA',
              object: 'invoice',
              customer: 'cus_QOMx2mVYbXIfEB',
              customer_email: 'ada@example.com',
              subscription: 'sub_1PXaJxLkdIwHu7ixQ4C0f9nD',
              status: 'paid',
              currency: 'usd',
              amount_due: 2900,
              amount_paid: 2900,
              amount_remaining: 0,
              attempt_count: 1,
              billing_reason: 'subscription_cycle',
              hosted_invoice_url: 'https://invoice.stripe.com/i/acct_mock/test_mock',
              lines: {
                object: 'list',
                total_count: 1,
                data: [
                  {
                    id: 'il_1PXaJyLkdIwHu7ixnbXm2ap4',
                    object: 'line_item',
                    amount: 2900,
                    currency: 'usd',
                    description: 'Pro Plan — Jul 5 to Aug 5, 2026',
                    period: { start: 1751702400, end: 1754380800 },
                    price: { id: 'price_1PXaJvLkdIwHu7ixMockPro', unit_amount: 2900, recurring: { interval: 'month' } },
                    quantity: 1,
                  },
                ],
              },
            },
          },
        },
      },
      {
        id: 'charge-refunded',
        label: 'charge.refunded — full refund issued',
        status: 200,
        delay: 0,
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 't=1751702455,v1=mock_8b1f6cf1c1a3f0f6f77e0e9a4a1c5f8e2d9b7a6c4e3f2a1b0c9d8e7f6a5b4c3d',
        },
        body: {
          id: 'evt_1PXbR7LkdIwHu7ixG3mNqA2c',
          object: 'event',
          api_version: '2025-03-31',
          created: 1751702455,
          type: 'charge.refunded',
          livemode: false,
          pending_webhooks: 1,
          request: { id: 'req_2fQ8VzR5jkLm1N', idempotency_key: 'refund-order-8812' },
          data: {
            object: {
              id: 'ch_3PXbQzLkdIwHu7ix0Y2kJb1m',
              object: 'charge',
              amount: 4500,
              amount_captured: 4500,
              amount_refunded: 4500,
              currency: 'usd',
              customer: 'cus_QOMx2mVYbXIfEB',
              payment_intent: 'pi_3PXbQzLkdIwHu7ix0mockInt',
              paid: true,
              refunded: true,
              receipt_url: 'https://pay.stripe.com/receipts/mock',
              refunds: {
                object: 'list',
                total_count: 1,
                data: [
                  {
                    id: 're_3PXbQzLkdIwHu7ix0RfNd221',
                    object: 'refund',
                    amount: 4500,
                    currency: 'usd',
                    reason: 'requested_by_customer',
                    status: 'succeeded',
                    created: 1751702455,
                  },
                ],
              },
            },
          },
        },
      },
    ],
  },

  // ── 02 ────────────────────────────────────────────────────────────────
  {
    slug: 'crud-api-endpoint',
    name: 'REST API Endpoint Generator',
    navLabel: 'crud-endpoint',
    tagline: 'Instant fake REST endpoints — user lists, product entities, 201 creates.',
    title: 'Free Fake REST API Endpoint Generator | MockDock',
    description:
      'Generate a fake REST API endpoint in seconds. Free mock JSON payloads for users, products and 201 Created responses — no signup, no backend.',
    keywords: [
      'fake rest api endpoint generator',
      'mock crud api online free',
      'test json endpoint without backend',
      'mock users api response',
      'dummy product api json',
    ],
    intro:
      'Frontend blocked on a backend that does not exist yet? Generate the endpoint yourself. Pick a canonical CRUD shape — a paginless user collection, a single product entity, or a 201 Created echo — edit the JSON to match your contract, and point your data layer at the exported URL.',
    templates: [
      {
        id: 'users-list',
        label: 'GET /users — collection of user records',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'x-total-count': '3' },
        body: {
          data: [
            { id: 'usr_01HZX4M8Q2', name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin', active: true, created_at: '2026-01-12T09:14:00Z' },
            { id: 'usr_01HZX4N1T7', name: 'Grace Hopper', email: 'grace@example.com', role: 'editor', active: true, created_at: '2026-02-03T16:40:00Z' },
            { id: 'usr_01HZX4P5W9', name: 'Alan Turing', email: 'alan@example.com', role: 'viewer', active: false, created_at: '2026-03-21T11:05:00Z' },
          ],
          total: 3,
        },
      },
      {
        id: 'single-product',
        label: 'GET /products/:id — single product entity',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', etag: 'W/"prod-88f2c1"' },
        body: {
          id: 'prod_9f2K7LmQ',
          sku: 'MD-KEYB-87',
          name: 'Mechanical Keyboard 87-Key',
          description: 'Hot-swappable TKL board with PBT keycaps.',
          price: { amount: 12900, currency: 'USD', formatted: '$129.00' },
          stock: { available: 42, warehouse: 'US-EAST-1' },
          tags: ['peripherals', 'keyboards', 'hot-swap'],
          rating: 4.7,
          created_at: '2026-05-02T08:00:00Z',
          updated_at: '2026-07-01T14:22:00Z',
        },
      },
      {
        id: 'post-created',
        label: 'POST /users — 201 Created echo',
        status: 201,
        delay: 0,
        headers: { 'content-type': 'application/json', location: '/users/usr_01J0NEW0X1' },
        body: {
          id: 'usr_01J0NEW0X1',
          name: 'Katherine Johnson',
          email: 'katherine@example.com',
          role: 'viewer',
          active: true,
          created_at: '2026-07-05T12:00:00Z',
        },
      },
    ],
  },

  // ── 03 ────────────────────────────────────────────────────────────────
  {
    slug: 'graphql-query-response',
    name: 'GraphQL Response Mocker',
    navLabel: 'graphql-mock',
    tagline: 'Structured data graphs and spec-shaped GraphQL error arrays.',
    title: 'Mock GraphQL Query Response Generator | MockDock',
    description:
      'Simulate GraphQL responses free: data trees, edges/node connections and spec-shaped errors arrays. Test Apollo, urql or Relay clients with no server.',
    keywords: [
      'mock graphql response online',
      'fake graphql api for testing',
      'graphql errors array example',
      'graphql edges node mock data',
      'test apollo client without server',
    ],
    intro:
      'GraphQL clients are picky: they expect a top-level data key, relay-style connections, and errors that carry locations and extensions. This tool speaks that dialect natively. Mock a healthy query result with nested edges, or a validation failure with a proper GRAPHQL_VALIDATION_FAILED extension code, and feed it straight to your client cache.',
    templates: [
      {
        id: 'query-success',
        label: 'Query success — viewer with repository connection',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json' },
        body: {
          data: {
            viewer: {
              id: 'MDQ6VXNlcjU4MzIzMQ==',
              login: 'octomocker',
              name: 'Octo Mocker',
              repositories: {
                totalCount: 2,
                pageInfo: { hasNextPage: false, endCursor: 'Y3Vyc29yOnYyOpHOAAIabc' },
                edges: [
                  { cursor: 'Y3Vyc29yOnYyOpHOAAIaaa', node: { name: 'mockdock', stargazerCount: 1284, primaryLanguage: { name: 'JavaScript' } } },
                  { cursor: 'Y3Vyc29yOnYyOpHOAAIabc', node: { name: 'hash-codec', stargazerCount: 96, primaryLanguage: { name: 'TypeScript' } } },
                ],
              },
            },
          },
        },
      },
      {
        id: 'validation-error',
        label: 'Validation error — errors array with extensions',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json' },
        body: {
          errors: [
            {
              message: "Cannot query field 'emial' on type 'User'. Did you mean 'email'?",
              locations: [{ line: 4, column: 7 }],
              path: null,
              extensions: { code: 'GRAPHQL_VALIDATION_FAILED', classification: 'ValidationError' },
            },
          ],
          data: null,
        },
      },
      {
        id: 'partial-data',
        label: 'Partial response — data plus field-level error',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json' },
        body: {
          data: {
            user: { id: 'usr_42', name: 'Ada Lovelace', avatarUrl: null },
          },
          errors: [
            {
              message: 'Failed to resolve avatarUrl: upstream media service timed out',
              path: ['user', 'avatarUrl'],
              extensions: { code: 'INTERNAL_SERVER_ERROR', retryable: true },
            },
          ],
        },
      },
    ],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: 'http-status-404-500',
    name: 'HTTP Status Code Simulator',
    navLabel: 'status-codes',
    tagline: 'Trigger 404, 500 & 429 responses with realistic error envelopes.',
    title: 'HTTP Status Code Simulator — Test 404 & 500 | MockDock',
    description:
      'Force 404, 500 and 429 responses with realistic JSON error bodies and Retry-After headers. Free status code simulator for retry and error logic.',
    keywords: [
      'simulate 500 error response',
      'test 404 api response online',
      'http status code testing tool',
      'mock 429 rate limit retry-after',
      'api error response generator',
    ],
    intro:
      'Happy paths are easy; the 3 a.m. pager fires on the unhappy ones. Simulate the exact failure modes your retry logic, error boundaries, and alerting must survive: a clean 404 with a request ID for tracing, a 500 with an opaque incident reference, or a 429 that ships a Retry-After header your backoff code should respect.',
    templates: [
      {
        id: 'not-found-404',
        label: '404 Not Found — resource missing with request ID',
        status: 404,
        delay: 0,
        headers: { 'content-type': 'application/json', 'x-request-id': 'req_c81e728d9d4c2f63' },
        body: {
          error: {
            code: 'resource_not_found',
            message: "The requested resource 'usr_01HZDELETED' does not exist or has been removed.",
            request_id: 'req_c81e728d9d4c2f63',
            documentation_url: 'https://mockdock.dev/mock/http-status-404-500',
          },
        },
      },
      {
        id: 'server-error-500',
        label: '500 Internal Server Error — opaque incident reference',
        status: 500,
        delay: 0,
        headers: { 'content-type': 'application/json', 'x-request-id': 'req_a87ff679a2f3e71d' },
        body: {
          error: {
            code: 'internal_server_error',
            message: 'An unexpected error occurred. Our team has been notified.',
            request_id: 'req_a87ff679a2f3e71d',
            incident_id: 'inc_2026_07_05_0042',
          },
        },
      },
      {
        id: 'rate-limited-429',
        label: '429 Too Many Requests — Retry-After header',
        status: 429,
        delay: 0,
        headers: {
          'content-type': 'application/json',
          'retry-after': '30',
          'x-ratelimit-limit': '100',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': '1751702490',
        },
        body: {
          error: {
            code: 'rate_limited',
            message: 'API rate limit exceeded: 100 requests per minute. Retry after 30 seconds.',
            retry_after_seconds: 30,
          },
        },
      },
    ],
  },

  // ── 05 ────────────────────────────────────────────────────────────────
  {
    slug: 'jwt-token-claims',
    name: 'JWT Payload Simulator',
    navLabel: 'jwt-claims',
    tagline: 'Bearer tokens with admin role claims, scopes & expiry scenarios.',
    title: 'Free JWT Token Claims Mocker & Simulator | MockDock',
    description:
      'Mock JWT bearer tokens with custom claims: admin roles, scopes and expiry. Free simulator for testing RBAC guards and token refresh — no auth server.',
    keywords: [
      'mock jwt token response',
      'fake bearer token for testing',
      'jwt admin role claims example',
      'test expired jwt handling',
      'jwt payload generator online',
    ],
    intro:
      'Your route guards, RBAC middleware, and token-refresh logic all key off JWT claims — so mock the claims, not the crypto. Each template pairs a plausible signed-looking bearer token with its decoded header and payload, covering an administrator grant with write scopes and an already-expired token for testing your 401-and-refresh path. Signatures are decorative: never use these against a real verifier.',
    templates: [
      {
        id: 'admin-claims',
        label: 'Admin token — role + permission scopes',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        body: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGgubW9ja2RvY2suZGV2Iiwic3ViIjoidXNyXzAxSFpYNE04UTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE3MDI0MDAsImV4cCI6MTc1MTcwNjAwMH0.bW9ja19zaWduYXR1cmVfbm90X3JlYWw',
          token_type: 'Bearer',
          expires_in: 3600,
          decoded: {
            header: { alg: 'HS256', typ: 'JWT', kid: 'mock-key-2026-07' },
            payload: {
              iss: 'https://auth.mockdock.dev',
              sub: 'usr_01HZX4M8Q2',
              aud: 'api://default',
              role: 'admin',
              permissions: ['users:read', 'users:write', 'billing:manage', 'settings:admin'],
              iat: 1751702400,
              exp: 1751706000,
              jti: 'jti_8f14e45fceea167a',
            },
          },
          note: 'Signature is fake. For claim-shape testing only — will not pass verification.',
        },
      },
      {
        id: 'expired-token',
        label: 'Expired token — exp in the past (refresh-flow test)',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        body: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGgubW9ja2RvY2suZGV2Iiwic3ViIjoidXNyXzAxSFpYNE4xVDciLCJyb2xlIjoiZWRpdG9yIiwiaWF0IjoxNzUxNjEyMDAwLCJleHAiOjE3NTE2MTU2MDB9.ZXhwaXJlZF9tb2NrX3NpZ25hdHVyZQ',
          token_type: 'Bearer',
          expires_in: 0,
          decoded: {
            header: { alg: 'HS256', typ: 'JWT', kid: 'mock-key-2026-07' },
            payload: {
              iss: 'https://auth.mockdock.dev',
              sub: 'usr_01HZX4N1T7',
              aud: 'api://default',
              role: 'editor',
              permissions: ['content:read', 'content:write'],
              iat: 1751612000,
              exp: 1751615600,
              jti: 'jti_45c48cce2e2d7fbd',
            },
          },
          note: 'exp is ~24h in the past — use this to exercise your 401 + refresh-token path.',
        },
      },
    ],
  },

  // ── 06 ────────────────────────────────────────────────────────────────
  {
    slug: 'oauth-token-response',
    name: 'OAuth / OIDC Token Mocker',
    navLabel: 'oauth-flow',
    tagline: 'Token-exchange successes and invalid_grant failures, RFC-shaped.',
    title: 'Mock OAuth Token Response Simulator | MockDock',
    description:
      'Simulate OAuth 2.0 and OIDC token responses free: access_token, id_token and invalid_grant errors. Test login flows without an identity provider.',
    keywords: [
      'mock oauth token endpoint',
      'oidc id_token example response',
      'invalid_grant error json example',
      'test oauth flow without provider',
      'oauth2 token response generator',
    ],
    intro:
      'The token endpoint is where OAuth integrations quietly break. Rehearse both outcomes of the authorization_code exchange: the success envelope with access_token, refresh_token, id_token and scope exactly as OIDC providers return it, and the RFC 6749 invalid_grant failure your login flow must recover from when a code is reused or expired.',
    templates: [
      {
        id: 'token-success',
        label: 'authorization_code exchange — success with id_token',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store', pragma: 'no-cache' },
        body: {
          access_token: 'mock_at_2YotnFZFEjr1zCsicMWpAA',
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_token: 'mock_rt_tGzv3JOkF0XG5Qx2TlKWIA',
          scope: 'openid profile email offline_access',
          id_token:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1vY2sifQ.eyJpc3MiOiJodHRwczovL2lkLm1vY2tkb2NrLmRldiIsInN1YiI6InVzcl8wMUhaWDRNOFEyIiwiYXVkIjoiY2xpZW50X21vY2tkb2NrIiwiZW1haWwiOiJhZGFAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTE3MDI0MDAsImV4cCI6MTc1MTcwNjAwMH0.aWRfdG9rZW5fbW9ja19zaWc',
        },
      },
      {
        id: 'invalid-grant',
        label: 'invalid_grant — expired or reused authorization code',
        status: 400,
        delay: 0,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        body: {
          error: 'invalid_grant',
          error_description:
            'The provided authorization grant is invalid, expired, or has already been redeemed.',
          error_uri: 'https://datatracker.ietf.org/doc/html/rfc6749#section-5.2',
        },
      },
      {
        id: 'client-credentials',
        label: 'client_credentials — machine-to-machine grant',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        body: {
          access_token: 'mock_at_m2m_8xLOxBtZp8fH3k1q',
          token_type: 'Bearer',
          expires_in: 86400,
          scope: 'reports:read metrics:read',
        },
      },
    ],
  },

  // ── 07 ────────────────────────────────────────────────────────────────
  {
    slug: 'shopify-order-creation',
    name: 'Shopify Webhook Simulator',
    navLabel: 'shopify-orders',
    tagline: 'orders/create & refunds/create payloads with topic headers.',
    title: 'Shopify Order Webhook Simulator & Mocker | MockDock',
    description:
      'Mock Shopify orders/create and refunds/create webhooks with topic headers and line items. Free simulator — no dev store or ngrok tunnel required.',
    keywords: [
      'shopify orders create webhook example',
      'mock shopify webhook payload',
      'test shopify webhook without store',
      'shopify order json sample',
      'shopify refund webhook payload',
    ],
    intro:
      'Spinning up a dev store and tunneling ngrok just to see one webhook body is a tax on every Shopify app developer. Skip it: these templates mirror the orders/create and refunds/create topics — line items, money fields as strings (yes, Shopify sends "42.00"), customer objects, and the X-Shopify-Topic headers your router switches on.',
    templates: [
      {
        id: 'orders-create',
        label: 'orders/create — paid checkout with 2 line items',
        status: 200,
        delay: 0,
        headers: {
          'content-type': 'application/json',
          'x-shopify-topic': 'orders/create',
          'x-shopify-shop-domain': 'mockdock-demo.myshopify.com',
          'x-shopify-hmac-sha256': 'bW9ja19obWFjX25vdF9yZWFsX3NpZ25hdHVyZQ==',
          'x-shopify-webhook-id': 'wh_b2c3d4e5-f6a7-4b89',
        },
        body: {
          id: 5678901234567,
          admin_graphql_api_id: 'gid://shopify/Order/5678901234567',
          order_number: 1042,
          name: '#1042',
          email: 'ada@example.com',
          created_at: '2026-07-05T09:32:11-04:00',
          currency: 'USD',
          financial_status: 'paid',
          fulfillment_status: null,
          subtotal_price: '54.00',
          total_tax: '4.32',
          total_price: '58.32',
          line_items: [
            { id: 13579246801, title: 'Organic Cotton Tee', variant_title: 'M / Charcoal', sku: 'TEE-CHAR-M', quantity: 2, price: '19.50' },
            { id: 13579246802, title: 'Enamel Mug', variant_title: null, sku: 'MUG-ENML-01', quantity: 1, price: '15.00' },
          ],
          customer: {
            id: 7123456789012,
            first_name: 'Ada',
            last_name: 'Lovelace',
            email: 'ada@example.com',
            orders_count: 3,
            total_spent: '174.90',
          },
          shipping_address: { city: 'Portland', province_code: 'OR', country_code: 'US', zip: '97201' },
        },
      },
      {
        id: 'refunds-create',
        label: 'refunds/create — partial refund on one line item',
        status: 200,
        delay: 0,
        headers: {
          'content-type': 'application/json',
          'x-shopify-topic': 'refunds/create',
          'x-shopify-shop-domain': 'mockdock-demo.myshopify.com',
          'x-shopify-hmac-sha256': 'bW9ja19obWFjX3JlZnVuZF9zaWc=',
          'x-shopify-webhook-id': 'wh_c3d4e5f6-a7b8-4c90',
        },
        body: {
          id: 909192939495,
          order_id: 5678901234567,
          created_at: '2026-07-06T14:11:52-04:00',
          note: 'Customer reported wrong size',
          restock: true,
          refund_line_items: [
            {
              id: 445566778899,
              line_item_id: 13579246801,
              quantity: 1,
              restock_type: 'return',
              subtotal: '19.50',
              total_tax: '1.56',
            },
          ],
          transactions: [
            {
              id: 6677889900112,
              order_id: 5678901234567,
              kind: 'refund',
              gateway: 'shopify_payments',
              status: 'success',
              amount: '21.06',
              currency: 'USD',
            },
          ],
        },
      },
    ],
  },

  // ── 08 ────────────────────────────────────────────────────────────────
  {
    slug: 'github-pull-request-event',
    name: 'GitHub Webhook Matrix',
    navLabel: 'github-pr',
    tagline: 'pull_request opened & merged events for CI pipeline testing.',
    title: 'GitHub Pull Request Webhook Event Mocker | MockDock',
    description:
      'Mock GitHub pull_request webhook events free: opened and merged payloads with head/base refs and event headers for CI bots and pipelines.',
    keywords: [
      'github pull_request webhook payload example',
      'mock github webhook event',
      'pr merged webhook json',
      'test github webhook handler locally',
      'x-github-event pull_request sample',
    ],
    intro:
      'CI bots, merge queues, and deployment triggers all pivot on the pull_request event — specifically on action, merged, and the head/base refs. These templates replay the two payloads that matter most: a fresh "opened" PR your automation should pick up, and a "closed" event where merged: true separates a real merge from a discarded branch.',
    templates: [
      {
        id: 'pr-opened',
        label: 'pull_request opened — new PR against main',
        status: 200,
        delay: 0,
        headers: {
          'content-type': 'application/json',
          'x-github-event': 'pull_request',
          'x-github-delivery': '72d3162e-cc78-11e3-81ab-4c9367dc0958',
          'x-hub-signature-256': 'sha256=mock_not_a_real_signature',
        },
        body: {
          action: 'opened',
          number: 1347,
          pull_request: {
            id: 1901547821,
            number: 1347,
            state: 'open',
            title: 'feat: add hash-based payload codec',
            user: { login: 'octomocker', id: 583231, type: 'User' },
            body: 'Implements deflate + base64url encoding for URL-fragment payloads.',
            draft: false,
            merged: false,
            mergeable_state: 'clean',
            head: { ref: 'feat/hash-codec', sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e' },
            base: { ref: 'main', sha: '9049f1265b7d61be4a8904a9a27120d2064dab3b' },
            html_url: 'https://github.com/octomocker/mockdock/pull/1347',
            additions: 214,
            deletions: 12,
            changed_files: 6,
            created_at: '2026-07-05T13:01:22Z',
          },
          repository: {
            id: 35129377,
            full_name: 'octomocker/mockdock',
            private: false,
            default_branch: 'main',
          },
          sender: { login: 'octomocker', id: 583231 },
        },
      },
      {
        id: 'pr-merged',
        label: 'pull_request closed — merged into main',
        status: 200,
        delay: 0,
        headers: {
          'content-type': 'application/json',
          'x-github-event': 'pull_request',
          'x-github-delivery': '89e1436c-cc78-11e3-92b1-4c9367dc0959',
          'x-hub-signature-256': 'sha256=mock_not_a_real_signature',
        },
        body: {
          action: 'closed',
          number: 1347,
          pull_request: {
            id: 1901547821,
            number: 1347,
            state: 'closed',
            title: 'feat: add hash-based payload codec',
            user: { login: 'octomocker', id: 583231, type: 'User' },
            draft: false,
            merged: true,
            merged_at: '2026-07-05T17:44:09Z',
            merged_by: { login: 'release-bot', id: 998877, type: 'Bot' },
            merge_commit_sha: 'e5bd3914e2e596debea16f433f57875b5b90bcd6',
            head: { ref: 'feat/hash-codec', sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e' },
            base: { ref: 'main', sha: '9049f1265b7d61be4a8904a9a27120d2064dab3b' },
            html_url: 'https://github.com/octomocker/mockdock/pull/1347',
          },
          repository: {
            id: 35129377,
            full_name: 'octomocker/mockdock',
            private: false,
            default_branch: 'main',
          },
          sender: { login: 'release-bot', id: 998877 },
        },
      },
    ],
  },

  // ── 09 ────────────────────────────────────────────────────────────────
  {
    slug: 'paginated-api-response',
    name: 'Paginated Data Seeder',
    navLabel: 'pagination',
    tagline: 'page/per_page/total shells and cursor-based paging envelopes.',
    title: 'Mock Paginated API Response Generator | MockDock',
    description:
      'Generate paginated mock JSON free: page, per_page and total envelopes plus cursor paging. Test infinite scroll and pagination edge cases instantly.',
    keywords: [
      'mock paginated api response',
      'page per_page total json example',
      'cursor pagination response mock',
      'test infinite scroll api',
      'fake paginated data generator',
    ],
    intro:
      'Pagination bugs hide at the edges: the last page, the empty page, the cursor that says there is nothing more. Seed all of them instantly — a classic offset envelope with page/per_page/total metadata, a cursor-based shell for infinite scroll, and a final short page to prove your "load more" button knows when to stop.',
    templates: [
      {
        id: 'offset-page-1',
        label: 'Offset pagination — page 1 of 6',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', link: '</items?page=2>; rel="next", </items?page=6>; rel="last"' },
        body: {
          data: [
            { id: 101, name: 'Item Alpha', category: 'widgets' },
            { id: 102, name: 'Item Bravo', category: 'widgets' },
            { id: 103, name: 'Item Charlie', category: 'gadgets' },
            { id: 104, name: 'Item Delta', category: 'gadgets' },
            { id: 105, name: 'Item Echo', category: 'widgets' },
          ],
          page: 1,
          per_page: 5,
          total: 27,
          total_pages: 6,
        },
      },
      {
        id: 'offset-last-page',
        label: 'Offset pagination — short final page (6 of 6)',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', link: '</items?page=5>; rel="prev", </items?page=1>; rel="first"' },
        body: {
          data: [
            { id: 126, name: 'Item Zulu', category: 'gadgets' },
            { id: 127, name: 'Item Omega', category: 'widgets' },
          ],
          page: 6,
          per_page: 5,
          total: 27,
          total_pages: 6,
        },
      },
      {
        id: 'cursor-page',
        label: 'Cursor pagination — infinite scroll envelope',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json' },
        body: {
          data: [
            { id: 'itm_kJ8mN2pQ', name: 'Item Foxtrot', created_at: '2026-07-04T18:22:00Z' },
            { id: 'itm_rT5vW9xY', name: 'Item Golf', created_at: '2026-07-04T17:58:00Z' },
            { id: 'itm_aB3cD7eF', name: 'Item Hotel', created_at: '2026-07-04T17:31:00Z' },
          ],
          paging: {
            cursors: { before: 'itm_kJ8mN2pQ', after: 'itm_aB3cD7eF' },
            has_next_page: true,
            next: '/items?after=itm_aB3cD7eF&limit=3',
          },
        },
      },
    ],
  },

  // ── 10 ────────────────────────────────────────────────────────────────
  {
    slug: 'delayed-api-response',
    name: 'Latency Simulator',
    navLabel: 'slow-network',
    tagline: '3s and 8s artificial delays for skeleton screens & timeouts.',
    title: 'Slow API Response & Latency Simulator | MockDock',
    description:
      'Simulate slow API responses with 3s or 8s latency. Free tool to test skeleton screens, spinners and AbortController timeouts — no throttling proxy.',
    keywords: [
      'simulate slow api response',
      'test loading skeleton screen',
      'delayed json endpoint online',
      'api latency simulator free',
      'test fetch timeout abortcontroller',
    ],
    intro:
      'On localhost every response lands in 5ms and every spinner looks perfect. Reality ships 3G. Dial in real latency — a 3-second delay to watch your skeleton screens actually render, or an 8-second stall to prove your AbortController timeouts and retry toasts fire before users rage-refresh. The delay is honored client-side by the interceptor, no throttling proxy required.',
    templates: [
      {
        id: 'delay-3s',
        label: '3 second delay — skeleton screen check',
        status: 200,
        delay: 3000,
        headers: { 'content-type': 'application/json', 'x-mock-delay-ms': '3000' },
        body: {
          message: 'This response was artificially delayed by 3000ms.',
          purpose: 'Verify skeleton screens and loading spinners render correctly during slow fetches.',
          data: [
            { id: 1, headline: 'If you saw a skeleton block before this text, your loading state works.' },
            { id: 2, headline: 'If the page flashed empty white, you have a loading-state gap to fix.' },
          ],
          served_after_ms: 3000,
        },
      },
      {
        id: 'delay-8s',
        label: '8 second stall — timeout & abort testing',
        status: 200,
        delay: 8000,
        headers: { 'content-type': 'application/json', 'x-mock-delay-ms': '8000' },
        body: {
          message: 'This response stalled for 8000ms before arriving.',
          purpose: 'Exercise AbortController timeouts, retry banners, and slow-connection fallbacks.',
          hint: 'Most apps should have given up or shown a "still working…" notice long before this arrived.',
          served_after_ms: 8000,
        },
      },
    ],
  },

  // ── 11 ────────────────────────────────────────────────────────────────
  {
    slug: 'invalid-json-api',
    name: 'Malformed Payload Tester',
    navLabel: 'broken-json',
    tagline: 'Deliberately broken JSON to harden your parsers & fallbacks.',
    title: 'Malformed JSON API Tester — Broken Payloads | MockDock',
    description:
      'Serve deliberately broken JSON — truncated bodies, bad syntax, HTML disguised as JSON — to test response.json() error handling and parser fallbacks.',
    keywords: [
      'test invalid json response',
      'malformed json example payload',
      'response.json() error handling test',
      'broken api response simulator',
      'html instead of json error',
    ],
    intro:
      'Every client eventually meets a response that lies: a proxy truncates a body mid-array, a legacy service emits single quotes, or a load balancer returns an HTML 502 page under a application/json header. This tool serves those exact pathologies on purpose, so your response.json() catch blocks and fallback UI get tested before production does it for you. The editor will flag these payloads as invalid — here, that is the point.',
    templates: [
      {
        id: 'truncated',
        label: 'Truncated body — connection dropped mid-array',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'x-mock-defect': 'truncated-body' },
        raw: true,
        body: '{"data": [{"id": 1, "name": "Ada Lovelace"}, {"id": 2, "na',
      },
      {
        id: 'bad-syntax',
        label: 'Bad syntax — single quotes + trailing commas',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'x-mock-defect': 'invalid-syntax' },
        raw: true,
        body: "{'status': 'ok', 'items': [1, 2, 3,], 'count': 3,}",
      },
      {
        id: 'html-disguised',
        label: 'HTML disguised as JSON — gateway error page',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json', 'x-mock-defect': 'html-body' },
        raw: true,
        body: '<!DOCTYPE html>\n<html>\n<head><title>502 Bad Gateway</title></head>\n<body>\n<center><h1>502 Bad Gateway</h1></center>\n<hr><center>nginx/1.25.3</center>\n</body>\n</html>',
      },
    ],
  },

  // ── 12 ────────────────────────────────────────────────────────────────
  {
    slug: 'cors-preflight-options',
    name: 'CORS Headers Inspector',
    navLabel: 'cors-preflight',
    tagline: 'Preflight OPTIONS responses — permissive, credentialed & broken.',
    title: 'CORS Preflight Response Simulator & Tester | MockDock',
    description:
      'Simulate CORS preflight responses free: wildcard, credentialed and broken Access-Control-Allow-Origin setups to debug cross-origin fetch errors fast.',
    keywords: [
      'cors preflight response example',
      'access-control-allow-origin test',
      'simulate cors error',
      'options request headers mock',
      'cors allow credentials example',
    ],
    intro:
      'CORS failures are diagnosed by reading headers, so learn the three shapes by heart: the permissive wildcard 204 that unblocks everything, the credentialed setup where Allow-Origin must name one exact origin (wildcards break withCredentials), and the misconfigured response missing Access-Control-Allow-Origin — the one producing that red console error you were just googling.',
    templates: [
      {
        id: 'permissive',
        label: 'Permissive preflight — 204 with wildcard origin',
        status: 204,
        delay: 0,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'access-control-allow-headers': 'Content-Type, Authorization, X-Requested-With',
          'access-control-max-age': '86400',
          vary: 'Origin',
        },
        body: {
          preflight: 'ok',
          note: 'A real 204 has no body — this text exists so you can read what the headers above mean.',
        },
      },
      {
        id: 'credentialed',
        label: 'Credentialed CORS — exact origin + allow-credentials',
        status: 204,
        delay: 0,
        headers: {
          'access-control-allow-origin': 'https://app.example.com',
          'access-control-allow-credentials': 'true',
          'access-control-allow-methods': 'GET, POST, OPTIONS',
          'access-control-allow-headers': 'Content-Type, Authorization',
          'access-control-expose-headers': 'X-Request-Id',
          vary: 'Origin',
        },
        body: {
          preflight: 'ok',
          note: 'With credentials, Allow-Origin must be an exact origin. "*" would be rejected by the browser.',
        },
      },
      {
        id: 'misconfigured',
        label: 'Broken CORS — missing Access-Control-Allow-Origin',
        status: 200,
        delay: 0,
        headers: { 'content-type': 'application/json' },
        body: {
          preflight: 'failed',
          note: "No Access-Control-Allow-Origin header is present. A cross-origin browser fetch of this response would fail with: \"blocked by CORS policy\".",
          fix: "Add 'Access-Control-Allow-Origin' echoing the request Origin (or *) on the server response.",
        },
      },
    ],
  },
];

/* ── Lab tools ───────────────────────────────────────────────────────────
 * Custom-built tool pages that live outside the /mock/[slug] template matrix
 * (they ship their own bespoke UI under /tools/). They join TOOLS in the nav
 * rail, home grid, and sitemap, but are NOT statically generated from the
 * template workbench.
 */
export const LAB_TOOLS = [
  {
    slug: 'schema-to-mock',
    path: '/tools/schema-to-mock',
    name: 'Schema-to-Mock Simulator',
    navLabel: 'schema-to-mock',
    tagline: 'Paste JSON or cURL — get randomized mock data in the same shape.',
    title: 'Schema to Mock Data Generator — JSON & cURL | MockDock',
    description:
      'Paste raw JSON or a cURL command and instantly generate realistic randomized mock data matching that exact structure. Free, client-side, no signup.',
    keywords: [
      'json schema to mock data',
      'generate mock data from json',
      'curl to mock response',
      'fake data generator no faker',
      'random test data from schema',
    ],
  },
  {
    slug: 'webhook-emulator',
    path: '/tools/webhook-emulator',
    name: 'Webhook Header Emulator',
    navLabel: 'webhook-signer',
    tagline: 'Compute Stripe, GitHub & HMAC-SHA256 signature headers locally.',
    title: 'Webhook Signature Generator — Stripe & GitHub | MockDock',
    description:
      'Compute exact webhook signature headers in your browser: Stripe stripe-signature, GitHub x-hub-signature-256 and generic HMAC-SHA256. Free, no tokens.',
    keywords: [
      'stripe signature header generator',
      'x-hub-signature-256 generator',
      'webhook hmac sha256 calculator',
      'test webhook signature locally',
      'github webhook secret signature',
    ],
  },
];

/** Every navigable tool (template matrix + lab), with resolved hrefs. */
export function allNavTools() {
  return [
    ...TOOLS.map((t) => ({ ...t, href: `/mock/${t.slug}` })),
    ...LAB_TOOLS.map((t) => ({ ...t, href: t.path })),
  ];
}

/** Look up a tool by slug. */
export function getTool(slug) {
  return TOOLS.find((t) => t.slug === slug) ?? null;
}

/** Look up a lab tool by slug. */
export function getLabTool(slug) {
  return LAB_TOOLS.find((t) => t.slug === slug) ?? null;
}

/* ── Contextual relatedness (internal link graph) ────────────────────────
 * Scores sibling tools by shared significant tokens across name + tagline +
 * keywords, ignoring platform-wide stopwords that appear on every tool.
 * Deterministic: stable sort keeps dictionary order on ties.
 */
const RELATED_STOPWORDS = new Set([
  'mock', 'mocks', 'mocking', 'mocker', 'api', 'apis', 'free', 'online',
  'json', 'test', 'testing', 'tool', 'tools', 'generator', 'simulator',
  'response', 'responses', 'data', 'example', 'sample', 'the', 'and', 'for',
  'with', 'without', 'from', 'your', 'no',
]);

function significantTokens(tool) {
  const text = [tool.name, tool.tagline, ...(tool.keywords ?? [])].join(' ').toLowerCase();
  return new Set(
    text
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !RELATED_STOPWORDS.has(w))
      .map((w) => w.replace(/s$/, '')) // light stemming: token/tokens, webhook/webhooks
  );
}

/** The `count` most keyword-adjacent sibling tools for a given slug. */
export function relatedTools(slug, count = 3) {
  const all = allNavTools();
  const self = all.find((t) => t.slug === slug);
  if (!self) return [];
  const selfTokens = significantTokens(self);
  return all
    .filter((t) => t.slug !== slug)
    .map((t) => {
      let score = 0;
      for (const w of significantTokens(t)) if (selfTokens.has(w)) score++;
      return { tool: t, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.tool);
}

/* ── pSEO guardrails ─────────────────────────────────────────────────────
 * Runs on every import (dev server start + production build). A title over
 * 60 chars, a description over 155 chars, or a duplicate slug/title/
 * description anywhere in the matrix fails the build instead of silently
 * shipping a truncated or cannibalized SERP snippet.
 */
function assertSeoInvariants() {
  const seen = { slug: new Set(), title: new Set(), description: new Set() };
  const entries = [
    { slug: '__home__', title: SITE.homeTitle, description: SITE.homeDescription },
    ...TOOLS,
    ...LAB_TOOLS,
  ];
  for (const { slug, title, description } of entries) {
    if (title.length > TITLE_MAX) {
      throw new Error(`[pSEO] title for "${slug}" is ${title.length} chars (max ${TITLE_MAX}): ${title}`);
    }
    if (description.length > DESCRIPTION_MAX) {
      throw new Error(`[pSEO] description for "${slug}" is ${description.length} chars (max ${DESCRIPTION_MAX})`);
    }
    for (const field of ['slug', 'title', 'description']) {
      const value = { slug, title, description }[field];
      if (seen[field].has(value)) throw new Error(`[pSEO] duplicate ${field} detected: ${value}`);
      seen[field].add(value);
    }
  }
}
assertSeoInvariants();
