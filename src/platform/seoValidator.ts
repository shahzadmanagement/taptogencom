import { tools } from '../data/tools';
import { searchIndex } from '../data/search-index';

export interface SeoValidationReport {
  passed: boolean;
  warnings: string[];
}

export function validateSeoMetrics(): SeoValidationReport {
  const warnings: string[] = [];

  // Check unique slug registrations
  const slugs = new Set<string>();
  tools.forEach(t => {
    if (slugs.has(t.slug)) {
      warnings.push(`Duplicate slug detected: "${t.slug}"`);
    }
    slugs.add(t.slug);

    // Check meta title length
    if (!t.metaTitle || t.metaTitle.length < 10) {
      warnings.push(`Tool "${t.slug}" has a missing or too short meta title.`);
    }

    // Check meta description
    if (!t.metaDescription || t.metaDescription.length < 30) {
      warnings.push(`Tool "${t.slug}" has a missing or too short meta description.`);
    }

    // Check FAQ count
    if (t.faqItems.length === 0) {
      warnings.push(`Tool "${t.slug}" is missing FAQ structured items.`);
    }
  });

  return {
    passed: warnings.length === 0,
    warnings
  };
}
