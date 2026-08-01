import type { BatchItem, BatchStats } from './types';
import { parseBatchContent } from './parser';
import { BatchProcessor, type TransformFunction } from './processor';
import { exportBatchResults } from './export';
import { ClipboardHelper } from '../clipboard';

export function setupBatchUI(toolSlug: string, transformFn: TransformFunction) {
  if (typeof document === 'undefined') return;

  const workspace = document.getElementById('tool-workspace');
  const inputArea = document.getElementById('tool-input') as HTMLTextAreaElement | null;
  if (!workspace || !inputArea) return;

  // Insert Batch Trigger Button into toolbar if not present
  let batchBtn = document.getElementById('btn-batch-mode');
  if (!batchBtn) {
    const newBtn = document.createElement('button');
    newBtn.id = 'btn-batch-mode';
    newBtn.className = 'btn btn-ghost';
    newBtn.type = 'button';
    newBtn.title = 'Batch Process Files (TXT, CSV, JSON, MD)';
    newBtn.style.cssText = 'padding: 6px 12px; font-size: 0.8rem; border-radius: 8px; margin-left: 8px; border: 1px solid var(--color-border);';
    newBtn.innerHTML = '⚡ Batch File';
    
    const actionsGroup = workspace.querySelector('.workspace-actions, .input-actions, .actions');
    if (actionsGroup) {
      actionsGroup.appendChild(newBtn);
    }
    batchBtn = newBtn;
  }

  // Setup Drag & Drop Zone on input area
  inputArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    inputArea.style.borderColor = '#818cf8';
    inputArea.style.background = 'rgba(99, 102, 241, 0.08)';
  });

  inputArea.addEventListener('dragleave', () => {
    inputArea.style.borderColor = '';
    inputArea.style.background = '';
  });

  inputArea.addEventListener('drop', async (e) => {
    e.preventDefault();
    inputArea.style.borderColor = '';
    inputArea.style.background = '';

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds maximum 10 MB limit.');
        return;
      }
      const text = await file.text();
      openBatchModal(toolSlug, text, file.name, transformFn);
    }
  });

  batchBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.csv,.tsv,.json,.md';
    fileInput.onchange = async () => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        if (file.size > 10 * 1024 * 1024) {
          alert('File size exceeds maximum 10 MB limit.');
          return;
        }
        const text = await file.text();
        openBatchModal(toolSlug, text, file.name, transformFn);
      }
    };
    fileInput.click();
  });
}

