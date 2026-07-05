export interface RobotsDirectives {
  index: boolean;
  follow: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
}

export function getRobotsDirectiveString(directives: RobotsDirectives): string {
  const parts: string[] = [];
  parts.push(directives.index ? 'index' : 'noindex');
  parts.push(directives.follow ? 'follow' : 'nofollow');
  if (directives.maxSnippet !== undefined) {
    parts.push(`max-snippet:${directives.maxSnippet}`);
  }
  if (directives.maxImagePreview) {
    parts.push(`max-image-preview:${directives.maxImagePreview}`);
  }
  return parts.join(', ');
}
