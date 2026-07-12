const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const recsPath = path.resolve(__dirname, '../../src/lib/search-recommendations.ts');

describe('Related Tools Recommendation Engine Verification', () => {
  it('Verify disjoint recommendation sets and caching', () => {
    const recs = loadTS(recsPath);
    recs.clearRecommendationCache();

    const res1 = recs.getRecommendations('fancy-text-generator');

    assert.ok(res1.relatedTools.length > 0, 'Related tools list is empty');
    assert.ok(res1.youMayAlsoLike.length > 0, 'You may also like list is empty');
    assert.ok(res1.frequentlyUsedTogether.length > 0, 'Frequently used together list is empty');

    // Verify completely disjoint lists (no duplicates across sections)
    const allSlugs = [
      ...res1.relatedTools.map(t => t.slug),
      ...res1.youMayAlsoLike.map(t => t.slug),
      ...res1.frequentlyUsedTogether.map(t => t.slug)
    ];
    const uniqueSlugs = new Set(allSlugs);
    assert.equal(allSlugs.length, uniqueSlugs.size, 'Duplicate recommendation slugs found across sections');

    // Verify cache hit
    const res2 = recs.getRecommendations('fancy-text-generator');
    assert.deepEqual(res1, res2, 'Recommendation result cache hit was not identical');
  });
});
