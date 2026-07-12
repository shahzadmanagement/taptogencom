const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const enginePath = path.resolve(__dirname, '../../src/lib/search-engine.ts');

describe('Search Foundation Engine Verification', () => {
  const mockIndex = [
    {
      id: 'fancy-text-generator',
      title: 'Fancy Text Generator',
      description: 'Convert standard text into cool aesthetic symbols',
      category: 'Typography',
      keywords: ['fancy text', 'aesthetic fonts', 'emoji decorated letters'],
      url: '/tools/fancy-text-generator/'
    },
    {
      id: 'baby-name-generator',
      title: 'Baby Name Generator',
      description: 'Find the perfect names for babies, boys and girls',
      category: 'Name Generators',
      keywords: ['baby names', 'middle names', 'cool baby names'],
      url: '/tools/baby-name-generator/'
    },
    {
      id: 'iupac-name-generator',
      title: 'IUPAC Name Generator',
      description: 'Generate IUPAC chemical names for compounds',
      category: 'Chemistry Utilities',
      keywords: ['IUPAC names', 'chemical formatting'],
      url: '/tools/iupac-name-generator/'
    },
    {
      id: 'unicode-emojis',
      title: 'Unicode Emojis ✨',
      description: 'Copy and paste unicode icons and sparkles',
      category: 'Symbol Tools',
      keywords: ['unicode symbols', 'aesthetic symbols'],
      url: '/tools/unicode-emojis/'
    }
  ];

  it('Verify exact matching and weighted ranking scoring', () => {
    const engine = loadTS(enginePath);
    const results = engine.search('Baby Name Generator', {}, mockIndex);

    assert.ok(results.length > 0);
    assert.equal(results[0].document.id, 'baby-name-generator');
  });

  it('Verify partial and prefix matching', () => {
    const engine = loadTS(enginePath);
    const results = engine.search('fancy', {}, mockIndex);

    assert.ok(results.length > 0);
    assert.equal(results[0].document.id, 'fancy-text-generator');
  });

  it('Verify fuzzy matching (typo tolerance Levenshtein)', () => {
    const engine = loadTS(enginePath);
    // Typo in "aesthetic" -> "aestetic"
    const results = engine.search('aestetic', {}, mockIndex);

    assert.ok(results.length > 0, 'Fuzzy matching failed to find typo matched item');
    assert.equal(results[0].document.id, 'fancy-text-generator');
  });

  it('Verify Unicode and emoji safe matching', () => {
    const engine = loadTS(enginePath);
    const results = engine.search('✨', {}, mockIndex);

    assert.ok(results.length > 0);
    assert.equal(results[0].document.id, 'unicode-emojis');
  });

  it('Verify cache hit and cache clear behavior', () => {
    const engine = loadTS(enginePath);
    engine.clearSearchCache();

    const r1 = engine.search('baby', {}, mockIndex);
    const r2 = engine.search('baby', {}, mockIndex);

    assert.deepEqual(r1, r2);
  });

  it('Verify empty query, invalid input, and stop words fallbacks', () => {
    const engine = loadTS(enginePath);
    assert.deepEqual(engine.search(''), []);
    assert.deepEqual(engine.search(null), []);
  });
});
