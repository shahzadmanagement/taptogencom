import type { ToolConfig } from '../../config';
import { trackDownload } from '../../lib/analytics';

export function downloadFile(content: string, filename: string, mimeType: string) {
  try {
    const toolSlug = document.getElementById('tool-workspace')?.dataset.tool || 'generator';
    trackDownload(toolSlug);
  } catch (e) {}
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getGeneratedPairs(): { name: string; text: string }[] {
  const cards = Array.from(document.querySelectorAll('.intent-style-card, .result-card, .intent-idea-card, .intent-wide-card, .result-section'));
  if (cards.length > 0) {
    return cards.map((card, idx) => {
      const name = card.querySelector('.result-label, .intent-idea-name')?.textContent?.trim() || `Item ${idx + 1}`;
      const text = card.querySelector('.intent-preview-text, .result-text, pre, p')?.textContent?.trim() || card.textContent?.trim() || '';
      return { name, text };
    }).filter(p => p.text.length > 0);
  }

  const output = document.getElementById('tool-output');
  if (output && output.textContent && !output.classList.contains('empty')) {
    const text = output.dataset.copyText || output.textContent.trim();
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    return lines.map((line, idx) => ({
      name: `Result ${idx + 1}`,
      text: line.trim()
    }));
  }

  return [];
}

function escapeCsvCell(val: string): string {
  if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

export function initDownloads(config: ToolConfig) {
  if (config.exporters.length === 0) return;
  const toolSlug = document.getElementById('tool-workspace')?.dataset.tool || 'taptogen-export';

  document.getElementById('btn-download-txt')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const txtContent = pairs.map(p => `${p.name}: ${p.text}`).join('\n');
    downloadFile(txtContent, `${toolSlug}.txt`, 'text/plain');
  });

  document.getElementById('btn-download-csv')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const csvContent = ['Name,Value', ...pairs.map(p => `${escapeCsvCell(p.name)},${escapeCsvCell(p.text)}`)].join('\r\n');
    downloadFile(csvContent, `${toolSlug}.csv`, 'text/csv;charset=utf-8;');
  });

  document.getElementById('btn-download-json')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const jsonContent = JSON.stringify(pairs, null, 2);
    downloadFile(jsonContent, `${toolSlug}.json`, 'application/json');
  });

  document.getElementById('btn-download-md')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const mdContent = `# TapToGen Export: ${toolSlug}\n\n` + pairs.map(p => `### ${p.name}\n\n${p.text}\n`).join('\n---\n\n');
    downloadFile(mdContent, `${toolSlug}.md`, 'text/markdown');
  });

  document.getElementById('btn-download-html')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>TapToGen Export - ${toolSlug}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; background: #0b0f19; color: #f8fafc; line-height: 1.6; }
    .card { margin-bottom: 16px; padding: 16px; background: #1e293b; border-radius: 8px; border: 1px solid #334155; }
    .name { font-weight: 700; color: #818cf8; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 6px; }
    .text { font-size: 1.1rem; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>TapToGen Export: ${toolSlug}</h1>
  ${pairs.map(p => `
  <div class="card">
    <div class="name">${p.name}</div>
    <div class="text">${p.text}</div>
  </div>`).join('')}
</body>
</html>`;
    downloadFile(htmlContent, `${toolSlug}.html`, 'text/html');
  });
}
