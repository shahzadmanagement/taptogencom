const candidates = [
  'fancy text generator',
  'bold text generator',
  'cursive text generator',
  'strikethrough text generator',
  'italic text generator',
  'underline text generator'
];

/**
 * Returns autocomplete selections matching prefix string
 * @param prefix search prefix
 * @returns completions list
 */
export function getAutocompleteCompletions(prefix: string): string[] {
  const norm = prefix.toLowerCase().trim();
  if (!norm) return [];
  return candidates.filter(c => c.startsWith(norm));
}
