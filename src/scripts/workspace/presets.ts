export interface PresetChip {
  label: string;
  value: string;
  options?: Record<string, string | number | boolean>;
}

export const presetRegistry: Record<string, PresetChip[]> = {
  'password-generator': [
    { label: '🏦 Banques & Finances', value: 'Banque-Securite-Maximale-2026!', options: { length: 20, symbols: true, numbers: true } },
    { label: '🎮 Jeux & Consoles', value: 'Gamertag-Shield-Pro-99', options: { length: 16, symbols: true, numbers: true } },
    { label: '📶 WiFi Familial', value: 'Maison-Wifi-Rapide-7788', options: { length: 18, symbols: false, numbers: true } },
    { label: '🏢 Entreprise / Pro', value: 'Enterprise-Vault-Strict-2026#', options: { length: 24, symbols: true, numbers: true } },
  ],
  'invoice-generator': [
    { label: '💼 Freelance / Indépendant', value: 'Prestation de développement web et conseil SEO' },
    { label: '📊 Consultant / Audit', value: 'Audit technique et accompagnement stratégique 10 jours' },
    { label: '🏢 Agence / Forfait', value: 'Forfait mensuel de création de contenu et gestion digitale' },
  ],
  'instagram-bio-generator': [
    { label: '💼 Business & Pro', value: 'Entrepreneur & Fondateur | Aide les marques à développer leur visibilité 🚀' },
    { label: '✨ Créateur / Lifestyle', value: 'Créateur de contenu 📍 Paris | Partage mes découvertes au quotidien ✨' },
    { label: '🎮 Gamer & Streamer', value: 'Streamer quotidien 🎮 | Compétitions FPS & jeux indés | Rejoins la communauté' },
    { label: '👑 Luxe & Élégance', value: 'Design, Architecture & Art de vivre | Créations sur mesure 🖤' },
  ],
  'business-name-generator': [
    { label: '🚀 Tech & Startup', value: 'Tech Innovation Cloud Software AI Platform' },
    { label: '🌿 Écologique & Nature', value: 'Bio Vert Écologique Durable Nature' },
    { label: '👑 Prestige & Luxe', value: 'Prestige Élégance Édition Maison Atelier' },
    { label: '⚡ Moderne & Minimaliste', value: 'Nova Studio Lab Helix Pulse Apex' },
  ]
};

export function renderSmartPresets(toolSlug: string, inputEl: HTMLTextAreaElement, generateFn: () => void) {
  if (typeof document === 'undefined' || !inputEl) return;

  const presets = presetRegistry[toolSlug];
  if (!presets || presets.length === 0) return;

  let container = document.getElementById('smart-presets-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'smart-presets-container';
    container.className = 'smart-presets-row';
    container.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; margin-bottom: 12px; align-items: center;';

    const label = document.createElement('span');
    label.style.cssText = 'font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted, #94a3b8); margin-right: 4px;';
    label.textContent = document.documentElement.lang === 'fr' ? 'Presets rapides :' : 'Quick Presets:';
    container.appendChild(label);

    presets.forEach(preset => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'preset-chip-btn';
      chip.style.cssText = 'padding: 6px 12px; font-size: 0.82rem; font-weight: 500; border-radius: 20px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); color: var(--color-text-primary, #f1f5f9); cursor: pointer; transition: all 0.2s ease;';
      chip.textContent = preset.label;

      chip.addEventListener('mouseenter', () => {
        chip.style.background = 'rgba(99, 102, 241, 0.2)';
        chip.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      });

      chip.addEventListener('mouseleave', () => {
        chip.style.background = 'rgba(99, 102, 241, 0.1)';
        chip.style.borderColor = 'rgba(99, 102, 241, 0.25)';
      });

      chip.addEventListener('click', () => {
        inputEl.value = preset.value;
        if (preset.options) {
          Object.entries(preset.options).forEach(([optId, optVal]) => {
            const optEl = document.getElementById(optId) as HTMLInputElement | HTMLSelectElement | null;
            if (optEl) {
              if (optEl.type === 'checkbox') {
                (optEl as HTMLInputElement).checked = Boolean(optVal);
              } else {
                optEl.value = String(optVal);
              }
            }
          });
        }
        generateFn();
      });

      container!.appendChild(chip);
    });

    const parent = inputEl.parentNode;
    if (parent) {
      parent.insertBefore(container, inputEl.nextSibling);
    }
  }
}
