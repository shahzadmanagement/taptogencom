import { getAutocompleteCompletions } from './autocomplete';

/**
 * Returns alternative recommendations or fuzzy spell checks
 * @param query search query string
 * @returns recommendations list
 */
export function getQuerySuggestions(query: string): string[] {
  const completions = getAutocompleteCompletions(query);
  if (completions.length > 0) return completions;

  // Simple fuzzy fallback check
  const terms = query.toLowerCase().split(/\s+/);
  if (terms.includes('text') || terms.includes('generator')) {
    return ['fancy text generator', 'bold text generator'];
  }

  return [];
}
