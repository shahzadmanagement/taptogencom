import { logger } from '../logger';

export function observeWebVitals() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // 1. CLS (Cumulative Layout Shift)
  try {
    const clsObserver = new PerformanceObserver((list) => {
      let cls = 0;
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cls += (entry as any).value;
        }
      }
      logger.info(`[WebVitals] Cumulative Layout Shift (CLS): ${cls.toFixed(4)}`);
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}

  // 2. FID (First Input Delay)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        logger.info(`[WebVitals] First Input Delay (FID): ${delay.toFixed(2)}ms`);
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {}
}
