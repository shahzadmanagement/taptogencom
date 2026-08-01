/**
 * Enterprise Vercel Edge Middleware — Nonce-based Content Security Policy (CSP)
 *
 * Generates a cryptographically secure 128-bit random base64 nonce per request,
 * attaches it to the response Content-Security-Policy header, and injects nonce="${nonce}"
 * into all HTML script tags dynamically at the Edge.
 */

export const config = {
  matcher: ['/((?!_astro|_next|static|favicon.ico|sitemap).*)'],
};

export default async function middleware(request) {
  // Generate cryptographically secure 128-bit random base64 nonce
  const nonceBuffer = new Uint8Array(16);
  crypto.getRandomValues(nonceBuffer);
  const nonce = btoa(String.fromCharCode(...nonceBuffer));

  const response = await fetch(request);
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('text/html')) {
    let html = await response.text();
    // Inject nonce attribute into all <script> tags
    html = html.replace(/<script(?![^>]*\bnonce=)([^>]*)>/gi, `<script nonce="${nonce}"$1>`);

    const newHeaders = new Headers(response.headers);
    const csp = `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net; frame-ancestors 'none'; upgrade-insecure-requests;`;
    newHeaders.set('Content-Security-Policy', csp);

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
}
