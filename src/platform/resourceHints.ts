export type HintType = 'preload' | 'prefetch' | 'modulepreload' | 'dns-prefetch' | 'preconnect';

export function injectResourceHint(href: string, rel: HintType, asType?: string) {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector(`link[href="${href}"][rel="${rel}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.href = href;
  link.rel = rel;
  if (asType) {
    link.setAttribute('as', asType);
  }
  document.head.appendChild(link);
}

export function initResourcePrefetchRules() {
  // Preconnect to Google Fonts or related static domains on idle
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      injectResourceHint('https://fonts.googleapis.com', 'preconnect');
      injectResourceHint('https://fonts.gstatic.com', 'preconnect');
    });
  }
}
