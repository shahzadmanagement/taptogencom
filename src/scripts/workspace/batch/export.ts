import type { BatchItem } from './types';
import { downloadFile } from '../downloads';

export function exportBatchResults(items: BatchItem[], toolSlug: string, format: 'txt' | 'csv' | 'json' | 'md') {
  const completed = items.filter(i => i.status === 'completed' && i.processed);
  if (completed.length === 0) return;

  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `${toolSlug}-batch-${dateStr}.${format}`;

  if (format === 'txt') {
    const txtContent = completed.map(i => i.processed).join('\n');
    downloadFile(txtContent, filename, 'text/plain');
  } else if (format === 'csv') {
    const header = 'Original,Processed\n';
    const rows = completed.map(i => `"${(i.original || '').replace(/"/g, '""')}","${(i.processed || '').replace(/"/g, '""')}"`).join('\n');
    downloadFile(header + rows, filename, 'text/csv;charset=utf-8;');
  } else if (format === 'json') {
    const data = completed.map(i => ({ original: i.original, processed: i.processed }));
    downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
  } else if (format === 'md') {
    const mdContent = `# Batch Export: ${toolSlug}\n\n| Original | Processed |\n| --- | --- |\n` +
      completed.map(i => `| ${i.original.replace(/\|/g, '\\|')} | ${i.processed?.replace(/\|/g, '\\|')} |`).join('\n');
    downloadFile(mdContent, filename, 'text/markdown');
  }
}
