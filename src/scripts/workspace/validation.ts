export interface ValidationResult {
  isValid: boolean;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export function validateInput(text: string, toolSlug: string, isFr: boolean = true): ValidationResult | null {
  if (!text || text.trim().length === 0) return null;

  const val = text.trim();

  // JSON validators
  if (toolSlug.includes('json')) {
    try {
      JSON.parse(val);
      return {
        isValid: true,
        message: isFr ? '✓ Syntaxe JSON valide' : '✓ Valid JSON syntax',
        type: 'success',
      };
    } catch (e: any) {
      return {
        isValid: false,
        message: isFr ? `ℹ Format JSON incomplet ou invalide : ${e.message}` : `ℹ Incomplete or invalid JSON: ${e.message}`,
        type: 'warning',
      };
    }
  }

  // Email format validators
  if (toolSlug.includes('email') && !toolSlug.includes('name')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return {
        isValid: false,
        message: isFr ? 'ℹ Format d’adresse email recommandé : exemple@domaine.com' : 'ℹ Recommended email format: example@domain.com',
        type: 'info',
      };
    }
  }

  // URL format validators
  if (toolSlug.includes('utm') || toolSlug.includes('open-graph') || toolSlug.includes('canonical') || toolSlug.includes('sitemap')) {
    if (!val.startsWith('http://') && !val.startsWith('https://')) {
      return {
        isValid: false,
        message: isFr ? '💡 Conseil : Incluez le protocole complet (ex: https://votre-site.com)' : '💡 Tip: Include the full protocol (e.g. https://your-site.com)',
        type: 'info',
      };
    }
  }

  // Password / Security tools length validation
  if (toolSlug.includes('password') || toolSlug.includes('key') || toolSlug.includes('token')) {
    const len = val.length;
    if (len < 12) {
      return {
        isValid: true,
        message: isFr ? '💡 Un mot de passe de 12 à 16+ caractères offre une sécurité accrue' : '💡 A password of 12-16+ characters offers enhanced security',
        type: 'info',
      };
    }
  }

  // Bio length validation
  if (toolSlug.includes('bio')) {
    if (val.length > 150) {
      return {
        isValid: true,
        message: isFr ? `⚠️ Attention : ${val.length} caractères (la limite Instagram Bio est de 150)` : `⚠️ Warning: ${val.length} chars (Instagram Bio limit is 150)`,
        type: 'warning',
      };
    }
  }

  return null;
}

export function updateValidationTip(inputEl: HTMLTextAreaElement | HTMLInputElement, toolSlug: string) {
  if (typeof document === 'undefined' || !inputEl) return;

  const isFr = document.documentElement?.lang === 'fr';
  const result = validateInput(inputEl.value, toolSlug, isFr);

  let tipBox = document.getElementById('input-validation-tip');
  if (!tipBox) {
    tipBox = document.createElement('div');
    tipBox.id = 'input-validation-tip';
    tipBox.style.cssText = 'margin-top: 8px; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 500; transition: all 0.2s ease;';
    inputEl.parentNode?.insertBefore(tipBox, inputEl.nextSibling);
  }

  if (!result) {
    tipBox.style.display = 'none';
    return;
  }

  tipBox.style.display = 'block';
  tipBox.textContent = result.message;

  if (result.type === 'success') {
    tipBox.style.background = 'rgba(16, 185, 129, 0.12)';
    tipBox.style.color = '#34d399';
    tipBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
  } else if (result.type === 'warning') {
    tipBox.style.background = 'rgba(245, 158, 11, 0.12)';
    tipBox.style.color = '#fbbf24';
    tipBox.style.border = '1px solid rgba(245, 158, 11, 0.3)';
  } else {
    tipBox.style.background = 'rgba(99, 102, 241, 0.12)';
    tipBox.style.color = '#818cf8';
    tipBox.style.border = '1px solid rgba(99, 102, 241, 0.3)';
  }
}
