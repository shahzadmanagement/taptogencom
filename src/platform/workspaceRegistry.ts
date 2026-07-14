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

// Register AI writing tools dynamically
tools.forEach(tool => {
  const isWriting = tool.slug.includes('paragraph') || tool.slug.includes('sentence') || tool.slug.includes('story') || tool.slug.includes('article') || tool.slug.includes('essay') || tool.slug.includes('blog') || tool.slug.includes('description') || tool.slug.includes('bio') || tool.slug.includes('caption') || tool.slug.includes('review') || tool.slug.includes('headline') || tool.slug.includes('title') || tool.slug.includes('email') || tool.slug.includes('letter') || tool.slug.includes('summary') || tool.slug.includes('rewrite') || tool.slug.includes('writing') || tool.slug.includes('prompt');
  if (isWriting) {
    workspaceRegistry.register({
      slug: tool.slug,
      name: tool.name,
      category: 'AI Writing'
    });
  }
});
