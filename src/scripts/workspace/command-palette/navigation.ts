import type { CommandItem } from './types';
import { addRecentCommand } from './storage';

export class PaletteNavigationHandler {
  private selectedIndex: number = 0;
  private items: CommandItem[] = [];
  private onSelectCallback?: (item: CommandItem, index: number) => void;
  private onExecuteCallback?: (item: CommandItem) => void;

  public updateItems(items: CommandItem[]) {
    this.items = items;
    this.selectedIndex = 0;
    this.notifySelect();
  }

  public onSelect(cb: (item: CommandItem, index: number) => void) {
    this.onSelectCallback = cb;
  }

  public onExecute(cb: (item: CommandItem) => void) {
    this.onExecuteCallback = cb;
  }

  public getSelectedIndex(): number {
    return this.selectedIndex;
  }

  public handleKeyDown(event: KeyboardEvent): boolean {
    if (this.items.length === 0) return false;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
      this.notifySelect();
      return true;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.items.length) % this.items.length;
      this.notifySelect();
      return true;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.selectedIndex = 0;
      this.notifySelect();
      return true;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.selectedIndex = this.items.length - 1;
      this.notifySelect();
      return true;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const item = this.items[this.selectedIndex];
      if (item) {
        addRecentCommand(item.id);
        if (this.onExecuteCallback) {
          this.onExecuteCallback(item);
        }
        item.action();
      }
      return true;
    }

    return false;
  }

  private notifySelect() {
    if (this.onSelectCallback && this.items[this.selectedIndex]) {
      this.onSelectCallback(this.items[this.selectedIndex], this.selectedIndex);
    }
  }
}
