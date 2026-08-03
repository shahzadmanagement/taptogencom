/**
 * URL State Engine — TapToGen Zero-Backend Shareable State Links
 *
 * Compresses and encodes tool inputs and custom option settings into Base64URL string
 * appended to the URL fragment (#state=...). Decodes state 100% in-browser.
 */

export interface ToolState {
  input?: string;
  options?: Record<string, string | boolean | number>;
  v?: number; // version tag
}

export function encodeState(state: ToolState): string {
  try {
    const payload = JSON.stringify({
      v: 1,
      i: state.input || '',
      o: state.options || {}
    });
    // UTF-8 to Base64URL
    const utf8Bytes = new TextEncoder().encode(payload);
    let binary = '';
    utf8Bytes.forEach(b => binary += String.fromCharCode(b));
    const base64 = btoa(binary);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (err) {
    console.error('Failed to encode tool state:', err);
    return '';
  }
}

export function decodeState(encoded: string): ToolState | null {
  try {
    if (!encoded) return null;
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    return {
      input: parsed.i || '',
      options: parsed.o || {},
      v: parsed.v || 1
    };
  } catch (err) {
    console.error('Failed to decode tool state:', err);
    return null;
  }
}

export function readHashState(): ToolState | null {
  if (typeof window === 'undefined' || !window.location) return null;
  const hash = window.location.hash;
  if (!hash || !hash.includes('state=')) return null;
  const match = hash.match(/state=([^&]+)/);
  if (!match || !match[1]) return null;
  return decodeState(match[1]);
}

export function generateShareableUrl(state: ToolState): string {
  if (typeof window === 'undefined' || !window.location) return '';
  const encoded = encodeState(state);
  if (!encoded) return window.location.href;
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#state=${encoded}`;
}
