import { siteConfig } from '../config/site';

export function generateRobotsTxt(env: 'production' | 'preview' | 'development'): string {
  if (env === 'preview' || env === 'development') {
    return `# Robots.txt for ${env} environment\nUser-agent: *\nDisallow: /\n`;
  }

  return `# Robots.txt for production environment
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteConfig.url}/sitemap-index.xml
`;
}
