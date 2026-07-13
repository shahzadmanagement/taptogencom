const path = require('path');
const fs = require('fs');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const robotsPath = path.resolve(__dirname, '../../src/lib/search-robots.ts');

describe('Enterprise Dynamic Robots.txt Engine Verification', () => {
  it('Verify production robots.txt output and crawler declarations', () => {
    const loader = loadTS(robotsPath);
    const content = loader.generateRobotsTxt('production');

    assert.ok(content.includes('User-agent: Googlebot'));
    assert.ok(content.includes('User-agent: Bingbot'));
    assert.ok(content.includes('User-agent: AdsBot-Google'));
    assert.ok(content.includes('Sitemap: https://taptogen.com/sitemap-index.xml'));
  });

  it('Verify preview and development environments block indexation', () => {
    const loader = loadTS(robotsPath);
    const previewContent = loader.generateRobotsTxt('preview');
    assert.ok(previewContent.includes('User-agent: *'));
    assert.ok(previewContent.includes('Disallow: /'));
    assert.ok(!previewContent.includes('Sitemap:'));

    const devContent = loader.generateRobotsTxt('development');
    assert.ok(devContent.includes('Disallow: /'));
  });

  it('Verify crawl directives and non-CSS/JS block safety rules', () => {
    const loader = loadTS(robotsPath);
    const content = loader.generateRobotsTxt('production');

    assert.ok(content.includes('Disallow: /api/'));
    assert.ok(!content.includes('Disallow: /assets/'));
    assert.ok(!content.includes('Disallow: /*.css'));
    assert.ok(!content.includes('Disallow: /*.js'));
  });
});
