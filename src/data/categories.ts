export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: 'name-generators',
    name: 'Name Generators',
    icon: '👤',
    description: 'Generate unique names for characters, pets, businesses, games, and more. From fantasy names to real-world baby names, find the perfect name instantly.',
    metaTitle: 'Name Generators — Random, Fantasy, Business & More',
    metaDescription: 'Generate unique names for any purpose. Fantasy names, baby names, pet names, business names, and character names — all free and instant.',
    color: '#6c5ce7',
  },
  {
    slug: 'text-font-generators',
    name: 'Font & Text Style Generators',
    icon: '✨',
    description: 'Transform your text with fancy fonts, bold styles, cursive, glitch effects, and Unicode art. Copy and paste stylish text anywhere.',
    metaTitle: 'Fancy Text & Font Generators — Stylish Text Copy Paste',
    metaDescription: 'Generate fancy text, bold fonts, cursive, glitch text, and more stylish Unicode text styles. Copy and paste anywhere — free and instant.',
    color: '#a855f7',
  },
  {
    slug: 'social-media-tools',
    name: 'Social Media & Tag Generators',
    icon: '📱',
    description: 'Generate hashtags, tags, bios, captions, and usernames optimized for Instagram, TikTok, YouTube, Twitter, and other social platforms.',
    metaTitle: 'Social Media Generators — Hashtags, Bios, Tags & More',
    metaDescription: 'Generate hashtags, bios, captions, and tags for Instagram, TikTok, YouTube, and Twitter. Boost your social media presence instantly.',
    color: '#ec4899',
  },
  {
    slug: 'seo-generators',
    name: 'SEO & Marketing Generators',
    icon: '🔍',
    description: 'Generate meta tags, title tags, robots.txt, schema markup, and other SEO essentials to boost your website visibility in search engines.',
    metaTitle: 'SEO Generators — Meta Tags, Title Tags & Schema Tools',
    metaDescription: 'Generate meta tags, SEO titles, robots.txt, hreflang tags, and schema markup. Free SEO tools to improve your search engine rankings.',
    color: '#06b6d4',
  },
  {
    slug: 'business-generators',
    name: 'Business & Brand Generators',
    icon: '💼',
    description: 'Generate business names, brand names, domain names, product names, and professional content for your startup or business.',
    metaTitle: 'Business Name & Brand Generators — Free Tools',
    metaDescription: 'Generate business names, brand names, domain ideas, and product names. Free tools for entrepreneurs and startups.',
    color: '#10b981',
  },
  {
    slug: 'gaming-generators',
    name: 'Gaming & Fantasy Generators',
    icon: '🎮',
    description: 'Generate fantasy names, character names, clan names, gamertags, and creative gaming content for D&D, RPGs, and online games.',
    metaTitle: 'Gaming & Fantasy Name Generators — D&D, RPG & More',
    metaDescription: 'Generate fantasy names, gamertags, clan names, and character names for D&D, RPGs, and online gaming. Free and instant.',
    color: '#f59e0b',
  },
  {
    slug: 'ai-writing-generators',
    name: 'AI Text & Writing Generators',
    icon: '🤖',
    description: 'Generate articles, paragraphs, sentences, prompts, and creative writing content with smart template-based text generation.',
    metaTitle: 'AI Text & Writing Generators — Free Content Tools',
    metaDescription: 'Generate text, paragraphs, writing prompts, and creative content. Smart text generation tools for writers, bloggers, and creators.',
    color: '#8b5cf6',
  },
  {
    slug: 'bio-caption-generators',
    name: 'Bio & Caption Generators',
    icon: '📝',
    description: 'Generate professional bios, social media captions, profile descriptions, and about-me text for any platform.',
    metaTitle: 'Bio & Caption Generators — Instagram, Twitter & More',
    metaDescription: 'Generate bios, captions, and profile descriptions for Instagram, Twitter, LinkedIn, and TikTok. Free and instant.',
    color: '#f43f5e',
  },
  {
    slug: 'creative-generators',
    name: 'Creative & Story Generators',
    icon: '🎨',
    description: 'Generate story ideas, character concepts, band names, song names, superhero names, and other creative inspiration.',
    metaTitle: 'Creative Generators — Stories, Names & Ideas',
    metaDescription: 'Generate creative inspiration — story ideas, band names, song names, superhero names, and character concepts. Free and instant.',
    color: '#e11d48',
  },
  {
    slug: 'utility-generators',
    name: 'Utility Generators',
    icon: '🔧',
    description: 'Generate passwords, UUIDs, QR codes, lorem ipsum, random numbers, and other useful developer and productivity utilities.',
    metaTitle: 'Utility Generators — Passwords, UUIDs, QR Codes & More',
    metaDescription: 'Generate passwords, UUIDs, QR codes, lorem ipsum, and random numbers. Essential utility tools for developers and creators.',
    color: '#0ea5e9',
  },
  {
    slug: 'random-generators',
    name: 'Random Generators',
    icon: '🎲',
    description: 'Generate random names, numbers, phrases, sentences, and other random content for fun, testing, and creative purposes.',
    metaTitle: 'Random Generators — Numbers, Names, Phrases & More',
    metaDescription: 'Generate random numbers, names, phrases, and sentences. Fun and useful random generators for any purpose.',
    color: '#14b8a6',
  },
  {
    slug: 'developer-generators',
    name: 'Developer & Web Generators',
    icon: '💻',
    description: 'Generate code snippets, JSON, HTML, CSS, regex patterns, and other web development essentials to speed up your workflow.',
    metaTitle: 'Developer Generators — Code, JSON, HTML & CSS Tools',
    metaDescription: 'Generate code snippets, JSON formatters, HTML/CSS generators, and regex patterns. Free developer tools for faster coding.',
    color: '#6366f1',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getCategoryNames(): string[] {
  return categories.map(c => c.name);
}
