import { logger } from './logger';

export function startMark(name: string) {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(`${name}-start`);
  }
}

export function endMark(name: string) {
  if (typeof performance !== 'undefined' && performance.mark && performance.measure) {
    const startName = `${name}-start`;
    const endName = `${name}-end`;
    performance.mark(endName);
    try {
      performance.measure(name, startName, endName);
      const entries = performance.getEntriesByName(name);
      if (entries.length > 0) {
        const duration = entries[entries.length - 1].duration;
        logger.debug(`[Performance] "${name}" duration: ${duration.toFixed(2)}ms`);
        return duration;
      }
    } catch (e) {
      // Ignore mismatch marks errors
    }
  }
  return 0;
}

export async function measure<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
  startMark(name);
  try {
    const result = await fn();
    endMark(name);
    return result;
  } catch (err) {
    endMark(name);
    throw err;
  }
}
