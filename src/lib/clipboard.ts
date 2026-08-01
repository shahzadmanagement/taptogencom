/**
 * Enterprise-grade Clipboard Helper with execCommand Fallback
 *
 * 1. Tries navigator.clipboard.writeText()
 * 2. Catches failure (NotAllowedError, PermissionDenied, SecurityError, non-secure context, or missing API)
 * 3. Creates temporary hidden textarea
 * 4. Focuses, selects, executes document.execCommand('copy')
 * 5. Cleans up DOM
 * 6. Returns Promise<boolean>
 */
export async function copyText(text: string): Promise<boolean> {
  if (text === null || text === undefined) return false;

  // 1. Modern Async Clipboard API
  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function' &&
    (typeof window === 'undefined' || window.isSecureContext !== false)
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fall through to execCommand fallback on NotAllowedError, SecurityError, PermissionDenied, etc.
    }
  }

  // 2. Legacy Fallback: execCommand('copy') using hidden textarea
  if (typeof document === 'undefined') return false;

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.setAttribute('readonly', '');

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.error('Fallback execCommand copy failed: ', err);
    return false;
  }
}
