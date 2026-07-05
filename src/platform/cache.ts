export interface CacheOptions {
  ttl?: number; // Time-to-live in ms
  version?: string;
}

export interface CacheEntry<T> {
  value: T;
  expiry?: number;
  version?: string;
}

class PlatformCache {
  private memoryCache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, value: T, type: 'memory' | 'session' | 'local' = 'memory', options: CacheOptions = {}): boolean {
    const entry: CacheEntry<T> = {
      value,
      expiry: options.ttl ? Date.now() + options.ttl : undefined,
      version: options.version
    };

    switch (type) {
      case 'memory':
        this.memoryCache.set(key, entry);
        return true;
      case 'session':
        try {
          sessionStorage.setItem(key, JSON.stringify(entry));
          return true;
        } catch {
          return false;
        }
      case 'local':
        try {
          localStorage.setItem(key, JSON.stringify(entry));
          return true;
        } catch {
          return false;
        }
    }
  }

  get<T>(key: string, type: 'memory' | 'session' | 'local' = 'memory', currentVersion?: string): T | null {
    let entry: CacheEntry<T> | null = null;

    switch (type) {
      case 'memory':
        entry = this.memoryCache.get(key) || null;
        break;
      case 'session':
        try {
          const val = sessionStorage.getItem(key);
          entry = val ? JSON.parse(val) : null;
        } catch {
          entry = null;
        }
        break;
      case 'local':
        try {
          const val = localStorage.getItem(key);
          entry = val ? JSON.parse(val) : null;
        } catch {
          entry = null;
        }
        break;
    }

    if (!entry) return null;

    // Check expiration
    if (entry.expiry && Date.now() > entry.expiry) {
      this.remove(key, type);
      return null;
    }

    // Check version invalidation
    if (currentVersion && entry.version !== currentVersion) {
      this.remove(key, type);
      return null;
    }

    return entry.value;
  }

  remove(key: string, type: 'memory' | 'session' | 'local' = 'memory') {
    switch (type) {
      case 'memory':
        this.memoryCache.delete(key);
        break;
      case 'session':
        try { sessionStorage.removeItem(key); } catch {}
        break;
      case 'local':
        try { localStorage.removeItem(key); } catch {}
        break;
    }
  }
}

export const cache = new PlatformCache();
