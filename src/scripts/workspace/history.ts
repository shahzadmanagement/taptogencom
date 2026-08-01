import type { ToolConfig } from '../../config';
import { saveSessionRecord, getSessionsByTool, deleteSessionRecord, clearSessionsByTool, type SessionRecord } from '../../lib/storage-engine';

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function renderHistory(toolSlug: string) {
  const list = document.getElementById(`history-list`) || document.getElementById(`${toolSlug.split('-')[0]}-history-list`);
  if (!list) return;

  const sessions = await getSessionsByTool(toolSlug);
  const isFr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.lang === 'fr' : false;

  if (sessions.length === 0) {
    list.innerHTML = `<p style="color: var(--color-text-muted, #94a3b8); font-size: 0.85rem; font-style: italic; margin: 0;">${isFr ? 'Aucun historique de session disponible.' : 'No recent sessions recorded.'}</p>`;
    return;
  }

  list.innerHTML = sessions.map(session => {
    const dateStr = new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `
      <div class="history-item" style="display: flex; flex-direction: column; gap: 6px; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border, rgba(255,255,255,0.12)); border-radius: 10px; padding: 12px; font-size: 0.85rem; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; color: var(--color-text-secondary, #94a3b8); font-size: 0.75rem;">
          <span>🕒 ${dateStr}</span>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn-restore-session" data-session-id="${session.id}" style="background: rgba(99,102,241,0.2); color: #818cf8; border: none; border-radius: 6px; padding: 2px 8px; font-size: 0.75rem; cursor: pointer;">${isFr ? 'Restaurer' : 'Restore'}</button>
            <button type="button" class="btn-delete-session" data-session-id="${session.id}" style="background: rgba(239,68,68,0.15); color: #ef4444; border: none; border-radius: 6px; padding: 2px 8px; font-size: 0.75rem; cursor: pointer;">✕</button>
          </div>
        </div>
        <div style="font-family: monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--color-text-primary, #f8fafc); font-weight: 500;">
          ${escapeHtml(session.input || session.output)}
        </div>
      </div>
    `;
  }).join('');

  // Event Listeners for restore and delete
  list.querySelectorAll('.btn-restore-session').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-session-id');
      const found = sessions.find(s => s.id === id);
      if (found) {
        const inputEl = document.getElementById('tool-input') as HTMLTextAreaElement | null;
        if (inputEl && found.input) {
          inputEl.value = found.input;
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) generateBtn.click();
      }
    });
  });

  list.querySelectorAll('.btn-delete-session').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-session-id');
      if (id) {
        await deleteSessionRecord(id, toolSlug);
        renderHistory(toolSlug);
      }
    });
  });
}

// Session Restore Prompt (Task 4)
export async function checkSessionRestore(toolSlug: string, generate: () => void) {
  if (typeof localStorage !== 'undefined' && localStorage.getItem(`taptogen-no-restore-${toolSlug}`) === 'true') {
    return;
  }

  const sessions = await getSessionsByTool(toolSlug);
  if (sessions.length === 0) return;

  const latest = sessions[0];
  // Only prompt if session occurred within the last 24 hours and contains input
  if (!latest.input || Date.now() - latest.timestamp > 86400000) return;

  const inputEl = document.getElementById('tool-input') as HTMLTextAreaElement | null;
  if (inputEl && inputEl.value.trim().length > 0) return; // Don't prompt if already populated

  let promptBanner = document.getElementById('session-restore-banner');
  if (!promptBanner) {
    promptBanner = document.createElement('div');
    promptBanner.id = 'session-restore-banner';
    promptBanner.style.cssText = `
      margin-bottom: 16px;
      padding: 12px 16px;
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 0.88rem;
      color: var(--color-text-primary, #f8fafc);
      backdrop-filter: blur(8px);
    `;
    const workspace = document.getElementById('tool-workspace');
    if (workspace && workspace.firstChild) {
      workspace.insertBefore(promptBanner, workspace.firstChild);
    }
  }

  const isFr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.lang === 'fr' : false;
  promptBanner.innerHTML = `
    <div>
      <strong>${isFr ? 'Continuer la session précédente ?' : 'Continue previous session?'}</strong>
      <div style="font-size: 0.78rem; color: var(--color-text-secondary, #94a3b8); max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        "${escapeHtml(latest.input)}"
      </div>
    </div>
    <div style="display: flex; gap: 6px; align-items: center;">
      <button type="button" id="btn-restore-yes" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px;">${isFr ? 'Oui' : 'Yes'}</button>
      <button type="button" id="btn-restore-no" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px;">${isFr ? 'Non' : 'No'}</button>
      <button type="button" id="btn-restore-never" style="background: none; border: none; color: var(--color-text-muted, #64748b); font-size: 0.75rem; cursor: pointer; text-decoration: underline;">${isFr ? 'Ne plus demander' : "Don't ask"}</button>
    </div>
  `;

  document.getElementById('btn-restore-yes')?.addEventListener('click', () => {
    if (inputEl) {
      inputEl.value = latest.input;
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
    generate();
    promptBanner?.remove();
  });

  document.getElementById('btn-restore-no')?.addEventListener('click', () => {
    promptBanner?.remove();
  });

  document.getElementById('btn-restore-never')?.addEventListener('click', () => {
    localStorage.setItem(`taptogen-no-restore-${toolSlug}`, 'true');
    promptBanner?.remove();
  });
}

export function initHistory(config: ToolConfig, output: HTMLElement) {
  if (!config.history || typeof document === 'undefined') return;
  const toolSlug = config.slug;

  // Clear History Button handler
  document.getElementById('btn-clear-history')?.addEventListener('click', async () => {
    await clearSessionsByTool(toolSlug);
    renderHistory(toolSlug);
  });

  // Track & Save session when generate is executed or copy button is clicked
  const inputEl = document.getElementById('tool-input') as HTMLTextAreaElement | null;
  output.addEventListener('click', async event => {
    const target = event.target as HTMLElement;
    const button = target.closest<HTMLElement>('[data-copy]');
    if (!button) return;
    const copiedText = button.dataset.copy || '';
    if (!copiedText) return;

    const record: SessionRecord = {
      id: `${toolSlug}-${Date.now()}`,
      tool: toolSlug,
      input: inputEl?.value || '',
      output: copiedText,
      timestamp: Date.now(),
      language: (typeof document !== 'undefined' && document.documentElement?.lang) || 'en'
    };

    await saveSessionRecord(record);
    renderHistory(toolSlug);
  });

  renderHistory(toolSlug);
}
