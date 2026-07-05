import { getHeartbeat } from '../monitoring/uptime';

export interface HealthStatus {
  status: 'UP' | 'DOWN';
  timestamp: string;
  uptime: number;
  checks: {
    memory: boolean;
    storage: boolean;
  };
}

export function checkSystemHealth(): HealthStatus {
  const hb = getHeartbeat();
  let memoryHealthy = true;

  if (typeof process !== 'undefined') {
    const memoryUsage = process.memoryUsage();
    if (memoryUsage.heapUsed > memoryUsage.heapTotal * 0.9) {
      memoryHealthy = false;
    }
  }

  return {
    status: memoryHealthy ? 'UP' : 'DOWN',
    timestamp: hb.timestamp,
    uptime: hb.uptime,
    checks: {
      memory: memoryHealthy,
      storage: true
    }
  };
}
