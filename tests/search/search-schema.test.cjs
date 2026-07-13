const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const schemaPath = path.resolve(__dirname, '../../src/lib/search-schema.ts');

describe('Enterprise JSON-LD Structured Data Engine Verification', () => {
  it('Verify homepage schemas structure (includes WebSite, Organization, WebPage)', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/',
      lang: 'en',
      title: 'Home Page',
      description: 'Find awesome tools'
    });

    const webSite = schemas.find(s => s['@type'] === 'WebSite');
    const org = schemas.find(s => s['@type'] === 'Organization');
    const webPage = schemas.find(s => s['@type'] === 'WebPage');

    assert.ok(webSite);
    assert.equal(webSite.name, 'TapToGen');
    assert.ok(org);
    assert.ok(webPage);
    assert.equal(webPage.name, 'Home Page');
  });

  it('Verify dynamic tool detail pages schemas (includes WebApplication, BreadcrumbList)', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/tools/fancy-text-generator/',
      lang: 'en',
      title: 'Fancy Text Generator',
      description: 'Make text cool'
    });

    const webApp = schemas.find(s => s['@type'] === 'WebApplication');
    const breadcrumbs = schemas.find(s => s['@type'] === 'BreadcrumbList');

    assert.ok(webApp);
    assert.equal(webApp.name, 'Fancy Text Generator');
    assert.ok(breadcrumbs);
    assert.equal(breadcrumbs.itemListElement.length, 3);
    assert.equal(breadcrumbs.itemListElement[1].name, 'Tools');
    assert.equal(breadcrumbs.itemListElement[2].name, 'Fancy Text Generator');
  });

  it('Verify HTML tag sanitization inside schema text outputs', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/tools/fancy-text/',
      lang: 'en',
      title: '<strong>Fancy</strong> Tool',
      description: '<p>A beautiful paragraph.</p>'
    });

    const webApp = schemas.find(s => s['@type'] === 'WebApplication');
    assert.equal(webApp.name, 'Fancy Tool');
    assert.equal(webApp.description, 'A beautiful paragraph.');
  });

  it('Verify CollectionPage configuration on category paths', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/categories/text-tools/',
      lang: 'en',
      title: 'Text Tools Category',
      description: 'List of text utilities'
    });

    const collection = schemas.find(s => s['@type'] === 'CollectionPage');
    const breadcrumbs = schemas.find(s => s['@type'] === 'BreadcrumbList');

    assert.ok(collection);
    assert.ok(breadcrumbs);
    assert.equal(breadcrumbs.itemListElement.length, 3);
    assert.equal(breadcrumbs.itemListElement[1].name, 'Categories');
  });

  it('Verify FAQPage schemas nested item mappings', () => {
    const engine = loadTS(schemaPath);
    const schemas = engine.buildSchemas({
      pathname: '/tools/fancy-text/',
      lang: 'en',
      title: 'Fancy Tool',
      description: 'Description',
      faqItems: [
        { q: 'Is it free?', a: 'Yes, <b>completely</b> free.' }
      ]
    });

    const faq = schemas.find(s => s['@type'] === 'FAQPage');
    assert.ok(faq);
    assert.equal(faq.mainEntity.length, 1);
    assert.equal(faq.mainEntity[0].name, 'Is it free?');
    assert.equal(faq.mainEntity[0].acceptedAnswer.text, 'Yes, completely free.');
  });
});
