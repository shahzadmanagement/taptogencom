const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const monitorPath = path.resolve(__dirname, '../../src/lib/error-monitor.ts');

describe('Error Monitor Platform Verification', () => {
  it('Verify exception capture pipeline logs runtime error objects', () => {
    const errorListeners = {};
    globalThis.window = {
      addEventListener: (name, cb) => {
        errorListeners[name] = cb;
      }
    };

    const monitor = loadTS(monitorPath).errorMonitor;
    monitor.init();

    // Simulate runtime error
    errorListeners['error']({
      message: 'Uncaught TypeError: test error message',
      filename: 'test-bundle.js',
      lineno: 10,
      colno: 25,
      error: new Error('test stack trace')
    });

    const logged = monitor.getErrors();
    assert.equal(logged.length, 1);
    assert.equal(logged[0].message, 'Uncaught TypeError: test error message');
    assert.equal(logged[0].type, 'runtime');
  });
});
