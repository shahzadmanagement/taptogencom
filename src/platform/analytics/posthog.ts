import { eventBus } from './eventBus';

export function initPostHog(apiKey: string, host = 'https://app.posthog.com') {
  if (typeof window === 'undefined') return;

  const ph = (window as any).posthog = (window as any).posthog || [];
  ph.init = ph.init || function(key: string, config: any) {
    ph._key = key;
    ph._config = config;
  };

  ph.init(apiKey, { api_host: host });

  eventBus.subscribe((event) => {
    if (typeof ph.capture === 'function') {
      ph.capture(event.name, event.payload);
    }
  });
}
