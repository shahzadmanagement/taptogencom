export interface PromptTemplate {
  name: string;
  template: string;
}

const templates: Record<string, PromptTemplate> = {
  'seo-meta': {
    name: 'seo-meta',
    template: 'Generate an SEO meta description for: {{topic}}.'
  },
  'tool-copy': {
    name: 'tool-copy',
    template: 'Write a engaging introduction copy describing the utility of: {{toolName}}.'
  }
};

export function compilePrompt(templateName: string, vars: Record<string, string>): string {
  const t = templates[templateName];
  if (!t) return '';
  let result = t.template;
  Object.entries(vars).forEach(([key, val]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), val);
  });
  return result;
}
