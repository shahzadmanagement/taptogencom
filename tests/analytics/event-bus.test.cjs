const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const busPath = path.resolve(__dirname, '../../src/lib/event-bus.ts');

describe('Event Bus Engine Verification', () => {
  it('Verify publish-subscribe pipeline and middleware actions', () => {
    const bus = loadTS(busPath).eventBus;
    let eventReceived = null;
    let middlewareRun = false;

    // Register middleware
    bus.use((event, next) => {
      middlewareRun = true;
      next();
    });

    // Subscribe
    bus.subscribe('test_event', (event) => {
      eventReceived = event;
    });

    bus.publish('test_event', { key: 'value' }, 'high');

    assert.ok(middlewareRun, 'EventBus middleware did not execute');
    assert.ok(eventReceived, 'EventBus callback did not fire');
    assert.equal(eventReceived.payload.key, 'value');
  });

  it('Verify once subscriber fires exactly once', () => {
    const bus = loadTS(busPath).eventBus;
    let fires = 0;

    bus.once('once_event', () => {
      fires++;
    });

    bus.publish('once_event', {}, 'high');
    bus.publish('once_event', {}, 'high');

    assert.equal(fires, 1, 'Once subscriber fired more than once');
  });
});
