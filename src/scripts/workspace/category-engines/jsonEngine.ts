export interface JsonValidationResult {
  isValid: boolean;
  parsedData: any | null;
  errorLine: number | null;
  errorMessage: string | null;
}

export function validateJson(raw: string): JsonValidationResult {
  if (!raw || raw.trim().length === 0) {
    return { isValid: false, parsedData: null, errorLine: null, errorMessage: 'Empty input' };
  }

  try {
    const parsedData = JSON.parse(raw);
    return { isValid: true, parsedData, errorLine: null, errorMessage: null };
  } catch (err: any) {
    let errorLine: number | null = null;
    const match = err.message.match(/at position (\d+)/i) || err.message.match(/line (\d+)/i);
    if (match) {
      const pos = parseInt(match[1], 10);
      if (!isNaN(pos)) {
        errorLine = raw.slice(0, pos).split('\n').length;
      }
    }
    return { isValid: false, parsedData: null, errorLine, errorMessage: err.message };
  }
}

export function formatPrettyJson(raw: string, indent: number = 2): string {
  const result = validateJson(raw);
  if (!result.isValid || result.parsedData === null) return raw;
  return JSON.stringify(result.parsedData, null, indent);
}

export function minifyJson(raw: string): string {
  const result = validateJson(raw);
  if (!result.isValid || result.parsedData === null) return raw;
  return JSON.stringify(result.parsedData);
}

export function renderJsonWithLineNumbers(jsonStr: string): string {
  const lines = jsonStr.split('\n');
  return `
    <div style="font-family: monospace; font-size: 0.88rem; background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 8px; overflow-x: auto; display: flex;">
      <div style="padding-right: 12px; border-right: 1px solid #334155; color: #64748b; text-align: right; user-select: none;">
        ${lines.map((_, i) => `<div>${i + 1}</div>`).join('')}
      </div>
      <div style="padding-left: 12px; flex: 1; white-space: pre;">
        ${lines.map(line => `<div>${escapeHtmlJson(line)}</div>`).join('')}
      </div>
    </div>
  `;
}

function escapeHtmlJson(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
