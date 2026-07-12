declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    va?: (...args: any[]) => void;
  }
}

export function trackGeneratorOpen(slug: string): void {
  try {
    sendEvent('generator_open', { generator_slug: slug });
  } catch (e) {
    // Graceful fallback
  }
}

export function trackGenerate(slug: string): void {
  try {
    sendEvent('generator_generate', { generator_slug: slug });
  } catch (e) {
    // Graceful fallback
  }
}

export function trackCopy(slug: string): void {
  try {
    sendEvent('generator_copy', { generator_slug: slug });
  } catch (e) {
    // Graceful fallback
  }
}

export function trackDownload(slug: string): void {
  try {
    sendEvent('generator_download', { generator_slug: slug });
  } catch (e) {
    // Graceful fallback
  }
}

export function trackShare(slug: string): void {
  try {
    sendEvent('generator_share', { generator_slug: slug });
  } catch (e) {
    // Graceful fallback
  }
}

export function trackOptionChange(slug: string, option: string, value?: string | boolean | number): void {
  try {
    sendEvent('generator_option_change', {
      generator_slug: slug,
      option_id: option,
      option_value: value !== undefined ? String(value) : ''
    });
  } catch (e) {
    // Graceful fallback
  }
}

function sendEvent(name: string, params: Record<string, any>): void {
  // 1. Google Analytics 4
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }

  // 2. Vercel Analytics support
  if (typeof window !== 'undefined' && typeof window.va === 'function') {
    window.va('event', { name, data: params });
  }

  // 3. Graceful debug fallback
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    console.log(`[Analytics Event]: ${name}`, params);
  }
}