export function openBatchModal(toolSlug: string, content: string, filename: string, transformFn: TransformFunction) {
  let items = parseBatchContent(content, filename);
  let processor: BatchProcessor | null = null;
  const isFr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.lang === 'fr' : false;

  let modal = document.getElementById('taptogen-batch-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'taptogen-batch-modal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center; padding: 20px;
    `;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background: #1e293b; border: 1px solid #334155; border-radius: 16px; width: 100%; max-width: 900px; max-height: 90vh; display: flex; flex-direction: column; color: #f8fafc; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
      <div style="padding: 16px 24px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; font-size: 1.1rem;">⚡ ${isFr ? 'Traitement par lot' : 'Batch Processor'} - ${filename || 'Input'}</h3>
        <button id="batch-close-btn" style="background: none; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer;">✕</button>
      </div>

      <!-- Controls & Progress -->
      <div style="padding: 16px 24px; border-bottom: 1px solid #334155; background: rgba(0,0,0,0.15); display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <button id="batch-start-btn" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 8px;">▶ ${isFr ? 'Démarrer' : 'Start Process'}</button>
          <button id="batch-pause-btn" class="btn btn-ghost" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 8px; display: none;">⏸ ${isFr ? 'Pause' : 'Pause'}</button>
          <button id="batch-cancel-btn" class="btn btn-ghost" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 8px; display: none;">⏹ ${isFr ? 'Annuler' : 'Cancel'}</button>

          <input type="text" id="batch-search-input" placeholder="${isFr ? 'Rechercher...' : 'Search items...'}" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff; margin-left: auto; width: 180px;" />
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="flex: 1; height: 8px; background: #0f172a; border-radius: 4px; overflow: hidden; border: 1px solid #334155;">
            <div id="batch-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #6366f1, #818cf8); transition: width 0.2s;"></div>
          </div>
          <span id="batch-progress-text" style="font-size: 0.8rem; color: #94a3b8; font-weight: 500; min-width: 140px; text-align: right;">0 / ${items.length} (0%)</span>
        </div>
      </div>

      <!-- Preview Table -->
      <div style="flex: 1; overflow-y: auto; padding: 16px 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
          <thead>
            <tr style="border-bottom: 1px solid #334155; color: #94a3b8; text-align: left;">
              <th style="padding: 8px; width: 40px;">#</th>
              <th style="padding: 8px;">Original</th>
              <th style="padding: 8px;">Processed</th>
              <th style="padding: 8px; width: 100px;">Status</th>
              <th style="padding: 8px; width: 80px; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody id="batch-table-body">
            <!-- Rows dynamically rendered -->
          </tbody>
        </table>
      </div>

      <!-- Exporters Footer -->
      <div style="padding: 16px 24px; border-top: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.15);">
        <span style="font-size: 0.8rem; color: #94a3b8;">${items.length} ${isFr ? 'éléments chargés' : 'items loaded'}</span>
        <div style="display: flex; gap: 8px;">
          <button id="batch-export-txt" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px;">📥 TXT</button>
          <button id="batch-export-csv" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px;">📊 CSV</button>
          <button id="batch-export-json" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px;">📄 JSON</button>
          <button id="batch-export-md" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px;">📝 MD</button>
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';

  const renderTable = (filter: string = '') => {
    const tbody = document.getElementById('batch-table-body');
    if (!tbody) return;

    let filtered = items;
    if (filter.trim().length > 0) {
      const q = filter.toLowerCase();
      filtered = items.filter(i => i.original.toLowerCase().includes(q) || (i.processed && i.processed.toLowerCase().includes(q)));
    }

    tbody.innerHTML = filtered.slice(0, 500).map(item => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding: 8px; color: #64748b;">${item.index}</td>
        <td style="padding: 8px; font-family: monospace; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.original}</td>
        <td style="padding: 8px; font-family: monospace; color: #818cf8; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.processed || '-'}</td>
        <td style="padding: 8px;">
          <span style="padding: 2px 8px; font-size: 0.75rem; border-radius: 4px; background: ${
            item.status === 'completed' ? 'rgba(34,197,94,0.15); color: #4ade80' :
            item.status === 'processing' ? 'rgba(99,102,241,0.15); color: #818cf8' :
            item.status === 'error' ? 'rgba(239,68,68,0.15); color: #ef4444' : 'rgba(255,255,255,0.08); color: #94a3b8'
          };">${item.status}</span>
        </td>
        <td style="padding: 8px; text-align: right;">
          ${item.processed ? `<button class="batch-copy-row" data-text="${item.processed.replace(/"/g, '&quot;')}" style="background: none; border: none; color: #818cf8; cursor: pointer;">📋</button>` : ''}
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.batch-copy-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-text');
        if (text) ClipboardHelper.copy(text, btn as HTMLElement);
      });
    });
  };

  renderTable();

  // Search Listener
  document.getElementById('batch-search-input')?.addEventListener('input', (e) => {
    renderTable((e.target as HTMLInputElement).value);
  });

  // Start Processing
  document.getElementById('batch-start-btn')?.addEventListener('click', () => {
    processor = new BatchProcessor(items, transformFn);

    const startBtn = document.getElementById('batch-start-btn');
    const pauseBtn = document.getElementById('batch-pause-btn');
    const cancelBtn = document.getElementById('batch-cancel-btn');

    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
    if (cancelBtn) cancelBtn.style.display = 'inline-block';

    processor.onProgress((stats, currentItems) => {
      items = currentItems;
      const pct = Math.round((stats.processed / stats.total) * 100) || 0;
      const pBar = document.getElementById('batch-progress-bar');
      const pText = document.getElementById('batch-progress-text');
      if (pBar) pBar.style.width = `${pct}%`;
      if (pText) pText.textContent = `${stats.processed} / ${stats.total} (${pct}%)`;
      renderTable((document.getElementById('batch-search-input') as HTMLInputElement)?.value || '');
    });

    processor.onComplete(() => {
      if (pauseBtn) pauseBtn.style.display = 'none';
      if (cancelBtn) cancelBtn.style.display = 'none';
      if (startBtn) {
        startBtn.style.display = 'inline-block';
        startBtn.textContent = '✔ Complete';
      }
    });

    processor.start();
  });

  // Exporters
  document.getElementById('batch-export-txt')?.addEventListener('click', () => exportBatchResults(items, toolSlug, 'txt'));
  document.getElementById('batch-export-csv')?.addEventListener('click', () => exportBatchResults(items, toolSlug, 'csv'));
  document.getElementById('batch-export-json')?.addEventListener('click', () => exportBatchResults(items, toolSlug, 'json'));
  document.getElementById('batch-export-md')?.addEventListener('click', () => exportBatchResults(items, toolSlug, 'md'));

  // Close modal
  document.getElementById('batch-close-btn')?.addEventListener('click', () => {
    if (processor) processor.cancel();
    if (modal) modal.style.display = 'none';
  });
}
