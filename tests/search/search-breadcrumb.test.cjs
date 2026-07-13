const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const breadcrumbPath = path.resolve(__dirname, '../../src/lib/search-breadcrumb.ts');

describe('Enterprise Breadcrumb Platform Verification', () => {
  it('Verify breadcrumb path array compilation (includes Home, Tools, and Tool name)', () => {
    const engine = loadTS(breadcrumbPath);
    const items = engine.getBreadcrumbs('/tools/fancy-text-generator/', 'en', 'Fancy Text Generator');

    assert.equal(items.length, 3);
    assert.equal(items[0].name, 'Home');
    assert.equal(items[1].name, 'Tools');
    assert.equal(items[2].name, 'Fancy Text Generator');
    assert.equal(items[0].url, 'https://taptogen.com/');
    assert.equal(items[1].url, 'https://taptogen.com/tools/');
    assert.equal(items[2].url, 'https://taptogen.com/tools/fancy-text-generator/');
  });

  it('Verify localized breadcrumb paths resolution (correct language prefixes and translations)', () => {
    const engine = loadTS(breadcrumbPath);
    const items = engine.getBreadcrumbs('/es/tools/fancy-text-generator/', 'es', 'Generador de letras bonitas');

    assert.equal(items.length, 3);
    assert.equal(items[0].name, 'Inicio');
    assert.equal(items[1].name, 'Herramientas');
    assert.equal(items[2].name, 'Generador de letras bonitas');
    assert.equal(items[0].url, 'https://taptogen.com/es/');
    assert.equal(items[1].url, 'https://taptogen.com/es/tools/');
    assert.equal(items[2].url, 'https://taptogen.com/es/tools/fancy-text-generator/');
  });

  it('Verify Category breadcrumbs resolution', () => {
    const engine = loadTS(breadcrumbPath);
    const items = engine.getBreadcrumbs('/categories/name-generators/', 'en', 'Name Generators');

    assert.equal(items.length, 3);
    assert.equal(items[0].name, 'Home');
    assert.equal(items[1].name, 'Categories');
    assert.equal(items[2].name, 'Name Generators');
    assert.equal(items[1].url, 'https://taptogen.com/categories/');
  });
});
