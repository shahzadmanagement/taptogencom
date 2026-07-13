const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const schemaPath = path.resolve(__dirname, '../../src/lib/search-schema.ts');

describe('Enterprise Structured Data & Rich Results Platform Verification', () => {
  it('Verify organization and website schemas compile correctly', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/',
      title: 'TapToGen Tools',
      description: 'Dynamic utilities framework'
    });

    const org = schemas.find(s => s['@type'] === 'Organization');
    const website = schemas.find(s => s['@type'] === 'WebSite');

    assert.ok(org);
    assert.equal(org.name, 'TapToGen');
    assert.ok(website);
    assert.ok(website.potentialAction);
  });

  it('Verify WebSiteNavigationElement list is included', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/tools/fancy-text-generator/',
      title: 'Fancy Text Generator',
      description: 'Style your texts'
    });

    const nav = schemas.find(s => s['@type'] === 'WebSiteNavigationElement');
    assert.ok(nav);
    assert.ok(Array.isArray(nav.url));
    assert.ok(nav.url.includes('https://taptogen.com/'));
  });

  it('Verify ItemList schema output compiles on categories', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/categories/fancy-text/',
      title: 'Fancy Text Styles',
      description: 'Topic list'
    });

    const itemList = schemas.find(s => s['@type'] === 'ItemList');
    assert.ok(itemList);
    assert.equal(itemList.numberOfItems, 4);
  });

  it('Verify HowTo steps mapping formatting', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/tools/fancy-text-generator/',
      title: 'Fancy Text Generator',
      description: 'Style your texts',
      howToSteps: ['Enter your text', 'Select font style', 'Copy result']
    });

    const howTo = schemas.find(s => s['@type'] === 'HowTo');
    assert.ok(howTo);
    assert.equal(howTo.step.length, 3);
    assert.equal(howTo.step[0]['@type'], 'HowToStep');
  });

  it('Verify ImageObject attributes binding', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/tools/fancy-text-generator/',
      title: 'Fancy Text Generator',
      description: 'Style your texts',
      imageUrl: 'https://taptogen.com/og-fancy-text.png'
    });

    const img = schemas.find(s => s['@type'] === 'ImageObject');
    assert.ok(img);
    assert.equal(img.url, 'https://taptogen.com/og-fancy-text.png');
  });

  it('Verify Article/BlogPosting schema details compilation', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/blog/how-to-style-text/',
      title: 'How to Style Text guide',
      description: 'Creative typography styles'
    });

    const article = schemas.find(s => s['@type'] === 'BlogPosting');
    assert.ok(article);
    assert.equal(article.headline, 'How to Style Text guide');
  });

  it('Verify extension point custom schemas appending', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/tools/fancy-text-generator/',
      title: 'Fancy Text Generator',
      description: 'Style your texts',
      customSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: 'Demo Video'
        }
      ]
    });

    const video = schemas.find(s => s['@type'] === 'VideoObject');
    assert.ok(video);
    assert.equal(video.name, 'Demo Video');
  });
});
