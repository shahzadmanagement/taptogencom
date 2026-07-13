const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const imageSeoPath = path.resolve(__dirname, '../../src/lib/search-image-seo.ts');

describe('Enterprise Image SEO Platform Verification', () => {
  it('Verify default branding metadata resolution', () => {
    const engine = loadTS(imageSeoPath);
    const meta = engine.getImageMetadata('/og-default.png', 'general');

    assert.ok(meta.alt.length > 5);
    assert.equal(meta.width, 1200);
    assert.equal(meta.height, 630);
    assert.equal(meta.loading, 'lazy');
    assert.equal(meta.decoding, 'async');
  });

  it('Verify hero loading priority configurations', () => {
    const engine = loadTS(imageSeoPath);
    const meta = engine.getImageMetadata('/hero.png', 'hero');

    assert.equal(meta.loading, 'eager');
    assert.equal(meta.fetchpriority, 'high');
  });

  it('Verify sitemap imageObject structured schema format', () => {
    const engine = loadTS(imageSeoPath);
    const meta = engine.getImageMetadata('/preview.webp', 'preview');

    assert.equal(meta.schema['@type'], 'ImageObject');
    assert.equal(meta.schema.width, '1024');
    assert.equal(meta.schema.height, '768');
    assert.ok(meta.sitemap['image:loc']);
  });
});
