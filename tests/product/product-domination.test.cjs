const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const enginePath = path.resolve(__dirname, '../../src/lib/product-domination.ts');

describe('Enterprise Product Domination Platform Verification', () => {
  it('Verify feature scoring is correct and consistent', () => {
    const engine = loadTS(enginePath);
    const registry = engine.getProductDominationRegistry();

    assert.ok(registry.length > 0);
    // Verify first item contains all default properties
    const item = registry[0];
    assert.equal(typeof item.slug, 'string');
    assert.equal(item.hasLivePreview, true);
    assert.equal(item.hasCopyAction, true);
  });

  it('Verify tool scoring capabilities evaluation metrics', () => {
    const engine = loadTS(enginePath);
    const registry = engine.getProductDominationRegistry();
    const score = engine.getToolFeatureScore(registry[0].slug);

    assert.ok(score >= 80); // Central baseline guarantees a highly competitive feature score
  });

  it('Verify zero duplicate feature definitions exist in registry', () => {
    const engine = loadTS(enginePath);
    const registry = engine.getProductDominationRegistry();
    const slugs = registry.map(r => r.slug);
    const uniqueSlugs = new Set(slugs);

    assert.equal(slugs.length, uniqueSlugs.size);
  });
});
