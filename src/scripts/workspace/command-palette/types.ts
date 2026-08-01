export type CommandCategory = 'workspace' | 'exporters' | 'tools' | 'settings' | 'navigation' | 'recent' | 'pinned';

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: CommandCategory;
  icon: string;
  shortcut?: string;
  keywords?: string[];
  aliases?: string[];
  action: () => void | Promise<void>;
  pinned?: boolean;
  score?: number;
  url?: string;
}

export interface CommandGroup {
  category: CommandCategory;
  label: string;
  items: CommandItem[];
}

export interface PaletteState {
  isOpen: boolean;
  query: string;
  selectedIndex: number;
  filteredItems: CommandItem[];
}
