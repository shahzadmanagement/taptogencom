export interface SystemStats {
  nodeVersion: string;
  platform: string;
  memoryLimit: number;
}

class SystemOverview {
  getStats(): SystemStats {
    return {
      nodeVersion: typeof process !== 'undefined' ? process.version : 'unknown',
      platform: typeof process !== 'undefined' ? process.platform : 'browser',
      memoryLimit: typeof process !== 'undefined' ? process.memoryUsage().heapTotal : 0
    };
  }
}

export const systemOverview = new SystemOverview();
