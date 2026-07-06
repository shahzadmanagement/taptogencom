/**
 * Parsed query representation
 */
export interface ParsedQuery {
  raw: string;
  terms: string[];
  filters: Record<string, string>;
}

/**
 * Parses search query, separating term tokens and filters key-values
 * @param query search query string
 * @returns ParsedQuery object
 */
export function parseQuery(query: string): ParsedQuery {
  const terms: string[] = [];
  const filters: Record<string, string> = {};
  const raw = query;

  const parts = query.split(/\s+/);
  parts.forEach(part => {
    if (part.includes(':')) {
      const [key, val] = part.split(':');
      if (key && val) {
        filters[key.toLowerCase()] = val.toLowerCase();
      }
    } else if (part.trim()) {
      terms.push(part.toLowerCase());
    }
  });

  return { raw, terms, filters };
}
