const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const internalLinksPath = path.resolve(__dirname, '../../src/lib/search-internal-links.ts');

describe('Enterprise Internal Linking Platform Verification', () => {
  it('Verify tool page links compilation (minimum 5-8 links)', () => {
    const engine = loadTS(internalLinksPath);
    const links = engine.getInternalLinks('/tools/fancy-text-generator/', 'en');

    assert.ok(links.length >= 5 && links.length <= 8);
    // Ensure all resolved targets are absolute canonical
    links.forEach(l => {
      assert.ok(l.url.startsWith('https://taptogen.com/'));
    });
  });

  it('Verify localized tool page links (maps targets to localized paths)', () => {
    const engine = loadTS(internalLinksPath);
    const links = engine.getInternalLinks('/es/tools/letras-bonitas/', 'es');

    assert.ok(links.length >= 5);
    // Should have localized URLs for other tools
    const hasSpanishTools = links.some(l => l.url.includes('/es/tools/'));
    assert.ok(hasSpanishTools);
  });

  it('Verify zero self-referential links are returned', () => {
    const engine = loadTS(internalLinksPath);
    const pathname = '/tools/fancy-text-generator/';
    const links = engine.getInternalLinks(pathname, 'en');

    const selfLink = links.find(l => l.url.includes(pathname));
    assert.equal(selfLink, undefined);
  });

  it('Verify no links point to noindex tools', () => {
    const engine = loadTS(internalLinksPath);
    const links = engine.getInternalLinks('/tools/fancy-text-generator/', 'en');

    const hasNoindex = links.some(l => l.url.includes('ao3-tag-generator'));
    assert.equal(hasNoindex, false);
  });
});
