const fs = require('fs');
const path = require('path');

// 1. Update CommandPalette.astro styling for modal max-width and iOS zoom prevention
const cmdPalettePath = path.resolve(__dirname, '../src/components/CommandPalette.astro');
let cmdContent = fs.readFileSync(cmdPalettePath, 'utf8');

cmdContent = cmdContent.replace(
  'width: 100%;\n    max-width: 640px;',
  'width: calc(100vw - 32px);\n    max-width: 640px;'
);

cmdContent = cmdContent.replace(
  'font-size: 1.05rem;',
  'font-size: 1rem; /* Prevents iOS Safari zoom */'
);

fs.writeFileSync(cmdPalettePath, cmdContent, 'utf8');

// 2. Update MobileActionBar.astro styling for safe width
const mobileBarPath = path.resolve(__dirname, '../src/components/MobileActionBar.astro');
let mobileContent = fs.readFileSync(mobileBarPath, 'utf8');

mobileContent = mobileContent.replace(
  'max-width: 600px;',
  'width: 100%;\n    max-width: 600px;'
);

fs.writeFileSync(mobileBarPath, mobileContent, 'utf8');

// 3. Update global.css with universal mobile responsiveness rules
const globalCssPath = path.resolve(__dirname, '../src/styles/global.css');
if (fs.existsSync(globalCssPath)) {
  let globalContent = fs.readFileSync(globalCssPath, 'utf8');
  const responsiveFixes = `
/* --- Universal Cross-Device Mobile Responsiveness & iOS Auto-Zoom Prevention --- */
@media (max-width: 768px) {
  input, select, textarea, .tool-select, .tool-number, .tool-text, .cmd-palette-input {
    font-size: 16px !important; /* Prevents iOS Safari auto-zoom on focus */
  }
  
  pre, code, .tool-output, .preview-code, .result-output {
    white-space: pre-wrap !important;
    word-break: break-word !important;
    overflow-x: auto !important;
    max-width: 100% !important;
  }
  
  .container, .workspace-panel, .tool-workspace, .cmd-palette-modal {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
}
`;
  if (!globalContent.includes('Universal Cross-Device Mobile Responsiveness')) {
    globalContent += responsiveFixes;
    fs.writeFileSync(globalCssPath, globalContent, 'utf8');
  }
} else {
  // Create global.css in src/styles/
  fs.mkdirSync(path.dirname(globalCssPath), { recursive: true });
  const responsiveFixes = `
/* --- Universal Cross-Device Mobile Responsiveness & iOS Auto-Zoom Prevention --- */
@media (max-width: 768px) {
  input, select, textarea, .tool-select, .tool-number, .tool-text, .cmd-palette-input {
    font-size: 16px !important; /* Prevents iOS Safari auto-zoom on focus */
  }
  
  pre, code, .tool-output, .preview-code, .result-output {
    white-space: pre-wrap !important;
    word-break: break-word !important;
    overflow-x: auto !important;
    max-width: 100% !important;
  }
  
  .container, .workspace-panel, .tool-workspace, .cmd-palette-modal {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
}
`;
  fs.writeFileSync(globalCssPath, responsiveFixes, 'utf8');
}

console.log('Successfully applied universal cross-device responsiveness CSS rules.');
