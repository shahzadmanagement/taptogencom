export function formatCodeBlock(code: string, language: string = 'html'): string {
  if (!code) return '';
  const lines = code.trim().split('\n');

  return `
    <div class="code-editor-container" style="background: #0f172a; border-radius: 8px; border: 1px solid #334155; overflow: hidden; font-family: 'Fira Code', monospace; font-size: 0.88rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 8px 14px; border-bottom: 1px solid #334155;">
        <span style="color: #94a3b8; font-size: 0.78rem; text-transform: uppercase; font-weight: 700;">${language}</span>
        <button class="copy-btn result-copy" type="button" data-copy="${escapeCode(code)}" style="padding: 4px 10px; font-size: 0.75rem;">Copy Code</button>
      </div>
      <div style="display: flex; padding: 12px; overflow-x: auto; color: #f8fafc; line-height: 1.5;">
        <div style="padding-right: 12px; border-right: 1px solid #334155; color: #475569; text-align: right; user-select: none;">
          ${lines.map((_, i) => `<div>${i + 1}</div>`).join('')}
        </div>
        <div style="padding-left: 12px; flex: 1; white-space: pre;">${escapeCode(code)}</div>
      </div>
    </div>
  `;
}

function escapeCode(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
