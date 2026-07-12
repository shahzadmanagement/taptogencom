const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const perfPath = path.resolve(__dirname, '../../src/lib/performance-monitor.ts');

describe('Performance Monitor Platform Verification', () => {
  it('Verify observer initialization and nav metrics resolution', () => {
    let observerRegistered = false;
    globalThis.PerformanceObserver = class {
      constructor() {}
      observe() {
        observerRegistered = true;
      }
    };
    globalThis.performance = {
      getEntriesByType: (type) => {
        if (type === 'navigation') {
          return [{ responseStart: 120, startTime: 20 }];
        }
        return [];
      }
    };

    const monitor = loadTS(perfPath).performanceMonitor;
    monitor.init();

    const metrics = monitor.getMetrics();
    assert.equal(metrics.ttfb, 100); // 120 - 20
  });
});
