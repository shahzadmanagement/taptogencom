export class ClipboardHelper {
  static async copy(text: string, button?: HTMLElement): Promise<boolean> {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      if (button) {
        const originalText = button.textContent || 'Copy';
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('copied');
        }, 2000);
      }
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }
}
