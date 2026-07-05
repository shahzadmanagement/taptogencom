export class ClipboardManager {
  static async copy(text: string, buttonElement?: HTMLElement): Promise<boolean> {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      if (buttonElement) {
        const originalText = buttonElement.textContent || 'Copy';
        buttonElement.textContent = 'Copied!';
        buttonElement.classList.add('copied');
        setTimeout(() => {
          buttonElement.textContent = originalText;
          buttonElement.classList.remove('copied');
        }, 2000);
      }
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }
}
