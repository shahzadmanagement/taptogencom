import type { LogTransport, LogMessage } from './logTransport';

export class RemoteLoggerTransport implements LogTransport {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  send(log: LogMessage) {
    if (typeof window === 'undefined') return;

    // Use navigator.sendBeacon for non-blocking analytics logging
    const blob = new Blob([JSON.stringify(log)], { type: 'application/json' });
    try {
      navigator.sendBeacon(this.endpoint, blob);
    } catch (e) {
      // Ignored fallback
    }
  }
}
