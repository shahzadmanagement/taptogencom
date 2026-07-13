const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const canonicalPath = path.resolve(__dirname, '../../src/lib/search-canonical.ts');

describe('Enterprise Canonical URL Engine Verification', () => {
  it('Verify absolute production HTTPS conversion', () => {
    const loader = loadTS(canonicalPath);
    const resolved = loader.resolveCanonicalUrl('http://localhost:3000/tools/fancy-text');
    assert.equal(resolved, 'https://taptogen.com/tools/fancy-text/');
  });

  it('Verify Vercel preview domain canonical redirection mapping', () => {
    const loader = loadTS(canonicalPath);
    const resolved = loader.resolveCanonicalUrl('https://taptogen-git-main-management.vercel.app/tools/fancy-text/');
    assert.equal(resolved, 'https://taptogen.com/tools/fancy-text/');
  });

  it('Verify trailing slash appendation and casing lowercase normalizations', () => {
    const loader = loadTS(canonicalPath);
    const resolved = loader.resolveCanonicalUrl('/Tools/FANCY-text');
    assert.equal(resolved, 'https://taptogen.com/tools/fancy-text/');
  });

  it('Verify removal of tracking UTM parameter and query constraints', () => {
    const loader = loadTS(canonicalPath);
    const resolved = loader.resolveCanonicalUrl('/tools/fancy-text?utm_source=facebook&q=test#hash-anchor');
    assert.equal(resolved, 'https://taptogen.com/tools/fancy-text/');
  });

  it('Verify sitemap index file extension protection (no trailing slash appended)', () => {
    const loader = loadTS(canonicalPath);
    const resolved = loader.resolveCanonicalUrl('/sitemap-index.xml');
    assert.equal(resolved, 'https://taptogen.com/sitemap-index.xml');
  });

  it('Verify duplicate slashes cleanup and formatting normalization', () => {
    const loader = loadTS(canonicalPath);
    const resolved = loader.resolveCanonicalUrl('//tools//fancy-text//');
    assert.equal(resolved, 'https://taptogen.com/tools/fancy-text/');
  });
});
