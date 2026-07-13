const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const sitemapPath = path.resolve(__dirname, '../../src/lib/search-sitemap.ts');

describe('Enterprise XML Sitemap Platform Verification', () => {
  it('Verify sitemap index compilation matches specifications', () => {
    const engine = loadTS(sitemapPath);
    const indexXml = engine.compileSitemapIndexXml(['sitemap-pages.xml', 'sitemap-tools.xml']);

    assert.ok(indexXml.includes('<sitemapindex'));
    assert.ok(indexXml.includes('sitemap-pages.xml'));
    assert.ok(indexXml.includes('sitemap-tools.xml'));
  });

  it('Verify indexable categories and tools mappings', () => {
    const engine = loadTS(sitemapPath);
    const data = engine.getSitemapData();

    // Verify canonical URLs only
    data.tools.forEach(t => {
      assert.ok(t.loc.startsWith('https://taptogen.com/'));
      assert.ok(!t.loc.includes('localhost'));
    });

    data.categories.forEach(c => {
      assert.ok(c.loc.startsWith('https://taptogen.com/'));
    });
  });

  it('Verify no noindex tools are included in sitemaps list', () => {
    const engine = loadTS(sitemapPath);
    const data = engine.getSitemapData();

    const hasNoindex = data.tools.some(t => t.loc.includes('ao3-tag-generator'));
    assert.equal(hasNoindex, false);
  });

  it('Verify image sitemap tags compilation structure', () => {
    const engine = loadTS(sitemapPath);
    const imageXml = engine.compileImageSitemapXml([
      {
        loc: 'https://taptogen.com/tools/fancy-text-generator/',
        imageLoc: 'https://taptogen.com/og-default.png',
        imageTitle: 'Brand Presentation',
        imageCaption: 'Creative fonts style generator'
      }
    ]);

    assert.ok(imageXml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'));
    assert.ok(imageXml.includes('<image:image>'));
    assert.ok(imageXml.includes('<image:loc>https://taptogen.com/og-default.png</image:loc>'));
  });
});
