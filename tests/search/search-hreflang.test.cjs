const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const hreflangPath = path.resolve(__dirname, '../../src/lib/search-hreflang.ts');

describe('Enterprise Hreflang & International SEO Platform Verification', () => {
  it('Verify dynamic tools alternates list generation (18 locales + x-default)', () => {
    const engine = loadTS(hreflangPath);
    const alternates = engine.getHreflangAlternates('/tools/fancy-text-generator/');

    assert.ok(alternates.length >= 18);
    const enAlt = alternates.find(a => a.lang === 'en');
    const esAlt = alternates.find(a => a.lang === 'es');
    const xDefault = alternates.find(a => a.lang === 'x-default');

    assert.ok(enAlt);
    assert.ok(esAlt);
    assert.ok(xDefault);
    assert.equal(enAlt.href, 'https://taptogen.com/tools/fancy-text-generator/');
    assert.equal(xDefault.href, 'https://taptogen.com/tools/fancy-text-generator/');
  });

  it('Verify localized tools alternate mapping maps back correctly', () => {
    const engine = loadTS(hreflangPath);
    const alternates = engine.getHreflangAlternates('/es/tools/letras-bonitas/');

    assert.ok(alternates.length >= 18);
    const enAlt = alternates.find(a => a.lang === 'en');
    const esAlt = alternates.find(a => a.lang === 'es');

    assert.ok(enAlt);
    assert.ok(esAlt);
    assert.equal(enAlt.href, 'https://taptogen.com/tools/fancy-text-generator/');
    assert.equal(esAlt.href, 'https://taptogen.com/es/tools/letras-bonitas/');
  });

  it('Verify default page fallback targets (return English + x-default self references)', () => {
    const engine = loadTS(hreflangPath);
    const alternates = engine.getHreflangAlternates('/categories/name-generators/');

    assert.equal(alternates.length, 2);
    assert.equal(alternates[0].lang, 'en');
    assert.equal(alternates[0].href, 'https://taptogen.com/categories/name-generators/');
    assert.equal(alternates[1].lang, 'x-default');
    assert.equal(alternates[1].href, 'https://taptogen.com/categories/name-generators/');
  });
});
