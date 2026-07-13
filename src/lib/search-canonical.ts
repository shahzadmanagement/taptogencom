import { siteConfig } from '../config/site';

export function resolveCanonicalUrl(input: string): string {
  if (!input) {
    return `${siteConfig.url}/`;
  }

  // 1. Strip query params and hashes
  let clean = input.split('?')[0].split('#')[0];

  // 2. Extract pathname if absolute URL
  if (clean.includes('://')) {
    try {
      const urlObj = new URL(clean);
      clean = urlObj.pathname;
    } catch {
      const match = clean.match(/:\/\/([^/]+)(.*)/);
      clean = match ? match[2] : clean;
    }
  }

  // 3. Normalize to lowercase
  clean = clean.toLowerCase();

  // 4. Remove duplicate slashes
  clean = clean.replace(/\/+/g, '/');

  // 5. Ensure leading slash
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }

  // 6. Standardize trailing slash
  const hasExtension = /\.[a-z0-9]+$/i.test(clean);
  if (!hasExtension && !clean.endsWith('/') && clean !== '/') {
    clean += '/';
  }

  return `${siteConfig.url}${clean}`;
}
