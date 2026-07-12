const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const uiPath = path.resolve(__dirname, '../../src/scripts/search-ui.ts');

describe('Search UI Component Verification', () => {
  it('Verify search modal overlay mounts on initialization and toggle shortcuts', () => {
    let listeners = {};
    let injectedEl = null;

    globalThis.window = {
      addEventListener: (name, cb) => {
        listeners[name] = cb;
      }
    };

    globalThis.document = {
      getElementById: (id) => null,
      createElement: (tag) => {
        return {
          style: {},
          setAttribute: () => {},
          addEventListener: () => {}
        };
      },
      body: {
        appendChild: (el) => {
          injectedEl = el;
        }
      },
      head: {
        appendChild: () => {}
      }
    };

    const ui = loadTS(uiPath).searchUi;
    ui.init();

    // Trigger key shortcut Ctrl+K
    listeners['keydown']({
      ctrlKey: true,
      key: 'k',
      preventDefault: () => {}
    });

    assert.ok(injectedEl, 'Search UI overlay was not mounted to document.body');
    
    // Clean up
    delete globalThis.window;
    delete globalThis.document;
  });
});
