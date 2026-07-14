import { toolConfigs } from '../config';
import { logger } from './logger';

export interface RegisteredWorkspace {
  slug: string;
  name: string;
  category: string;
}

class WorkspaceRegistry {
  private registry: Map<string, RegisteredWorkspace> = new Map();

  register(workspace: RegisteredWorkspace) {
    if (this.registry.has(workspace.slug)) {
      logger.warn(`Workspace "${workspace.slug}" is already registered. Overwriting...`);
    }
    this.registry.set(workspace.slug, workspace);
    logger.debug(`Registered workspace: "${workspace.slug}"`);
  }

  get(slug: string): RegisteredWorkspace | undefined {
    return this.registry.get(slug);
  }

  getAll(): RegisteredWorkspace[] {
    return Array.from(this.registry.values());
  }
}

export const workspaceRegistry = new WorkspaceRegistry();

// Self-register known typography utilities on module load
import { tools } from '../data/tools';

const typographySlugs = [
  { slug: 'fancy-text-generator', name: 'Fancy Text Generator', category: 'Typography' },
  { slug: 'bold-text-generator', name: 'Bold Text Generator', category: 'Typography' },
  { slug: 'cursive-text-generator', name: 'Cursive Text Generator', category: 'Typography' },
  { slug: 'italic-text-generator', name: 'Italic Text Generator', category: 'Typography' },
  { slug: 'underline-text-generator', name: 'Underline Text Generator', category: 'Typography' },
  { slug: 'strikethrough-text-generator', name: 'Strikethrough Text Generator', category: 'Typography' },
  { slug: 'vaporwave-text-generator', name: 'Vaporwave Text Generator', category: 'Typography' },
  { slug: 'unicode-text-generator', name: 'Unicode Symbols Generator', category: 'Typography' }
];

typographySlugs.forEach(item => {
  if (toolConfigs[item.slug]) {
    workspaceRegistry.register(item);
  }
});

// Register name generators dynamically
tools.forEach(tool => {
  const isNameGen = tool.slug.includes('name-generator') || tool.slug.includes('names-generator') || tool.slug.includes('generator-name') || tool.slug.endsWith('-name') || tool.slug === 'cursive-name-generator';
  if (isNameGen) {
    workspaceRegistry.register({
      slug: tool.slug,
      name: tool.name,
      category: 'Name Generators'
    });
  }
});
