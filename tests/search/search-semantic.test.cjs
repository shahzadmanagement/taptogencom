const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const semanticPath = path.resolve(__dirname, '../../src/lib/search-semantic.ts');

describe('Semantic Search & Synonym Verification', () => {
  const mockIndex = [
    {
      id: 'fancy-text-generator',
      title: 'Fancy Text Generator',
      description: 'Convert standard text into cool aesthetic symbols',
      category: 'Typography',
      keywords: ['fancy text', 'aesthetic fonts'],
      url: '/tools/fancy-text-generator/'
    },
    {
      id: 'baby-name-generator',
      title: 'Baby Name Generator',
      description: 'Find the perfect names for babies, boys and girls',
      category: 'Name Generators',
      keywords: ['baby names'],
      url: '/tools/baby-name-generator/'
    }
  ];

  it('Verify synonym expansion and matching for indirect queries', () => {
    const semantic = loadTS(semanticPath);
    // "cool font" is a synonym of "fancy text" in our groups
    const results = semantic.semanticSearch('cool font', {}, mockIndex);

    assert.ok(results.length > 0);
    assert.equal(results[0].document.id, 'fancy-text-generator');
  });

  it('Verify duplicate prevention when both synonym and direct terms match', () => {
    const semantic = loadTS(semanticPath);
    const results = semantic.semanticSearch('fancy text', {}, mockIndex);

    const ids = results.map(r => r.document.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, uniqueIds.size, 'Duplicate items returned in search results');
  });
});
