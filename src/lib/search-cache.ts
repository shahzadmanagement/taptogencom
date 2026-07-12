export interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  hitRatio: number;
}

interface CacheEntry<T> {
  value: T;
  expiry: number;
  lastUsed: number;
}

export class LruCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxCapacity: number;
  private ttlMs: number;
  private hits = 0;
  private misses = 0;
  private evictions = 0;

  constructor(maxCapacity = 200, ttlMs = 5 * 60 * 1000) {
    this.maxCapacity = maxCapacity;
    this.ttlMs = ttlMs;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    entry.lastUsed = Date.now();
    this.hits++;
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxCapacity) {
      // Find least recently used entry to evict
      let lruKey: string | null = null;
      let oldestTime = Infinity;

      this.cache.forEach((entry, k) => {
        if (entry.lastUsed < oldestTime || (entry.lastUsed === oldestTime && lruKey !== null && k < lruKey)) {
          oldestTime = entry.lastUsed;
          lruKey = k;
        }
      });

      if (lruKey) {
        this.cache.delete(lruKey);
        this.evictions++;
      }
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttlMs,
      lastUsed: Date.now()
    });
  }

  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      evictions: this.evictions,
      hitRatio: total > 0 ? this.hits / total : 0
    };
  }

  warmup(keys: string[], resolver: (key: string) => T): void {
    keys.forEach(k => {
      this.set(k, resolver(k));
    });
  }

  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
  }
}
