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
  const cards = Array.from(document.querySelectorAll('.intent-style-card'));
  return cards.map(card => {
    const name = card.querySelector('.result-label')?.textContent?.trim() || '';
    const text = card.querySelector('.intent-preview-text')?.textContent || '';
    return { name, text };
  });
}

export function initDownloads(config: ToolConfig) {
  if (config.exporters.length === 0) return;

  document.getElementById('btn-download-txt')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const txtContent = pairs.map(p => `${p.name}: ${p.text}`).join('\n');
    downloadFile(txtContent, 'taptogen-fancy-text.txt', 'text/plain');
  });

  document.getElementById('btn-download-html')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>TapToGen Fancy Text Export</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0a0a1e; color: #fff; }
    .style-row { margin-bottom: 16px; padding: 12px; border-bottom: 1px solid #333; }
    .name { font-weight: bold; color: #a855f7; margin-bottom: 4px; }
    .text { font-size: 1.2rem; }
  </style>
</head>
<body>
  <h1>Fancy Text Export</h1>
  ${pairs.map(p => `
  <div class="style-row">
    <div class="name">${p.name}</div>
    <div class="text">${p.text}</div>
  </div>`).join('')}
</body>
</html>`;
    downloadFile(htmlContent, 'taptogen-fancy-text.html', 'text/html');
  });

  document.getElementById('btn-download-json')?.addEventListener('click', () => {
    const pairs = getGeneratedPairs();
    if (pairs.length === 0) return;
    const jsonContent = JSON.stringify(pairs, null, 2);
    downloadFile(jsonContent, 'taptogen-fancy-text.json', 'application/json');
  });
}
