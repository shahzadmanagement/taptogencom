export interface UsageRecord {
  apiKey: string;
  requestsCount: number;
  lastUsedAt: string;
}

const usage = new Map<string, UsageRecord>();

/**
 * Tracks usage request increments for key
 * @param apiKey key string
 */
export function recordApiRequest(apiKey: string) {
  const record = usage.get(apiKey) || { apiKey, requestsCount: 0, lastUsedAt: '' };
  record.requestsCount++;
  record.lastUsedAt = new Date().toISOString();
  usage.set(apiKey, record);
}

/**
 * Retrieves usage stats of key
 * @param apiKey key string
 * @returns stats
 */
export function getApiKeyUsage(apiKey: string): UsageRecord | null {
  return usage.get(apiKey) || null;
}
