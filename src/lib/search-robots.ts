import fs from 'fs';
import path from 'path';
import { siteConfig } from '../config/site';

export function generateRobotsTxt(
  env: 'production' | 'preview' | 'development',
  siteUrl = siteConfig.url
): string {
  let robots = `# TapToGen Enterprise robots.txt\n`;
  robots += `# Environment: ${env}\n\n`;

  if (env !== 'production') {
    robots += `User-agent: *\n`;
    robots += `Disallow: /\n`;
    return robots;
  }

  // Production Directives
  const disallows = [
    '/api/',
    '/private/',
    '/draft/',
    '/tmp/',
    '/cache/',
    '/node_modules/',
    '/admin/'
  ];

  // 1. Default Bot Rules with Crawl Delay
  robots += `User-agent: *\n`;
  robots += `Allow: /\n`;
  disallows.forEach(d => {
    robots += `Disallow: ${d}\n`;
  });
  robots += `Crawl-delay: 2\n\n`;

  // 2. Googlebot Rules (No Crawl Delay)
  robots += `User-agent: Googlebot\n`;
  robots += `Allow: /\n`;
  disallows.forEach(d => {
    robots += `Disallow: ${d}\n`;
  });
  robots += `\n`;

  // 3. Bingbot Rules (No Crawl Delay)
  robots += `User-agent: Bingbot\n`;
  robots += `Allow: /\n`;
  disallows.forEach(d => {
    robots += `Disallow: ${d}\n`;
  });
  robots += `\n`;

  // 4. Google Crawlers and Ads
  const specialBots = [
    'AdsBot-Google',
    'Googlebot-Image',
    'Googlebot-Video',
    'Googlebot-News'
  ];

  specialBots.forEach(bot => {
    robots += `User-agent: ${bot}\n`;
    robots += `Allow: /\n\n`;
  });

  // Reference sitemap-index.xml
  robots += `Sitemap: ${siteUrl}/sitemap-index.xml\n`;

  return robots;
}

export function writeRobotsTxt(publicDir: string, env: 'production' | 'preview' | 'development'): void {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const content = generateRobotsTxt(env);
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), content);
}
