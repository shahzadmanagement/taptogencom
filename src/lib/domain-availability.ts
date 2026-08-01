/**
 * Enterprise Live Domain Availability Engine (Cloudflare DoH)
 *
 * 1. Queries Cloudflare DNS-over-HTTPS (https://cloudflare-dns.com/dns-query)
 * 2. Parses DNS Status:
 *    - Status 3 (NXDOMAIN) -> Available
 *    - Status 0 (NOERROR) with A/AAAA records -> Registered
 *    - Status 2 (SERVFAIL) / Error -> Unknown
 * 3. 15-minute TTL in-memory & sessionStorage cache
 * 4. Concurrency pool limit (Max 5 parallel requests)
 */

export type DomainStatus = 'checking' | 'available' | 'registered' | 'unknown';

export interface DomainCheckResult {
  domain: string;
  name: string;
  tld: string;
  status: DomainStatus;
  timestamp: number;
  error?: string;
}

const CLOUDFLARE_DOH = 'https://cloudflare-dns.com/dns-query';
const TTL_MS = 15 * 60 * 1000; // 15 Minutes
const MAX_CONCURRENCY = 5;

// In-Memory Cache
const memoryCache = new Map<string, DomainCheckResult>();

function getSessionCacheKey(domain: string): string {
  return `taptogen-domain-${domain.toLowerCase()}`;
}

export function getCachedResult(domain: string): DomainCheckResult | null {
  const key = domain.toLowerCase();
  
  // Check Memory Cache
  if (memoryCache.has(key)) {
    const cached = memoryCache.get(key)!;
    if (Date.now() - cached.timestamp < TTL_MS) {
      return cached;
    }
    memoryCache.delete(key);
  }

  // Check Session Storage
  if (typeof sessionStorage !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(getSessionCacheKey(key));
      if (stored) {
        const parsed: DomainCheckResult = JSON.parse(stored);
        if (Date.now() - parsed.timestamp < TTL_MS) {
          memoryCache.set(key, parsed);
          return parsed;
        }
        sessionStorage.removeItem(getSessionCacheKey(key));
      }
    } catch (e) {}
  }

  return null;
}

function setCachedResult(result: DomainCheckResult) {
  const key = result.domain.toLowerCase();
  memoryCache.set(key, result);

  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.setItem(getSessionCacheKey(key), JSON.stringify(result));
    } catch (e) {}
  }
}

export async function checkDomainAvailability(
  name: string,
  tld: string = 'com',
  signal?: AbortSignal
): Promise<DomainCheckResult> {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9\-]/g, '');
  const cleanTld = tld.toLowerCase().replace(/^\./, '');
  const domain = `${cleanName}.${cleanTld}`;

  // Check Cache First
  const cached = getCachedResult(domain);
  if (cached) return cached;

  // Offline Guard
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      domain,
      name: cleanName,
      tld: cleanTld,
      status: 'unknown',
      timestamp: Date.now(),
      error: 'Offline'
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 Second Timeout

    // Chain caller signal if provided
    if (signal) {
      signal.addEventListener('abort', () => controller.abort());
    }

    const url = `${CLOUDFLARE_DOH}?name=${encodeURIComponent(domain)}&type=A`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/dns-json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`DNS Query Error HTTP ${response.status}`);
    }

    const data = await response.json();
    let status: DomainStatus = 'unknown';

    // Cloudflare DoH Status: 3 = NXDOMAIN (Available), 0 = NOERROR (Registered if Answer present)
    if (data.Status === 3) {
      status = 'available';
    } else if (data.Status === 0 && Array.isArray(data.Answer) && data.Answer.length > 0) {
      status = 'registered';
    } else if (data.Status === 0 && (!data.Answer || data.Answer.length === 0)) {
      status = 'available';
    } else {
      status = 'unknown';
    }

    const result: DomainCheckResult = {
      domain,
      name: cleanName,
      tld: cleanTld,
      status,
      timestamp: Date.now()
    };

    setCachedResult(result);
    return result;
  } catch (err: any) {
    const result: DomainCheckResult = {
      domain,
      name: cleanName,
      tld: cleanTld,
      status: 'unknown',
      timestamp: Date.now(),
      error: err?.message || 'Check failed'
    };
    return result;
  }
}

// Concurrency Queue Manager (Max 5 parallel lookups)
export class DomainCheckQueue {
  private queue: Array<() => Promise<void>> = [];
  private activeCount: number = 0;
  private maxConcurrency: number = MAX_CONCURRENCY;

  public add(fn: () => Promise<void>) {
    this.queue.push(fn);
    this.next();
  }

  public clear() {
    this.queue = [];
  }

  private next() {
    if (this.activeCount >= this.maxConcurrency || this.queue.length === 0) return;

    const task = this.queue.shift();
    if (!task) return;

    this.activeCount++;
    task().finally(() => {
      this.activeCount--;
      this.next();
    });
  }
}
