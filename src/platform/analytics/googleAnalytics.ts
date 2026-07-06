import { eventBus } from './eventBus';

export function initGoogleAnalytics(measurementId: string) {
  if (typeof window === 'undefined') return;

  // Setup dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId);

  // Subscribe to global event bus events
  eventBus.subscribe((event) => {
    gtag('event', event.name, event.payload);
  });
}
