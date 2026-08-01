import { copyText } from './clipboard';

export class ClipboardManager {
  static async copy(text: string, buttonElement?: HTMLElement): Promise<boolean> {
    if (!text) return false;
    const success = await copyText(text);
    if (success && buttonElement) {
      const originalText = buttonElement.textContent || 'Copy';
      buttonElement.textContent = 'Copied!';
      buttonElement.classList.add('copied');
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.classList.remove('copied');
      }, 2000);
    }
    return success;
  }
}
