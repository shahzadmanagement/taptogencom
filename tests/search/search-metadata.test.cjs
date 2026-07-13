const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const metadataPath = path.resolve(__dirname, '../../src/lib/search-metadata.ts');

describe('Enterprise Metadata Platform Verification', () => {
  it('Verify homepage metadata configuration (title, length, robots)', () => {
    const engine = loadTS(metadataPath);
    const meta = engine.buildMetadata({
      pathname: '/',
      lang: 'en'
    });

    assert.ok(meta.title.includes('Free online generator tools'));
    assert.ok(meta.description.length >= 130 && meta.description.length <= 165);
    assert.ok(meta.robots.includes('index, follow'));
  });

  it('Verify dynamic tools metadata parsing (English & Localized)', () => {
    const engine = loadTS(metadataPath);
    
    // English tool
    const enMeta = engine.buildMetadata({
      pathname: '/tools/fancy-text-generator/',
      lang: 'en'
    });
    assert.ok(enMeta.title.includes('Fancy Text Generator'));
    
    // Localized tool
    const esMeta = engine.buildMetadata({
      pathname: '/es/tools/letras-bonitas/',
      lang: 'es'
    });
    assert.ok(esMeta.title.includes('Letras bonitas'));
  });

  it('Verify description optimization rules (length, ellipsis, filler)', () => {
    const engine = loadTS(metadataPath);

    // Test too short description gets filler appended
    const shortMeta = engine.buildMetadata({
      pathname: '/tools/fancy-text-generator/',
      lang: 'en',
      descriptionOverride: 'Short description'
    });
    assert.ok(shortMeta.description.length >= 130);
    assert.ok(shortMeta.description.includes('Short description'));

    // Test too long description gets sliced on word boundary
    const longMeta = engine.buildMetadata({
      pathname: '/tools/fancy-text-generator/',
      lang: 'en',
      descriptionOverride: 'This is an extremely long meta description string that is designed to exceed 160 characters in total length to verify that the dynamic truncator behaves exactly as expected on space boundaries...'
    });
    assert.ok(longMeta.description.length <= 165);
    assert.ok(longMeta.description.endsWith('...'));
  });

  it('Verify noindex rules mapping (excludes noindex tools)', () => {
    const engine = loadTS(metadataPath);
    const meta = engine.buildMetadata({
      pathname: '/tools/ao3-tag-generator/',
      lang: 'en'
    });

    assert.equal(meta.robots, 'noindex, follow');
  });
});
