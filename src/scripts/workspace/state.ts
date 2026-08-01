/**
 * Shareable URL Hash State Manager (Task 1)
 * Serializes & Deserializes input and option controls to/from location.hash
 */

export function serializeState(input: HTMLTextAreaElement | null): void {
  if (typeof window === 'undefined' || typeof location === 'undefined') return;

  const params = new URLSearchParams();

  if (input && input.value && input.value.trim().length > 0) {
    params.set('input', input.value);
  }

  // Collect option controls within #tool-workspace
  const workspace = typeof document !== 'undefined' ? document.getElementById('tool-workspace') : null;
  if (workspace) {
    const selects = workspace.querySelectorAll<HTMLSelectElement>('select[data-option], select[name]');
    selects.forEach((sel) => {
      const name = sel.dataset.option || sel.name || sel.id;
      if (name && sel.value) {
        params.set(name, sel.value);
      }
    });

    const inputs = workspace.querySelectorAll<HTMLInputElement>('input[data-option]:checked, input[type="radio"]:checked');
    inputs.forEach((inp) => {
      const name = inp.dataset.option || inp.name || inp.id;
      if (name && inp.value) {
        params.set(name, inp.value);
      }
    });
  }

  const hashString = params.toString();
  const newUrl = hashString ? `${location.pathname}${location.search}#${hashString}` : `${location.pathname}${location.search}`;

  if (location.hash && location.hash.slice(1) !== hashString && typeof history !== 'undefined' && typeof history.replaceState === 'function') {
    history.replaceState(null, '', newUrl);
  }
}

export function restoreState(input: HTMLTextAreaElement | null, generate?: () => void): boolean {
  if (typeof window === 'undefined' || typeof location === 'undefined') return false;
  if (!location.hash || location.hash.length <= 1) return false;

  try {
    const params = new URLSearchParams(location.hash.slice(1));
    let restoredAny = false;

    const inputValue = params.get('input');
    if (inputValue !== null && input) {
      input.value = inputValue;
      restoredAny = true;
    }

    const workspace = typeof document !== 'undefined' ? document.getElementById('tool-workspace') : null;
    if (workspace) {
      params.forEach((value, key) => {
        if (key === 'input') return;
        const select = workspace.querySelector<HTMLSelectElement>(`select[data-option="${key}"], select[name="${key}"], #${key}`);
        if (select) {
          select.value = value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          restoredAny = true;
        }

        const radio = workspace.querySelector<HTMLInputElement>(`input[data-option="${key}"][value="${value}"], input[name="${key}"][value="${value}"]`);
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
          restoredAny = true;
        }
      });
    }

    if (restoredAny && generate) {
      generate();
    }
    return restoredAny;
  } catch (err) {
    console.error('Failed to restore URL hash state:', err);
    return false;
  }
}

export function bindStateSync(input: HTMLTextAreaElement | null, generate: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  // Restore state on initial page load / refresh
  restoreState(input, generate);

  // Debounced auto-serialization on input
  let timeout: any = null;
  const onInput = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      serializeState(input);
    }, 300);
  };

  input?.addEventListener('input', onInput);

  // Listen to option changes
  const workspace = typeof document !== 'undefined' ? document.getElementById('tool-workspace') : null;
  const onChange = () => {
    serializeState(input);
  };
  workspace?.addEventListener('change', onChange);

  // Listen to browser Back/Forward navigation (popstate & hashchange)
  const onHashChange = () => {
    restoreState(input, generate);
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('popstate', onHashChange);
    window.addEventListener('hashchange', onHashChange);
  }

  return () => {
    input?.removeEventListener('input', onInput);
    workspace?.removeEventListener('change', onChange);
    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
      window.removeEventListener('popstate', onHashChange);
      window.removeEventListener('hashchange', onHashChange);
    }
  };
}
