import { eventBus } from '../analytics/eventBus';

export function sendErrorTelemetry(message: string, error?: any) {
  eventBus.publish('telemetry_error', {
    message,
    errorStack: error?.stack || String(error),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
    url: typeof window !== 'undefined' ? window.location.href : 'Server'
  });
}
