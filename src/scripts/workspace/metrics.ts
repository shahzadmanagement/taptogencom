import type { ToolConfig } from '../../config';

export const platformLimits: Record<string, { name: string; max: number }> = {
  'instagram-bio-generator': { name: 'Instagram Bio', max: 150 },
  'twitter-bio-generator': { name: 'Twitter/X Bio', max: 160 },
  'linkedin-post-generator': { name: 'LinkedIn Post', max: 3000 },
  'tiktok-bio-generator': { name: 'TikTok Bio', max: 80 },
  'meta-description-generator': { name: 'Meta Description', max: 160 },
  'meta-title-generator': { name: 'Meta Title', max: 60 },
  'youtube-description-generator': { name: 'YouTube Description', max: 5000 },
  'ad-copy-generator': { name: 'Ad Copy Headline', max: 90 },
};

export function updateMetrics(text: string, config: ToolConfig['counters'], toolSlug: string = '') {
  const isFr = typeof document !== 'undefined' && document.documentElement?.lang === 'fr';

  if (config.chars) {
    const el = document.getElementById('char-counter');
    if (el) el.textContent = `${text.length} ${isFr ? 'caractères' : 'chars'}`;
  }
  if (config.glyphs) {
    const el = document.getElementById('uni-counter');
    if (el) el.textContent = `${[...text].length} ${isFr ? 'glyphes' : 'glyphs'}`;
  }
  if (config.words) {
    const el = document.getElementById('word-counter');
    if (el) {
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      el.textContent = `${words} ${isFr ? 'mots' : 'words'}`;
    }
  }
  if (config.lines) {
    const el = document.getElementById('line-counter');
    if (el) {
      const lines = text ? text.split('\n').length : 0;
      el.textContent = `${lines} ${isFr ? 'lignes' : 'lines'}`;
    }
  }

  // Platform limit progress indicator
  const limitEl = document.getElementById('platform-limit-counter');
  const limitInfo = platformLimits[toolSlug];
  if (limitEl && limitInfo) {
    const current = text.length;
    const max = limitInfo.max;
    const remaining = max - current;
    const percent = Math.min(100, Math.round((current / max) * 100));

    let statusColor = '#10b981'; // Green
    if (percent > 100) statusColor = '#ef4444'; // Red
    else if (percent > 85) statusColor = '#f59e0b'; // Amber

    limitEl.innerHTML = `
      <span style="font-weight: 600; color: ${statusColor};">${limitInfo.max}: ${current}/${max} (${remaining >= 0 ? remaining + ' ' + (isFr ? 'restants' : 'left') : Math.abs(remaining) + ' ' + (isFr ? 'en trop' : 'over')})</span>
      <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 4px; overflow: hidden;">
        <div style="width: ${percent}%; height: 100%; background: ${statusColor}; transition: width 0.2s ease;"></div>
      </div>
    `;
  }
}
