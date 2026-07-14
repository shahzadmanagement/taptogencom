const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const dominationPath = path.resolve(__dirname, '../../src/lib/product-domination.ts');

describe('Enterprise Tool Excellence & Competitor Domination Audits', () => {
  it('Verify every registered tool meets user experience and validation parameters', () => {
    const engine = loadTS(dominationPath);
    const registry = engine.getProductDominationRegistry();

    // Verify coverage of all 431 tools
    assert.ok(registry.length >= 430);

    registry.forEach(tool => {
      // Validate each tool inherits all required dominant capabilities
      assert.ok(tool.hasLivePreview, `Tool ${tool.slug} missing live preview capability`);
      assert.ok(tool.hasCopyAction, `Tool ${tool.slug} missing copy action capability`);
      assert.ok(tool.hasResetAction, `Tool ${tool.slug} missing reset action capability`);
      assert.ok(tool.hasDownload, `Tool ${tool.slug} missing download capability`);
      assert.ok(tool.hasShare, `Tool ${tool.slug} missing share capability`);
      assert.ok(tool.hasHistory, `Tool ${tool.slug} missing history capability`);
      assert.ok(tool.hasFavorites, `Tool ${tool.slug} missing favorites capability`);
      assert.ok(tool.hasShortcuts, `Tool ${tool.slug} missing shortcuts capability`);
    });
  });

  it('Verify that average capability scores reflect competitive dominance (> 80)', () => {
    const engine = loadTS(dominationPath);
    const registry = engine.getProductDominationRegistry();
    
    let totalScore = 0;
    registry.forEach(tool => {
      totalScore += engine.getToolFeatureScore(tool.slug);
    });

    const avgScore = totalScore / registry.length;
    assert.ok(avgScore >= 80, `Average tool capability score is under baseline: ${avgScore}`);
  });
});
