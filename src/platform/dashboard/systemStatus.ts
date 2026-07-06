export interface SystemStatusData {
  cpuUsagePercent: number;
  memoryUsageBytes: number;
  diskFreeBytes: number;
  status: 'OPERATIONAL' | 'DEGRADED';
}

export function fetchSystemStatus(): SystemStatusData {
  return {
    cpuUsagePercent: 12,
    memoryUsageBytes: 42000000,
    diskFreeBytes: 85000000000,
    status: 'OPERATIONAL'
  };
}
