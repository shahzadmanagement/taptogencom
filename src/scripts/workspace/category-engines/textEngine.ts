export interface TextStatistics {
  charCount: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTimeMinutes: number;
  readabilityScore: number;
  readabilityLevel: string;
}

export function analyzeTextStatistics(text: string, isFr: boolean = true): TextStatistics {
  const charCount = text ? text.length : 0;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
  const sentenceCount = sentences.length || (wordCount > 0 ? 1 : 0);

  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0) : [];
  const paragraphCount = paragraphs.length || (wordCount > 0 ? 1 : 0);

  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Compute Readability Metric (Adapted Flesch Reading Ease)
  const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;
  const avgSyllablesPerWord = 1.4; // Average approximation for French / European text
  const score = Math.max(0, Math.min(100, Math.round(206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord))));

  let readabilityLevel = isFr ? 'Très facile' : 'Very Easy';
  if (score < 30) readabilityLevel = isFr ? 'Très complexe / Universitaire' : 'Academic / Complex';
  else if (score < 50) readabilityLevel = isFr ? 'Difficile' : 'Difficult';
  else if (score < 70) readabilityLevel = isFr ? 'Standard / Accessible' : 'Standard / Accessible';
  else if (score < 90) readabilityLevel = isFr ? 'Facile' : 'Easy';

  return {
    charCount,
    wordCount,
    sentenceCount,
    paragraphCount,
    readingTimeMinutes: wordCount > 0 ? readingTimeMinutes : 0,
    readabilityScore: score,
    readabilityLevel
  };
}

export function formatStatisticsSummary(stats: TextStatistics, isFr: boolean = true): string {
  return [
    `📊 ${isFr ? 'Statistiques du texte' : 'Text Statistics'}:`,
    `- ${isFr ? 'Caractères' : 'Characters'}: ${stats.charCount}`,
    `- ${isFr ? 'Mots' : 'Words'}: ${stats.wordCount}`,
    `- ${isFr ? 'Phrases' : 'Sentences'}: ${stats.sentenceCount}`,
    `- ${isFr ? 'Paragraphes' : 'Paragraphs'}: ${stats.paragraphCount}`,
    `- ${isFr ? 'Temps de lecture' : 'Reading time'}: ~${stats.readingTimeMinutes} min`,
    `- ${isFr ? 'Lisibilité' : 'Readability'}: ${stats.readabilityScore}/100 (${stats.readabilityLevel})`
  ].join('\n');
}
