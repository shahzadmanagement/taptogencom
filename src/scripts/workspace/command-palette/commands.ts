import type { CommandItem } from './types';
import { ClipboardHelper } from '../clipboard';

export function getDefaultCommands(): CommandItem[] {
  const isFr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.lang === 'fr' : false;

  return [
    // Workspace Execution Commands
    {
      id: 'cmd-generate',
      title: isFr ? 'Générer le Résultat' : 'Generate Output',
      subtitle: isFr ? 'Exécuter l\'outil principal' : 'Execute active tool output',
      category: 'workspace',
      icon: '⚡',
      shortcut: 'Ctrl+Enter',
      keywords: ['run', 'generate', 'create', 'execute', 'submit'],
      action: () => {
        const btn = document.getElementById('generate-btn');
        btn?.click();
      }
    },
    {
      id: 'cmd-copy-output',
      title: isFr ? 'Copier le Résultat' : 'Copy Output',
      subtitle: isFr ? 'Copier dans le presse-papiers' : 'Copy primary output to clipboard',
      category: 'workspace',
      icon: '📋',
      shortcut: 'Ctrl+Shift+C',
      keywords: ['copy', 'clipboard', 'text'],
      action: () => {
        const output = document.getElementById('tool-output');
        const copyBtn = document.getElementById('copy-btn');
        if (output && output.textContent && !output.classList.contains('empty')) {
          const text = output.dataset.copyText || output.textContent.trim();
          ClipboardHelper.copy(text, copyBtn || undefined);
        }
      }
    },
    {
      id: 'cmd-clear-input',
      title: isFr ? 'Réinitialiser l\'Entrée' : 'Clear / Reset Input',
      subtitle: isFr ? 'Effacer le texte saisi' : 'Clear text input field',
      category: 'workspace',
      icon: '🧹',
      shortcut: 'Esc',
      keywords: ['clear', 'reset', 'erase', 'clean'],
      action: () => {
        const input = document.getElementById('tool-input') as HTMLTextAreaElement | null;
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) resetBtn.click();
        else if (input) {
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    },

    // Exporters Commands
    {
      id: 'cmd-export-txt',
      title: isFr ? 'Exporter en TXT' : 'Export TXT',
      subtitle: isFr ? 'Télécharger au format texte' : 'Download result as TXT file',
      category: 'exporters',
      icon: '📥',
      keywords: ['export', 'txt', 'download', 'text'],
      action: () => {
        document.getElementById('btn-download-txt')?.click();
      }
    },
    {
      id: 'cmd-export-csv',
      title: isFr ? 'Exporter en CSV' : 'Export CSV',
      subtitle: isFr ? 'Télécharger au format CSV' : 'Download result as CSV spreadsheet',
      category: 'exporters',
      icon: '📊',
      keywords: ['export', 'csv', 'spreadsheet', 'table'],
      action: () => {
        document.getElementById('btn-download-csv')?.click();
      }
    },
    {
      id: 'cmd-export-json',
      title: isFr ? 'Exporter en JSON' : 'Export JSON',
      subtitle: isFr ? 'Télécharger au format JSON' : 'Download result as JSON file',
      category: 'exporters',
      icon: '📄',
      keywords: ['export', 'json', 'data', 'code'],
      action: () => {
        document.getElementById('btn-download-json')?.click();
      }
    },
    {
      id: 'cmd-export-md',
      title: isFr ? 'Exporter en Markdown' : 'Export Markdown (.md)',
      subtitle: isFr ? 'Télécharger au format Markdown' : 'Download result as Markdown file',
      category: 'exporters',
      icon: '📝',
      keywords: ['export', 'md', 'markdown', 'doc'],
      action: () => {
        document.getElementById('btn-download-md')?.click();
      }
    },

    // Workspace Tool Integrations
    {
      id: 'cmd-open-batch',
      title: isFr ? 'Traitement par Lot (Batch)' : 'Open Batch File Processor',
      subtitle: isFr ? 'Importer un fichier TXT/CSV/JSON' : 'Process TXT, CSV, JSON files in batch',
      category: 'tools',
      icon: '⚡',
      keywords: ['batch', 'file', 'csv', 'import', 'bulk'],
      action: () => {
        document.getElementById('btn-batch-mode')?.click();
      }
    },
    {
      id: 'cmd-open-domains',
      title: isFr ? 'Vérificateur de Domaines' : 'Check Domain Availability',
      subtitle: isFr ? 'Vérifier la disponibilité DNS en direct' : 'Check live Cloudflare DoH availability',
      category: 'tools',
      icon: '🌐',
      keywords: ['domain', 'dns', 'whois', 'available', 'namecheap'],
      action: () => {
        document.getElementById('btn-check-domains')?.click();
      }
    },
    {
      id: 'cmd-open-qr',
      title: isFr ? 'Design du Code QR' : 'Open QR Code Designer',
      subtitle: isFr ? 'Personnaliser formes, couleurs et logo' : 'Customize shapes, colors & center logo',
      category: 'tools',
      icon: '🎨',
      keywords: ['qr', 'designer', 'barcode', 'logo', 'colors'],
      action: () => {
        const input = document.getElementById('tool-input') as HTMLTextAreaElement | null;
        if (input) input.focus();
      }
    },
    {
      id: 'cmd-open-history',
      title: isFr ? 'Historique des Sessions' : 'Open Session History',
      subtitle: isFr ? 'Voir et restaurer les sessions passées' : 'View & restore past generation sessions',
      category: 'tools',
      icon: '🕒',
      keywords: ['history', 'recent', 'session', 'restore', 'past'],
      action: () => {
        const panel = document.getElementById('history-list');
        panel?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'cmd-open-favs',
      title: isFr ? 'Voir les Favoris' : 'Open Favorites',
      subtitle: isFr ? 'Voir les résultats favoris enregistrés' : 'View saved favorite outputs',
      category: 'tools',
      icon: '⭐',
      keywords: ['favorite', 'star', 'fav', 'saved'],
      action: () => {
        const panel = document.getElementById('favorites-list');
        panel?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];
}
