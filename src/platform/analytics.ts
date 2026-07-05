export interface AnalyticsProvider {
  name: string;
  track(event: string, properties?: Record<string, any>): void;
}

class ConsoleAnalyticsProvider implements AnalyticsProvider {
  name = 'Console';
  track(event: string, properties?: Record<string, any>): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics] Track Event: "${event}"`, properties ?? '');
    }
  }
}

class AnalyticsManager {
  private providers: AnalyticsProvider[] = [new ConsoleAnalyticsProvider()];

  registerProvider(provider: AnalyticsProvider) {
    this.providers.push(provider);
  }

  track(event: string, properties?: Record<string, any>) {
    this.providers.forEach(provider => {
      try {
        provider.track(event, properties);
      } catch (err) {
        console.error(`[Analytics] Provider "${provider.name}" failed:`, err);
      }
    });
  }

  trackCopy(text: string, style: string) {
    this.track('copy_text', { style, textLength: text.length });
  }

  trackFavorite(styleName: string, active: boolean) {
    this.track('favorite_style', { styleName, active });
  }

  trackExport(format: string, count: number) {
    this.track('export_document', { format, count });
  }

  trackSearch(query: string) {
    this.track('search_styles', { queryLength: query.length });
  }

  trackPreview(platform: string) {
    this.track('switch_preview_tab', { platform });
  }

  trackShortcut(keyCombo: string) {
    this.track('keyboard_shortcut', { keyCombo });
  }

  trackConversion(slug: string, textLength: number) {
    this.track('live_conversion', { slug, textLength });
  }
}

export const analytics = new AnalyticsManager();
