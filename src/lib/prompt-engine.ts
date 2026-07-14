interface SystemPromptTemplate {
  version: string;
  template: string;
}

export const promptRegistry: Record<string, SystemPromptTemplate> = {
  general: {
    version: '1.0.0',
    template: 'You are an advanced creative AI assistant. Generate highly specific suggestions for {toolName}. Do not include placeholders, formatting wrappers, or meta comments in the output.'
  },
  names: {
    version: '1.1.0',
    template: 'You are a professional brand name strategist. Create engaging, unique, and memorable name options for {toolName} targeting theme: "{theme}". Output a clean list of names only.'
  }
};

export function compilePrompt(toolName: string, category: string, variables: Record<string, string>): string {
  const baseRegistry = promptRegistry[category] || promptRegistry.general;
  let compiled = baseRegistry.template.replace('{toolName}', toolName);

  Object.entries(variables).forEach(([k, v]) => {
    compiled = compiled.replace(new RegExp(`{${k}}`, 'g'), v);
  });

  return compiled;
}
