export interface MarketingSeoAnalysis {
  titleScore: number;
  descScore: number;
  overallScore: number;
  suggestions: string[];
}

export function analyzeMarketingSeo(title: string, description: string, isFr: boolean = true): MarketingSeoAnalysis {
  const suggestions: string[] = [];
  let titleScore = 100;
  let descScore = 100;

  const tLen = title.trim().length;
  if (tLen < 40) {
    titleScore -= 30;
    suggestions.push(isFr ? 'Rallongez le titre (50-60 caractères recommandé pour maximiser le CTR).' : 'Lengthen title (50-60 chars recommended for CTR).');
  } else if (tLen > 65) {
    titleScore -= 20;
    suggestions.push(isFr ? 'Raccourcissez le titre (< 60 caractères pour éviter les points de suspension).' : 'Shorten title (< 60 chars to avoid truncation).');
  }

  const dLen = description.trim().length;
  if (dLen < 120) {
    descScore -= 30;
    suggestions.push(isFr ? 'Enrichissez la description (140-160 caractères recommandé avec un appel à l’action).' : 'Enrich description (140-160 chars recommended with CTA).');
  } else if (dLen > 170) {
    descScore -= 20;
    suggestions.push(isFr ? 'Raccourcissez la description (< 160 caractères).' : 'Shorten description (< 160 chars).');
  }

  const overallScore = Math.round((titleScore + descScore) / 2);
  return { titleScore, descScore, overallScore, suggestions };
}

export function renderGoogleSearchSnippetPreview(title: string, description: string, url: string = 'https://taptogen.com/fr/tools/...'): string {
  return `
    <div class="google-serp-preview" style="font-family: Roboto, Arial, sans-serif; background: #ffffff; color: #202124; padding: 16px; border-radius: 8px; border: 1px solid #dadce0; max-width: 600px;">
      <div style="font-size: 0.8rem; color: #202124; margin-bottom: 2px; font-weight: 400;">taptogen.com</div>
      <div style="font-size: 0.8rem; color: #4d5156; margin-bottom: 6px;">${escapeHtml(url)}</div>
      <h3 style="font-size: 1.15rem; color: #1a0dab; margin: 0 0 4px 0; font-weight: 400; line-height: 1.3; font-family: arial, sans-serif;">${escapeHtml(title || 'Titre de la page - Aperçu Google')}</h3>
      <p style="font-size: 0.88rem; color: #4d5156; margin: 0; line-height: 1.58;">${escapeHtml(description || 'Description meta qui apparaîtra sous le titre dans les résultats de recherche Google.')}</p>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
