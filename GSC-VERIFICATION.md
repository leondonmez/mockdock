# Google Search Console — Domain Verification (mockdock.dev)

Two verification paths are wired and ready. Use **Method A (DNS TXT)** for
production: it verifies the entire domain (all subdomains, http + https) and
never breaks on redeploys. Method B is the per-page fallback.

---

## Method A — DNS TXT record (recommended: "Domain" property)

This verifies `mockdock.dev` at the registrar level. MockDock's DNS is managed
at **Namecheap** (per the project's hosting setup).

### Step-by-step

1. In **Google Search Console** → *Add property* → choose the **Domain** tile
   (left column) → enter `mockdock.dev` → **Continue**.
2. GSC shows a TXT record value like:
   `google-site-verification=AbCdEf1234567890xyz...`
   Copy the **entire** string (including the `google-site-verification=` prefix).
3. Sign in to **Namecheap** → *Domain List* → **Manage** next to `mockdock.dev`
   → **Advanced DNS** tab.
4. Under **Host Records** → **Add New Record**:
   | Field | Value |
   | --- | --- |
   | Type | `TXT Record` |
   | Host | `@` |
   | Value | `google-site-verification=AbCdEf1234567890xyz...` |
   | TTL | `Automatic` (or `5 min` to propagate faster) |
5. **Save all changes** (green checkmark).
6. Wait for propagation (typically 5–30 min; up to 24–48 h worst case).
   Verify from a terminal:
   ```sh
   dig -t txt mockdock.dev +short
   # or
   nslookup -type=TXT mockdock.dev
   ```
   You should see your `google-site-verification=...` string returned.
7. Back in GSC → **Verify**. Do **not** delete the TXT record afterward —
   removing it un-verifies the property.

> Keeping any pre-existing TXT records (SPF, DMARC, etc.) is fine — a domain
> can hold multiple TXT records simultaneously. Add, don't replace.

### After verification

- Submit the sitemap: GSC → *Sitemaps* → enter `sitemap.xml` → **Submit**.
  (Full URL resolves to `https://mockdock.dev/sitemap.xml`.)
- Request indexing for the homepage and a few flagship tool URLs via the
  **URL Inspection** tool to seed initial discovery.

---

## Method B — HTML `<meta>` tag ("URL prefix" property)

Use this if you cannot edit DNS. It only verifies the exact `https://mockdock.dev`
origin, not subdomains.

1. In GSC → *Add property* → **URL prefix** → enter `https://mockdock.dev`.
2. Choose the **HTML tag** method. GSC gives you a token, e.g. `AbC123...XyZ`.
3. Open `src/layouts/BaseLayout.astro` and paste the token into the constant
   near the top of the frontmatter:
   ```js
   const GOOGLE_SITE_VERIFICATION = 'AbC123...XyZ';
   ```
   When non-empty, the layout renders on **every** page:
   ```html
   <meta name="google-site-verification" content="AbC123...XyZ" />
   ```
4. Deploy (`npm run build` → push to Vercel).
5. Back in GSC → **Verify**. Leave the constant in place permanently.

---

## Quick reference

| Item | Value |
| --- | --- |
| Sitemap URL | `https://mockdock.dev/sitemap.xml` |
| robots.txt | `https://mockdock.dev/robots.txt` |
| Verification meta hook | `GOOGLE_SITE_VERIFICATION` in `src/layouts/BaseLayout.astro` |
| DNS host (registrar) | Namecheap → Advanced DNS → TXT `@` |
| Excluded from index | `/api/v1` (noindex + robots Disallow) |
