import { eventBus } from './eventBus';

export function initPlausible(domain: string) {
  if (typeof window === 'undefined') return;

  (window as any).plausible = (window as any).plausible || function(...args: any[]) {
    ((window as any).plausible.q = (window as any).plausible.q || []).push(args);
  };

  eventBus.subscribe((event) => {
    (window as any).plausible(event.name, { props: event.payload });
  });
}
