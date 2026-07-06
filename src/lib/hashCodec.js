/**
 * hashCodec.js — the heart of the "Data is in the URL Hash" pattern.
 *
 * A mock response is described by an "envelope":
 *   {
 *     v: 1,                       // codec version, for forward compatibility
 *     status: 200,                // simulated HTTP status code
 *     delay: 0,                   // simulated network latency in ms
 *     headers: { ... },           // simulated response headers
 *     body: "…raw body string…"   // kept as a STRING so intentionally
 *   }                             // malformed JSON survives round-trips
 *
 * The envelope is JSON-stringified, deflated with the native
 * CompressionStream API (zero dependencies), and base64url-encoded so it is
 * safe inside a URL fragment. Nothing ever leaves the browser: the fragment
 * is not sent to any server, which is what makes MockDock private and free.
 */

const CHUNK_SIZE = 0x8000; // 32k chars per btoa/fromCharCode chunk

/** Uint8Array/ArrayBuffer -> base64url string (no padding). */
export function bytesToBase64Url(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK_SIZE));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** base64url string -> Uint8Array. */
export function base64UrlToBytes(encoded) {
  const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Compress arbitrary text into a URL-fragment-safe token. */
export async function compressToHash(text) {
  const input = new TextEncoder().encode(text);
  const stream = new Blob([input]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  const compressed = await new Response(stream).arrayBuffer();
  return bytesToBase64Url(compressed);
}

/** Inflate a token produced by compressToHash back into text. */
export async function decompressFromHash(token) {
  const bytes = base64UrlToBytes(token);
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  const buffer = await new Response(stream).arrayBuffer();
  return new TextDecoder().decode(buffer);
}

/** Build a normalized response envelope from workbench inputs. */
export function buildEnvelope({ status = 200, delay = 0, headers = {}, body = '' }) {
  return {
    v: 1,
    status: Number(status) || 200,
    delay: Math.max(0, Number(delay) || 0),
    headers,
    body: String(body),
  };
}

/** Envelope -> full shareable mock URL, e.g. https://mockdock.dev/api/v1#data=xxxx */
export async function envelopeToUrl(origin, envelope) {
  const token = await compressToHash(JSON.stringify(envelope));
  return `${origin}/api/v1#data=${token}`;
}

/** Parse `#data=xxxx` from a location hash. Returns the token or null. */
export function tokenFromHash(hash) {
  const raw = (hash || '').replace(/^#/, '');
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  return params.get('data');
}

/** Decode a hash token back into a response envelope (with v1 defaults). */
export async function envelopeFromToken(token) {
  const text = await decompressFromHash(token);
  const parsed = JSON.parse(text);
  return {
    v: parsed.v ?? 1,
    status: Number(parsed.status) || 200,
    delay: Math.max(0, Number(parsed.delay) || 0),
    headers: parsed.headers && typeof parsed.headers === 'object' ? parsed.headers : {},
    body: typeof parsed.body === 'string' ? parsed.body : JSON.stringify(parsed.body ?? null),
  };
}

export const STATUS_TEXT = {
  200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No Content',
  301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found',
  405: 'Method Not Allowed', 409: 'Conflict', 418: "I'm a teapot",
  422: 'Unprocessable Entity', 429: 'Too Many Requests',
  500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

export function statusText(code) {
  return STATUS_TEXT[code] || 'Custom Status';
}
