import { eventBus } from './event-bus';

export interface VitalMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  inp?: number;
  ttfb?: number;
  tti?: number;
  bundleLoadTime?: number;
}

class PerformanceMonitor {
  private metrics: VitalMetrics = {};

  init(): void {
    if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

    // 1. TTFB & Navigation Timing
    try {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        this.metrics.ttfb = navEntry.responseStart - navEntry.startTime;
      }
    } catch {}

    // 2. FCP
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          this.metrics.fcp = entry.startTime;
          this.publishMetric('fcp', entry.startTime);
        });
        fcpObserver.disconnect();
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch {}

    // 3. LCP
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          this.metrics.lcp = entry.startTime;
          this.publishMetric('lcp', entry.startTime);
        });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}

    // 4. CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            this.publishMetric('cls', clsValue);
          }
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {}

    // 5. Long Tasks Tracker
    try {
      const longTaskObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          eventBus.publish('long_task_detected', {
            startTime: entry.startTime,
            duration: entry.duration
          }, 'low');
        });
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch {}
  }

  private publishMetric(name: string, value: number) {
    eventBus.publish('performance_vital', { metric: name, value }, 'low');
  }

  getMetrics(): VitalMetrics {
    return this.metrics;
  }
}

export const performanceMonitor = new PerformanceMonitor();
export default performanceMonitor;
