/** Escapes all HTML special chars including single quotes — critical for data-copy attribute safety */
function escapeCode(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Applies token-based syntax coloring for HTML, CSS, JS/TS in an HTML display context */
function syntaxHighlight(code: string, language: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const lang = language.toLowerCase();

  if (lang === 'html' || lang === 'xml') {
    return esc(code)
      .replace(/(&lt;\/?)([\w-]+)/g, '<span style="color:#f472b6">$1$2</span>')
      .replace(/([\w-]+)(=)(&quot;[^&]*&quot;)/g, '<span style="color:#93c5fd">$1</span>$2<span style="color:#86efac">$3</span>');
  }

  if (lang === 'css' || lang === 'scss') {
    return esc(code)
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6b7280">$1</span>')
      .replace(/([.#]?[\w-]+)(\s*\{)/g, '<span style="color:#f472b6">$1</span>$2')
      .replace(/([\w-]+)(\s*:)/g, '<span style="color:#93c5fd">$1</span>$2')
      .replace(/(:.*?)(;)/g, '$1<span style="color:#a3a3a3">$2</span>');
  }

  if (['js', 'javascript', 'ts', 'typescript'].includes(lang)) {
    return esc(code)
      .replace(/(\/\/[^\n]*)/g, '<span style="color:#6b7280">$1</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|new|typeof|instanceof|this|true|false|null|undefined)\b/g,
        '<span style="color:#c084fc">$1</span>')
      .replace(/(&quot;[^&]*&quot;|&#39;[^&]*&#39;|`[^`]*`)/g, '<span style="color:#86efac">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#fb923c">$1</span>');
  }

  // Default: no highlighting, just escape
  return esc(code);
}

export function formatCodeBlock(code: string, language = 'html'): string {
  if (!code) return '';
  const lines = code.trim().split('\n');
  const highlighted = syntaxHighlight(code.trim(), language);
  const highlightedLines = highlighted.split('\n');

  return `<div class="code-editor-container" style="background:#0f172a;border-radius:8px;border:1px solid #334155;overflow:hidden;font-family:'Fira Code',Consolas,monospace;font-size:0.88rem;">
  <div style="display:flex;justify-content:space-between;align-items:center;background:#1e293b;padding:8px 14px;border-bottom:1px solid #334155;">
    <span style="color:#94a3b8;font-size:0.78rem;text-transform:uppercase;font-weight:700;">${escapeCode(language)}</span>
    <button class="copy-btn result-copy" type="button" data-copy="${escapeCode(code)}" style="padding:4px 10px;font-size:0.75rem;">Copy Code</button>
  </div>
  <div style="display:flex;padding:12px;overflow-x:auto;color:#f8fafc;line-height:1.6;">
    <div style="padding-right:12px;border-right:1px solid #334155;color:#475569;text-align:right;user-select:none;min-width:2.5rem;">
      ${lines.map((_, i) => `<div>${i + 1}</div>`).join('')}
    </div>
    <div style="padding-left:12px;flex:1;white-space:pre;">${highlightedLines.join('\n')}</div>
  </div>
</div>`;
}

