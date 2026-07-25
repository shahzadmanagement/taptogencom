export interface UrlAnalysis {
  isValid: boolean;
  protocol: string;
  hostname: string;
  pathname: string;
  queryParams: Record<string, string>;
  utmParams: Record<string, string>;
}

export function parseAndAnalyzeUrl(rawUrl: string): UrlAnalysis {
  let urlObj: URL | null = null;
  let formatted = rawUrl.trim();

  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = 'https://' + formatted;
  }

  try {
    urlObj = new URL(formatted);
  } catch (e) {
    return {
      isValid: false,
      protocol: '',
      hostname: '',
      pathname: '',
      queryParams: {},
      utmParams: {}
    };
  }

  const queryParams: Record<string, string> = {};
  const utmParams: Record<string, string> = {};

  urlObj.searchParams.forEach((val, key) => {
    queryParams[key] = val;
    if (key.startsWith('utm_')) {
      utmParams[key] = val;
    }
  });

  return {
    isValid: true,
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    pathname: urlObj.pathname,
    queryParams,
    utmParams
  };
}

export function buildUtmUrl(baseUrl: string, utm: { source: string; medium: string; campaign: string; term?: string; content?: string }): string {
  let cleanBase = baseUrl.trim();
  if (!cleanBase.startsWith('http://') && !cleanBase.startsWith('https://')) {
    cleanBase = 'https://' + cleanBase;
  }

  try {
    const url = new URL(cleanBase);
    if (utm.source) url.searchParams.set('utm_source', utm.source);
    if (utm.medium) url.searchParams.set('utm_medium', utm.medium);
    if (utm.campaign) url.searchParams.set('utm_campaign', utm.campaign);
    if (utm.term) url.searchParams.set('utm_term', utm.term);
    if (utm.content) url.searchParams.set('utm_content', utm.content);
    return url.toString();
  } catch (e) {
    return cleanBase;
  }
}
