export const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://va.vercel-scripts.com"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "https://fonts.gstatic.com"],
  "img-src": ["'self'", "data:", "https://images.unsplash.com"],
  "connect-src": ["'self'", "https://vitals.vercel-insights.com"]
};

export function buildCspHeaderString(): string {
  return Object.entries(cspDirectives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}
