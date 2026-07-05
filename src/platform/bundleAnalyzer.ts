import { logger } from './logger';

export interface PerformanceMetrics {
  navigationTime?: number;
  domReady?: number;
  loadEvent?: number;
  memoryLimit?: number;
  memoryUsed?: number;
}

export function observeBundlePerformance(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {};
  if (typeof window !== 'undefined' && window.performance) {
    const timing = performance.timing;
    if (timing) {
      metrics.navigationTime = timing.responseEnd - timing.navigationStart;
      metrics.domReady = timing.domInteractive - timing.navigationStart;
      metrics.loadEvent = timing.loadEventEnd - timing.navigationStart;
    }

    const performanceEntries = performance.getEntriesByType('resource');
    const totalResourceBytes = performanceEntries.reduce((acc, entry: any) => {
      return acc + (entry.transferSize || 0);
    }, 0);
    logger.debug(`[BundleAnalyzer] Total resource transfer size: ${(totalResourceBytes / 1024).toFixed(2)} KB`);

    const memory = (performance as any).memory;
    if (memory) {
      metrics.memoryLimit = memory.jsHeapSizeLimit;
      metrics.memoryUsed = memory.usedJSHeapSize;
    }
  }
  return metrics;
}

export function initPerformanceObservers() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // 1. Long Task Observer
    try {
      const longtaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          logger.warn(`[PerformanceObserver] Long Task detected: ${entry.duration.toFixed(2)}ms`, entry);
        });
      });
      longtaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Ignored if longtask not supported
    }

    // 2. Largest Contentful Paint (LCP) Observer
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          logger.info(`[PerformanceObserver] LCP metric: ${entry.startTime.toFixed(2)}ms`);
        });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Ignored
    }
  }
}
