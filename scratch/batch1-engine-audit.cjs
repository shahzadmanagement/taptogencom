const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

console.log(`=== BATCH 1: ENGINE & WORKSPACE OUTPUT QUALITY & EDGE-CASE AUDIT ===\n`);

const engineIssues = [];

// 1. Audit Generator Types & Format mapping
const validGeneratorTypes = [
  'name-generator',
  'text-converter',
  'text-generator',
  'code-generator',
  'document-generator',
  'calculator',
  'utility-generator'
];

tools.forEach(tool => {
  if (!tool.generatorType) {
    engineIssues.push({ type: 'MISSING_GENERATOR_TYPE', slug: tool.slug, detail: 'Tool missing generatorType field.' });
  }
  if (!tool.outputFormat) {
    engineIssues.push({ type: 'MISSING_OUTPUT_FORMAT', slug: tool.slug, detail: 'Tool missing outputFormat field.' });
  }
  
  // Verify toolOptions defaults
  if (tool.toolOptions && Array.isArray(tool.toolOptions)) {
    tool.toolOptions.forEach(opt => {
      if (opt.default === undefined || opt.default === null) {
        engineIssues.push({ type: 'MISSING_OPTION_DEFAULT', slug: tool.slug, optionId: opt.id, detail: `Tool option "${opt.id}" missing default value.` });
      }
      if (opt.type === 'select' && (!opt.options || opt.options.length === 0)) {
        engineIssues.push({ type: 'EMPTY_SELECT_OPTIONS', slug: tool.slug, optionId: opt.id, detail: `Select tool option "${opt.id}" has no options array.` });
      }
    });
  }
});

// 2. Audit Client-side Engine Handler Functions in tool-workspace.ts
const workspaceScriptPath = path.resolve(__dirname, '../src/scripts/tool-workspace.ts');
if (fs.existsSync(workspaceScriptPath)) {
  const content = fs.readFileSync(workspaceScriptPath, 'utf8');
  
  // Check for essential button event bindings
  const requiredBindings = [
    'generate-btn',
    'copy-btn',
    'reset-btn',
    'example-btn',
    'regenerate-btn'
  ];
  
  requiredBindings.forEach(binding => {
    if (!content.includes(binding)) {
      engineIssues.push({ type: 'MISSING_EVENT_BINDING', binding, detail: `tool-workspace.ts missing binding for "${binding}".` });
    }
  });
}

console.log(`Batch 1 Engine Audit Complete. Found ${engineIssues.length} issues:\n`);
console.log(JSON.stringify(engineIssues, null, 2));
