declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    va?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

export interface AnalyticsConfig {
  enableGA: boolean;
  enableClarity: boolean;
  enableGTM: boolean;
  enablePlausible: boolean;
  env: 'development' | 'preview' | 'production';
  consentGranted: boolean;
}

export const defaultAnalyticsConfig: AnalyticsConfig = {
  enableGA: true,
  enableClarity: true,
  enableGTM: true,
  enablePlausible: false,
  env: (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') ? 'production' : 'development',
  consentGranted: true
};

export function initializeAnalytics(config: Partial<AnalyticsConfig> = {}): void {
  const finalConfig = { ...defaultAnalyticsConfig, ...config };
  
  // Only load analytics tags in production env
  if (finalConfig.env !== 'production') {
    return;
  }

  // Ensure user has granted consent
  if (!finalConfig.consentGranted) {
    return;
  }

  if (typeof window === 'undefined') return;

  // 1. Google Analytics 4 Script Loader
  if (finalConfig.enableGA && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-MOCKID1234';
    document.head.appendChild(script);

    window.gtag = function (...args: any[]) {
      // Keep track of parameters
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-MOCKID1234');
  }

  // 2. Microsoft Clarity Script Loader
  if (finalConfig.enableClarity && !window.clarity) {
    window.clarity = function (...args: any[]) {
      // Mock clarity analytics events
    };
  }
}

// --------------------------------------------------
// Core Web Vitals Collector
// --------------------------------------------------
export interface WebVitalMetric {
  name: 'FCP' | 'LCP' | 'CLS' | 'INP' | 'TTFB';
  value: number;
}

export function trackCoreWebVital(metric: WebVitalMetric): void {
  sendEvent('core_web_vital', {
    metric_name: metric.name,
    metric_value: metric.value
  });
}

// --------------------------------------------------
// Health & SEO Crawler Monitoring
// --------------------------------------------------
export interface HealthReport {
  statusCode: number;
  brokenInternalLinksCount: number;
  brokenExternalLinksCount: number;
  missingCanonical: boolean;
  missingHreflang: boolean;
  missingSchema: boolean;
  missingMeta: boolean;
  isOrphan: boolean;
}

export function trackHealthAudit(pathname: string, report: HealthReport): void {
  if (report.statusCode >= 400) {
    sendEvent('http_error', {
      pathname,
      status_code: report.statusCode
    });
  }

  if (report.missingCanonical || report.missingHreflang || report.missingSchema || report.missingMeta) {
    sendEvent('seo_issue_detected', {
      pathname,
      missing_canonical: report.missingCanonical,
      missing_hreflang: report.missingHreflang,
      missing_schema: report.missingSchema,
      missing_meta: report.missingMeta
    });
  }

  if (report.isOrphan) {
    sendEvent('orphan_page_detected', { pathname });
  }
}

// --------------------------------------------------
// Core Interaction Events Trackers
// --------------------------------------------------
export function trackGeneratorOpen(slug: string): void {
  sendEvent('generator_open', { generator_slug: slug });
}

export function trackGenerate(slug: string): void {
  sendEvent('generator_generate', { generator_slug: slug });
}

export function trackCopy(slug: string): void {
  sendEvent('generator_copy', { generator_slug: slug });
}

export function trackDownload(slug: string): void {
  sendEvent('generator_download', { generator_slug: slug });
}

export function trackShare(slug: string): void {
  sendEvent('generator_share', { generator_slug: slug });
}

export function trackSearchUsage(query: string): void {
  sendEvent('search_usage', { search_query: query });
}

export function trackAiRequest(toolSlug: string, promptVersion: string): void {
  sendEvent('ai_request_dispatched', { generator_slug: toolSlug, prompt_version: promptVersion });
}

export function trackLanguageSwitch(fromLang: string, toLang: string): void {
  sendEvent('language_switch', { from_language: fromLang, to_language: toLang });
}

export function trackOptionChange(slug: string, option: string, value?: string | boolean | number): void {
  sendEvent('generator_option_change', {
    generator_slug: slug,
    option_id: option,
    option_value: value !== undefined ? String(value) : ''
  });
}

export function trackExperimentExposure(experimentId: string, variant: string, toolSlug?: string): void {
  sendEvent('experiment_exposure', {
    experiment_id: experimentId,
    variant_id: variant,
    tool_slug: toolSlug || 'global',
    timestamp: new Date().toISOString()
  });
}

export function trackExperimentConversion(experimentId: string, variant: string, eventName: string, toolSlug?: string): void {
  sendEvent('experiment_conversion', {
    experiment_id: experimentId,
    variant_id: variant,
    conversion_event: eventName,
    tool_slug: toolSlug || 'global',
    timestamp: new Date().toISOString()
  });
}

export function trackExperimentComplete(experimentId: string, variant: string, toolSlug?: string): void {
  sendEvent('experiment_complete', {
    experiment_id: experimentId,
    variant_id: variant,
    tool_slug: toolSlug || 'global',
    timestamp: new Date().toISOString()
  });
}

function sendEvent(name: string, params: Record<string, any>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }

  if (typeof window !== 'undefined' && typeof window.va === 'function') {
    window.va('event', { name, data: params });
  }

  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    console.log(`[Analytics Event]: ${name}`, params);
  }
}
