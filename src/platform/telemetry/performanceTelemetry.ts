import { eventBus } from '../analytics/eventBus';

export function sendPerformanceTelemetry(name: string, duration: number) {
  eventBus.publish('telemetry_performance', {
    metricName: name,
    durationMs: duration,
    connectionType: (navigator as any)?.connection?.effectiveType || 'unknown'
  });
}
