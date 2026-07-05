export interface HeartbeatPayload {
  status: 'healthy';
  timestamp: string;
  uptime: number; // in seconds
}

const launchTime = Date.now();

export function getHeartbeat(): HeartbeatPayload {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - launchTime) / 1000)
  };
}
