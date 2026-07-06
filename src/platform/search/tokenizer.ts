/**
 * Splits text into normalized query search tokens
 * @param text input query string
 * @returns list of word tokens
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(token => token.length > 0);
}
