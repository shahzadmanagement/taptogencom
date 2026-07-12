import { tools } from '../data/tools';
import type { SearchableDocument } from './search-types';

export const searchIndex: SearchableDocument[] = tools.map(t => ({
  id: t.slug,
  title: t.name,
  description: t.tagline || t.description.replace(/<[^>]*>/g, ''),
  category: t.category,
  keywords: [t.primaryKeyword, ...(t.secondaryKeywords || [])],
  url: `/tools/${t.slug}/`
}));
