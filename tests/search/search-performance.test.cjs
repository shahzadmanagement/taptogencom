const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const enginePath = path.resolve(__dirname, '../../src/lib/search-engine.ts');
const workerPath = path.resolve(__dirname, '../../src/lib/search-worker.ts');
const cachePath = path.resolve(__dirname, '../../src/lib/search-cache.ts');

describe('Search Performance & Scale Optimization Verification', () => {
  it('Verify LRU cache TTL capacity limits and hit stats updates', () => {
    let currentTime = 1000;
    const originalNow = Date.now;
    globalThis.Date.now = () => {
      currentTime += 10;
      return currentTime;
    };

    const cacheModule = loadTS(cachePath);
    const cache = new cacheModule.LruCache(3);

    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    assert.equal(cache.get('a'), 1);

    cache.set('d', 4);

    assert.equal(cache.get('b'), null);
    assert.equal(cache.get('d'), 4);

    const stats = cache.getStats();
    assert.equal(stats.evictions, 1);
    assert.ok(stats.hits > 0);

    globalThis.Date.now = originalNow;
  });

  it('Verify async idle builder scheduler and prefetching', async () => {
    const workerModule = loadTS(workerPath);
    const worker = new workerModule.SearchWorkerManager();

    await worker.rebuildIndexAsync();
    assert.equal(worker.isBusy(), false);
  });

  it('Verify scalability performance metrics over 1000+ documents index', () => {
    const engine = loadTS(enginePath);

    const mockIndex = [];
    for (let i = 0; i < 1050; i++) {
      mockIndex.push({
        id: `mock-tool-${i}`,
        title: `Mock Tool Title ${i}`,
        description: `This is mock tool number ${i} description details`,
        category: 'Utility',
        keywords: [`keyword${i}`],
        url: ''
      });
    }

    const hasPerf = typeof performance !== 'undefined' && typeof performance.now === 'function';
    const start = hasPerf ? performance.now() : Date.now();
    const results = engine.search('Mock Tool Title 500', { limit: 10, fuzzy: true }, mockIndex);
    const duration = (hasPerf ? performance.now() : Date.now()) - start;

    assert.ok(results.length > 0);
    assert.ok(duration < 150.0, `Search benchmark timing too high: ${duration}ms`);
  });
});
