/**
 * Validates check format of URLs schemas
 * @param url input URL string
 * @returns boolean checking result
 */
export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
