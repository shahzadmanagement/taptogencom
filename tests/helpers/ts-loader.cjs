const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const repoRoot = path.resolve(__dirname, '../..');
const dsPath = path.join(repoRoot, 'src/scripts/data/generator-datasets.ts');
const wsPath = path.join(repoRoot, 'src/scripts/tool-workspace.ts');
const tempCombinedPath = path.join(repoRoot, 'src/scripts/temp-workspace-combined.ts');

let compiledCode = '';

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

globalThis.HTMLElement = MockHtmlElement;
globalThis.HTMLInputElement = MockHtmlElement;
globalThis.HTMLTextAreaElement = MockHtmlElement;
globalThis.document = {
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {},
  removeEventListener: () => {},
  getElementById: (id) => {
    if (id === 'tool-workspace') {
      return {
        dataset: { tool: 'slogan-generator', type: 'utility', format: 'text' },
        addEventListener: () => {}
      };
    }
    return new MockHtmlElement();
  },
};
globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.navigator = {
  clipboard: {
    writeText: async () => {},
    readText: async () => ''
  }
};

globalThis.customDynamicImport = async (id) => {
  if (typeof id === 'string') {
    let resolvedPath = '';
    if (id.startsWith('../../config/')) {
      const baseName = id.replace('../../config/', '');
      resolvedPath = path.resolve(__dirname, '../../src/config', baseName + '.ts');
    } else if (id.startsWith('../../lib/')) {
      const libName = id.replace('../../lib/', '');
      resolvedPath = path.resolve(__dirname, '../../src/lib', libName + '.ts');
    } else if (id.startsWith('./') || id.startsWith('../')) {
      resolvedPath = path.resolve(__dirname, '../../src/scripts/workspace', id + '.ts');
    }
    
    if (resolvedPath && fs.existsSync(resolvedPath)) {
      return loadTS(resolvedPath);
    }
  }
  return import(id);
};

function rewriteDynamicImports(code) {
  return code.replace(/\bimport\(([^)]+)\)/g, 'globalThis.customDynamicImport($1)');
}

function ensureCompiled() {
  if (compiledCode) return;
  
  const dsCode = fs.readFileSync(dsPath, 'utf8').replace(/import\s*\{\s*[\s\S]*?\}\s*from\s*['"]\.\.\/tool-workspace['"];/g, '');
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
    compiledCode = rewriteDynamicImports(buildResult.outputFiles[0].text);
  } finally {
    if (fs.existsSync(tempCombinedPath)) {
      fs.unlinkSync(tempCombinedPath);
    }
  }
}


function resolveModulePath(basePath, id) {
  let resolved = '';
  if (id.startsWith('@/')) {
    resolved = path.resolve(__dirname, '../../src/', id.slice(2));
  } else if (id.startsWith('.')) {
    resolved = path.resolve(basePath, id);
  } else {
    return null;
  }

  if (fs.existsSync(resolved + '.ts')) return { type: 'ts', path: resolved + '.ts' };
  if (fs.existsSync(resolved + '.js')) return { type: 'js', path: resolved + '.js' };
  if (fs.existsSync(resolved + '.cjs')) return { type: 'js', path: resolved + '.cjs' };

  try {
    const stat = fs.statSync(resolved);
    if (stat.isDirectory()) {
      const indexTs = path.join(resolved, 'index.ts');
      const indexJs = path.join(resolved, 'index.js');
      const indexCjs = path.join(resolved, 'index.cjs');
      if (fs.existsSync(indexTs)) return { type: 'ts', path: indexTs };
      if (fs.existsSync(indexJs)) return { type: 'js', path: indexJs };
      if (fs.existsSync(indexCjs)) return { type: 'js', path: indexCjs };
    }
  } catch (e) {}

  return null;
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
    const resolvedInfo = resolveModulePath(path.dirname(absolutePath), id);
    if (resolvedInfo) {
      if (resolvedInfo.type === 'ts') return loadTS(resolvedInfo.path);
      if (resolvedInfo.type === 'js') return require(resolvedInfo.path);
    }
    return require(id);
  };

  const cleanCode = rewriteDynamicImports(result.code);
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', cleanCode);
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
