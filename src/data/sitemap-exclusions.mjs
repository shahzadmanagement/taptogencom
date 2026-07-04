export const noindexToolSlugsForSitemap = [
  'ao3-tag-generator',
  'random-address-generator',
  'fake-name-generator',
  'pin-generator',
  'ransom-note-text-generator',
  'api-key-generator',
  'license-key-generator',
  'recovery-code-generator',
  'invoice-generator',
  'x-post-generator',
  'jwt-generator',
  'receipt-generator',
  'contract-generator',
  'dmca-policy-generator',
  'password-generator',
  'shakespeare-insult-generator',
  'comeback-generator',
  'privacy-policy-generator',
  'terms-generator',
  'roast-generator',
  'tiktok-username-generator',
  'nda-generator',
  'service-agreement-generator',
  'token-generator',
  'shipping-policy-generator',
  'acceptable-use-policy-generator',
  'return-policy-generator',
  'cookie-policy-generator',
  'disclaimer-generator',
  'refund-policy-generator',
  'affiliate-disclosure-generator',
  'instagram-bio-generator',
  'instagram-caption-generator',
  'facebook-post-generator',
  'twitter-bio-generator',
  'tiktok-bio-generator',
  'linkedin-bio-generator',
  'youtube-name-generator',
  'tiktok-name-generator',
  'instagram-name-generator',
  'twitter-name-generator',
  'linkedin-headline-generator',
  'youtube-description-generator',
  'tiktok-caption-generator',
  'linkedin-post-generator',
  'amazon-listing-generator',
  'etsy-listing-generator',
  'youtube-hook-generator',
  'linkedin-summary-generator',
  'chatgpt-prompt-generator',
  'twitter-card-generator',
  'shopify-product-description-generator',
];

export const noindexToolPathSet = new Set(
  noindexToolSlugsForSitemap.map((slug) => `/tools/${slug}/`),
);

export function isNoindexToolPath(pathname) {
  const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (noindexToolPathSet.has(normalizedPathname)) return true;

  const localizedToolMatch = normalizedPathname.match(/^\/[a-z]{2}\/tools\/([^/]+)\/$/);
  if (!localizedToolMatch) return false;

  return noindexToolPathSet.has(`/tools/${localizedToolMatch[1]}/`);
}
