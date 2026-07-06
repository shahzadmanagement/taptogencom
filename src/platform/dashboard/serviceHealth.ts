export interface ServiceHealthData {
  serviceName: string;
  status: 'ONLINE' | 'OFFLINE';
  latencyMs: number;
}

export function fetchServicesHealth(): ServiceHealthData[] {
  return [
    { serviceName: 'Vercel Edge Functions CDN', status: 'ONLINE', latencyMs: 14 },
    { serviceName: 'Plausible Web Analytics', status: 'ONLINE', latencyMs: 24 },
    { serviceName: 'PostHog Session Recording', status: 'ONLINE', latencyMs: 38 }
  ];
}
