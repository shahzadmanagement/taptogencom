import type { CommandItem, CommandGroup } from './types';
import { getDefaultCommands } from './commands';
import { rankCommands } from './ranking';

export class PaletteSearchEngine {
  private allCommands: CommandItem[] = [];

  constructor(customCommands: CommandItem[] = []) {
    this.allCommands = [...getDefaultCommands(), ...customCommands];
  }

  public registerCommand(item: CommandItem) {
    this.allCommands = this.allCommands.filter(c => c.id !== item.id);
    this.allCommands.push(item);
  }

  public search(query: string): CommandItem[] {
    return rankCommands(this.allCommands, query);
  }

  public searchGrouped(query: string): CommandGroup[] {
    const ranked = this.search(query);
    const groupsMap = new Map<string, CommandItem[]>();

    ranked.forEach(item => {
      const cat = item.category || 'workspace';
      if (!groupsMap.has(cat)) {
        groupsMap.set(cat, []);
      }
      groupsMap.get(cat)!.push(item);
    });

    const isFr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.lang === 'fr' : false;

    const groupLabels: Record<string, string> = {
      workspace: isFr ? 'Actions Espace de Travail' : 'Workspace Actions',
      exporters: isFr ? 'Exportations & Téléchargements' : 'Export & Downloads',
      tools: isFr ? 'Outils & Utilitaires' : 'Tools & Utilities',
      pinned: isFr ? 'Éléments Épinglés' : 'Pinned Items',
      recent: isFr ? 'Récemment Utilisés' : 'Recent Commands',
      navigation: isFr ? 'Navigation' : 'Navigation',
      settings: isFr ? 'Paramètres' : 'Settings'
    };

    const groups: CommandGroup[] = [];
    groupsMap.forEach((items, category) => {
      groups.push({
        category: category as any,
        label: groupLabels[category] || category,
        items
      });
    });

    return groups;
  }
}
