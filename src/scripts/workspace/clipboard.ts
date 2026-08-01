import { copyText } from '../../lib/clipboard';

export class ClipboardHelper {
  private static liveRegion: HTMLElement | null = null;
  private static toastTimeout: any = null;

  private static getLiveRegion(): HTMLElement {
    if (!this.liveRegion && typeof document !== 'undefined') {
      let el = document.getElementById('taptogen-aria-live');
      if (!el) {
        el = document.createElement('div');
        el.id = 'taptogen-aria-live';
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
        el.className = 'sr-only';
        el.style.position = 'absolute';
        el.style.width = '1px';
        el.style.height = '1px';
        el.style.padding = '0';
        el.style.overflow = 'hidden';
        el.style.clip = 'rect(0, 0, 0, 0)';
        el.style.whiteSpace = 'nowrap';
        el.style.border = '0';
        document.body.appendChild(el);
      }
      this.liveRegion = el;
    }
    return this.liveRegion!;
  }

  private static showToast(msg: string, isError: boolean = false) {
    if (typeof document === 'undefined') return;

    let toast = document.getElementById('taptogen-copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'taptogen-copy-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.zIndex = '9999';
      toast.style.padding = '12px 20px';
      toast.style.background = 'var(--color-bg-secondary, #1e293b)';
      toast.style.color = 'var(--color-text-primary, #f8fafc)';
      toast.style.border = '1px solid var(--color-border, rgba(255, 255, 255, 0.15))';
      toast.style.borderRadius = '10px';
      toast.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)';
      toast.style.backdropFilter = 'blur(12px)';
      toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      toast.style.fontSize = '0.9rem';
      toast.style.fontWeight = '600';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '8px';
      toast.style.transition = 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(16px)';
      toast.style.pointerEvents = 'none';
      document.body.appendChild(toast);
    }

    const isFr = document.documentElement.lang === 'fr';
    const defaultMsg = isError
      ? (isFr ? '✖ Échec de la copie !' : '✖ Copy failed!')
      : (isFr ? '✔ Copié dans le presse-papier !' : '✔ Copied to clipboard!');

    const displayMsg = msg || defaultMsg;
    const icon = isError ? '✖' : '✔';
    const iconColor = isError ? '#ef4444' : '#10b981';

    // Clear existing animation timeout to handle rapid clicking cleanly
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }

    toast.innerHTML = `<span style="color: ${iconColor}; font-size: 1.1rem;">${icon}</span> <span>${displayMsg}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    const region = this.getLiveRegion();
    if (region) region.textContent = displayMsg;

    this.toastTimeout = setTimeout(() => {
      if (toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(16px)';
      }
    }, 2200);
  }

  static async copy(text: string, button?: HTMLElement, isError: boolean = false, customMsg?: string): Promise<boolean> {
    if (!text && !isError) {
      this.showToast(document.documentElement.lang === 'fr' ? 'Aucun texte à copier' : 'No text to copy', true);
      return false;
    }

    try {
      const success = await copyText(text);

      if (success) {
        // Mobile Haptic Vibration
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
          try { navigator.vibrate(40); } catch (e) {}
        }

        // Button visual state
        if (button) {
          const originalText = button.textContent || 'Copy';
          const isFr = document.documentElement.lang === 'fr';
          button.textContent = isFr ? 'Copié !' : 'Copied!';
          button.classList.add('copied');
          button.setAttribute('aria-label', isFr ? 'Texte copié !' : 'Text copied!');
          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
            button.removeAttribute('aria-label');
          }, 2000);
        }

        // Animated Toast & Live Region Announcement
        this.showToast(customMsg || '', false);
        return true;
      } else {
        this.showToast(customMsg || '', true);
        return false;
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      this.showToast(customMsg || '', true);
      return false;
    }
  }
}
