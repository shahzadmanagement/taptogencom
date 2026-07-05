export interface SearchIndexEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  locale: string;
  priority: number;
  updatedAt: string;
}

export const searchIndex: SearchIndexEntry[] = [
  {
    slug: 'fancy-text-generator',
    title: 'Fancy Text Generator',
    description: 'Convert standard plain text into aesthetic fonts & symbols.',
    category: 'Typography',
    keywords: ['fancy text', 'font changer', 'aesthetic letters'],
    locale: 'en',
    priority: 1.0,
    updatedAt: '2026-07-06'
  },
  {
    slug: 'bold-text-generator',
    title: 'Bold Text Generator',
    description: 'Convert standard text into bold unicode fonts instantly.',
    category: 'Typography',
    keywords: ['bold text', 'unicode bold', 'LinkedIn formatting'],
    locale: 'en',
    priority: 0.9,
    updatedAt: '2026-07-06'
  },
  {
    slug: 'cursive-text-generator',
    title: 'Cursive Text Generator',
    description: 'Convert standard text into cursive/script unicode letters.',
    category: 'Typography',
    keywords: ['cursive fonts', 'script text generator'],
    locale: 'en',
    priority: 0.8,
    updatedAt: '2026-07-06'
  }
];
