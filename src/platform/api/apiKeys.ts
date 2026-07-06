const keys = new Set<string>();

/**
 * Generates a mock API key
 * @returns generated API key string
 */
export function generateApiKey(): string {
  const key = `taptogen_live_${Math.random().toString(36).substring(2, 22)}`;
  keys.add(key);
  return key;
}

/**
 * Validates an API key
 * @param key key string
 * @returns outcomes check
 */
export function validateApiKey(key: string): boolean {
  return keys.has(key);
}
