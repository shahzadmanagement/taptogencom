import { logger } from '../logger';

export interface RuntimeDiagnostics {
  fps: number;
  memoryLimit?: number;
  memoryUsed?: number;
}

export function observeRuntimeMetrics(onMetric: (m: RuntimeDiagnostics) => void) {
  if (typeof window === 'undefined') return;

  let frames = 0;
  let lastTime = performance.now();

  function loop() {
    frames++;
    const now = performance.now();
    if (now >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (now - lastTime));
      const memory = (performance as any).memory;
      
      onMetric({
        fps,
        memoryLimit: memory?.jsHeapSizeLimit,
        memoryUsed: memory?.usedJSHeapSize
      });

      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
