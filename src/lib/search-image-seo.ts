import { siteConfig } from '../config/site';

export interface ImageMetadata {
  url: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync' | 'auto';
  fetchpriority: 'high' | 'low' | 'auto';
  mimeType: string;
  schema: {
    '@type': 'ImageObject';
    url: string;
    width: string;
    height: string;
    caption: string;
  };
  sitemap: {
    'image:loc': string;
    'image:title': string;
    'image:caption': string;
  };
}

export function getImageMetadata(src: string, type: 'hero' | 'icon' | 'screenshot' | 'preview' | 'logo' | 'category' | 'hub' | 'blog' | 'general' = 'general'): ImageMetadata {
  const absoluteUrl = src.startsWith('http') ? src : `${siteConfig.url}${src}`;
  
  let alt = 'TapToGen Browser Utilities and Free Generator Tools';
  let title = 'TapToGen Portal Image';
  let caption = 'Premium free browser-based text styling, random naming, and SEO generators.';
  let width = 800;
  let height = 600;
  let mimeType = 'image/png';
  let loading: 'lazy' | 'eager' = 'lazy';
  let decoding: 'async' | 'sync' | 'auto' = 'async';
  let fetchpriority: 'high' | 'low' | 'auto' = 'auto';

  // 1. Resolve dimensions, alt, title and caption based on image source/type
  if (src.includes('og-') || type === 'logo' || type === 'general') {
    alt = 'TapToGen Premium Browser Utilities and Generator Tools';
    title = 'TapToGen Brand Presentation';
    caption = 'Free generator tools for styling fonts, generating names, social bios, and web metrics.';
    width = 1200;
    height = 630;
    mimeType = 'image/png';
  } else if (type === 'hero') {
    alt = 'TapToGen Platform Hero Illustration';
    title = 'TapToGen Creative Tools Board';
    caption = 'Get started with instant browser tools.';
    width = 1440;
    height = 900;
    loading = 'eager';
    fetchpriority = 'high';
  } else if (type === 'screenshot' || type === 'preview') {
    alt = 'TapToGen Interactive Generator Interface Preview';
    title = 'Tool Dashboard Screenshot';
    caption = 'Live interactive options panel showing text outputs copy paste commands.';
    width = 1024;
    height = 768;
    mimeType = 'image/webp';
  } else if (type === 'category' || type === 'hub') {
    alt = 'TapToGen Topics Group Collection';
    title = 'Category Cluster View';
    caption = 'Browse related utility tools in this collection.';
    width = 600;
    height = 400;
    mimeType = 'image/jpeg';
  } else if (type === 'blog') {
    alt = 'TapToGen Editorial Article Cover';
    title = 'Blog Post Banner';
    caption = 'Read guides, design systems tutorials, and coding tips.';
    width = 800;
    height = 500;
    mimeType = 'image/webp';
  }

  // 2. Adjust loading & fetch priority based on category/type
  if (type === 'hero') {
    loading = 'eager';
    fetchpriority = 'high';
  } else {
    loading = 'lazy';
    fetchpriority = 'auto';
  }

  return {
    url: absoluteUrl,
    alt,
    title,
    caption,
    width,
    height,
    loading,
    decoding,
    fetchpriority,
    mimeType,
    schema: {
      '@type': 'ImageObject',
      url: absoluteUrl,
      width: width.toString(),
      height: height.toString(),
      caption
    },
    sitemap: {
      'image:loc': absoluteUrl,
      'image:title': title,
      'image:caption': caption
    }
  };
}
