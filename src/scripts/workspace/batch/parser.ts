import type { BatchItem, BatchOptions } from './types';

export function parseBatchContent(
  rawContent: string,
  filename: string = '',
  options: BatchOptions = { skipEmpty: true, removeDuplicates: false, trimWhitespace: true, preserveOrdering: true }
): BatchItem[] {
  if (!rawContent || rawContent.trim().length === 0) return [];

  // Normalize line endings (\r\n -> \n, \r -> \n)
  const normalized = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  let rawLines: string[] = [];

  const ext = filename.split('.').pop()?.toLowerCase() || '';

  if (ext === 'json' || (normalized.trim().startsWith('[') && normalized.trim().endsWith(']'))) {
    try {
      const parsed = JSON.parse(normalized);
      if (Array.isArray(parsed)) {
        rawLines = parsed.map(item => typeof item === 'object' ? JSON.stringify(item) : String(item));
      } else {
        rawLines = [normalized];
      }
    } catch {
      rawLines = normalized.split('\n');
    }
  } else if (ext === 'csv' || ext === 'tsv' || normalized.includes('\t') || (normalized.includes(',') && normalized.includes('\n'))) {
    const delimiter = ext === 'tsv' || normalized.includes('\t') ? '\t' : ',';
    const lines = normalized.split('\n');
    rawLines = lines.map(line => {
      const parts = line.split(delimiter);
      return parts[0] ? parts[0].replace(/^"|"$/g, '').trim() : line;
    });
  } else {
    // TXT or Markdown bullet points (* item, - item, 1. item)
    rawLines = normalized.split('\n').map(line => {
      return line.replace(/^[\s\*\-\+\d\.\>]+/, '');
    });
  }

  let processedLines = rawLines;

  if (options.trimWhitespace) {
    processedLines = processedLines.map(l => l.trim());
  }

  if (options.skipEmpty) {
    processedLines = processedLines.filter(l => l.length > 0);
  }

  if (options.removeDuplicates) {
    const seen = new Set<string>();
    processedLines = processedLines.filter(l => {
      const key = l.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return processedLines.map((line, idx) => ({
    id: `batch-item-${idx}-${Math.random().toString(36).substr(2, 6)}`,
    index: idx + 1,
    original: line,
    status: 'pending',
    selected: true
  }));
}
