export class AiCache {
  private cache = new Map<string, { value: any; expiry: number }>();
  private maxItems: number;
  private ttlMs: number;

  constructor(maxItems = 100, ttlMs = 3600000) {
    this.maxItems = maxItems;
    this.ttlMs = ttlMs;
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  set(key: string, value: any): void {
    if (this.cache.size >= this.maxItems) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttlMs
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const globalAiCache = new AiCache();
