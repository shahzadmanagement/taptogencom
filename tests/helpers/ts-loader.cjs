const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const repoRoot = path.resolve(__dirname, '../..');
const dsPath = path.join(repoRoot, 'src/scripts/data/generator-datasets.ts');
const wsPath = path.join(repoRoot, 'src/scripts/tool-workspace.ts');
const tempCombinedPath = path.join(repoRoot, 'src/scripts/temp-workspace-combined.ts');

let compiledCode = '';

function ensureCompiled() {
  if (compiledCode) return;
  
  const dsCode = fs.readFileSync(dsPath, 'utf8');
  let wsCode = fs.readFileSync(wsPath, 'utf8');

  const exposeBlock = `
    globalThis.capturedGenerate = generate;
    globalThis.toUnicode = toUnicode;
    globalThis.escapeHtml = escapeHtml;
    globalThis.renderSections = renderSections;
    globalThis.renderGroupedTags = renderGroupedTags;
    globalThis.renderList = renderList;
    globalThis.renderCards = renderCards;
    globalThis.renderBusinessCards = renderBusinessCards;
    globalThis.renderRaw = renderRaw;
    globalThis.slugWords = slugWords;
    globalThis.titleCase = titleCase;
    globalThis.compactSeed = compactSeed;
    globalThis.toSafeHandle = toSafeHandle;
    globalThis.unicodeMap = unicodeMap;
    globalThis.transformSquared = transformSquared;
    globalThis.transformFullwidth = transformFullwidth;
    globalThis.renderSectionSuite = renderSectionSuite;
  `;
  wsCode += '\n' + exposeBlock;

  const combined = dsCode + '\n\n' + wsCode;

  fs.writeFileSync(tempCombinedPath, combined, 'utf8');

  try {
    const buildResult = esbuild.buildSync({
      entryPoints: [tempCombinedPath],
      bundle: true,
      write: false,
      format: 'cjs',
      platform: 'node',
      external: ['astro']
    });
    compiledCode = buildResult.outputFiles[0].text;
  } finally {
    if (fs.existsSync(tempCombinedPath)) {
      fs.unlinkSync(tempCombinedPath);
    }
  }
}

class MockHtmlElement {
  constructor() {
    this.classList = { add: () => {}, remove: () => {} };
    this.style = {};
    this.innerHTML = '';
    this.dataset = {};
  }
  addEventListener() {}
  cloneNode() {
    return new MockHtmlElement();
  }
}

function loadTS(filePath) {
  const absolutePath = path.resolve(filePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const result = esbuild.transformSync(code, {
    loader: 'ts',
    format: 'cjs'
  });
  const m = { exports: {} };
  
  const customRequire = (id) => {
    if (id.startsWith('@/')) {
      const resolved = path.resolve(__dirname, '../../src/', id.slice(2));
      if (fs.existsSync(resolved + '.ts')) return loadTS(resolved + '.ts');
      if (fs.existsSync(resolved + '.js')) return require(resolved + '.js');
    }
    if (id.startsWith('.')) {
      const resolved = path.resolve(path.dirname(absolutePath), id);
      if (fs.existsSync(resolved + '.ts')) return loadTS(resolved + '.ts');
      if (fs.existsSync(resolved + '.cjs')) return require(resolved + '.cjs');
      if (fs.existsSync(resolved + '.js')) return require(resolved + '.js');
    }
    return require(id);
  };

  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', result.code);
  fn(m, m.exports, customRequire, path.dirname(absolutePath), absolutePath);
  return m.exports;
}

async function runGenerator(slug, inputVal = 'test seed', optionVals = {}) {
  ensureCompiled();

  globalThis.HTMLElement = MockHtmlElement;
  globalThis.HTMLInputElement = MockHtmlElement;
  globalThis.HTMLTextAreaElement = MockHtmlElement;
  globalThis.MutationObserver = class {
    observe() {}
    disconnect() {}
  };

  const mockInput = {
    value: inputVal,
    addEventListener: () => {}
  };
  const mockOutput = new MockHtmlElement();

  globalThis.document = {
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: (id) => {
      if (id === 'tool-workspace') {
        return {
          dataset: { tool: slug, type: 'utility', format: 'text' },
          addEventListener: () => {}
        };
      }
      if (id === 'tool-input') return mockInput;
      if (id === 'tool-output') return mockOutput;
      
      const el = new MockHtmlElement();
      const val = optionVals[id] !== undefined ? optionVals[id] : '';
      el.value = String(val);
      el.checked = val === 'true' || val === true;
      return el;
    }
  };

  globalThis.window = {
    location: { href: `https://example.com/tools/${slug}/` },
    addEventListener: () => {}
  };

  globalThis.navigator = {
    clipboard: {
      writeText: async () => {}
    }
  };

  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', compiledCode);
  fn(m, m.exports, require, repoRoot, wsPath);

  await globalThis.capturedGenerate();

  return {
    rawOutput: mockOutput.dataset.copyText || '',
    htmlOutput: mockOutput.innerHTML || ''
  };
}

module.exports = { runGenerator, loadTS };
