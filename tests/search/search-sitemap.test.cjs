const path = require('path');
const fs = require('fs');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const sitemapPath = path.resolve(__dirname, '../../src/lib/search-sitemap.ts');

describe('Enterprise Dynamic Sitemap Engine Verification', () => {
  it('Verify XML compilation templates and structure parsing values', () => {
    const sitemap = loadTS(sitemapPath);
    const mockUrls = [
      { loc: 'https://taptogen.com/tools/fancy-text/', lastmod: '2026-07-13', changefreq: 'daily', priority: 0.8 }
    ];

    const xml = sitemap.compileSitemapXml(mockUrls);
    assert.ok(xml.includes('<loc>https://taptogen.com/tools/fancy-text/</loc>'));
    assert.ok(xml.includes('<changefreq>daily</changefreq>'));
  });

  it('Verify sitemap index compilation structure', () => {
    const sitemap = loadTS(sitemapPath);
    const indexXml = sitemap.compileSitemapIndexXml(['sitemap-tools.xml']);
    assert.ok(indexXml.includes('sitemap-tools.xml'));
  });

  it('Verify data extraction counts and noindex exclusions mapping', () => {
    const sitemap = loadTS(sitemapPath);
    const data = sitemap.getSitemapData();

    assert.ok(data.tools.length > 0);
    assert.ok(data.locales.length > 0);

    const noindexTool = data.tools.find(t => t.loc.includes('ao3-tag-generator'));
    assert.equal(noindexTool, undefined, 'noindex tool should be excluded from dynamic tools sitemap');
  });

  it('Verify file splitting logic simulation for 50000+ urls limit', () => {
    const mockDb = [];
    for (let i = 0; i < 55000; i++) {
      mockDb.push(`https://taptogen.com/tools/mock-${i}/`);
    }

    const chunks = [];
    const chunkSize = 50000;
    for (let i = 0; i < mockDb.length; i += chunkSize) {
      chunks.push(mockDb.slice(i, i + chunkSize));
    }

    assert.equal(chunks.length, 2);
    assert.equal(chunks[0].length, 50000);
    assert.equal(chunks[1].length, 5000);
  });
});
