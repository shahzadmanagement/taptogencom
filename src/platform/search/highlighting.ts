/**
 * Wraps search query keywords in HTML mark tags
 * @param text input text
 * @param keywords terms list
 * @returns highlighted text string
 */
export function highlightKeywords(text: string, keywords: string[]): string {
  if (!text || keywords.length === 0) return text;
  let result = text;
  keywords.forEach(keyword => {
    if (!keyword.trim()) return;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });
  return result;
}
