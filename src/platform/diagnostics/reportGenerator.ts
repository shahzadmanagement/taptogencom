import { checkSystemHealth } from './systemHealth';

export function generateDiagnosticsReport(): string {
  const health = checkSystemHealth();
  return JSON.stringify({
    report: 'Platform Operations Diagnostics Report',
    generatedAt: new Date().toISOString(),
    status: health.status,
    uptimeSeconds: health.uptime,
    checks: health.checks
  }, null, 2);
}
