export interface SynonymGroup {
  id: string;
  terms: string[];
}

export const SYNONYM_GROUPS: SynonymGroup[] = [
  { id: 'fancy_text', terms: ['fancy text', 'font changer', 'aesthetic fonts', 'cool fonts', 'cool font', 'stylish letters', 'emoji text', 'aesthetic letters'] },
  { id: 'instagram', terms: ['instagram', 'ig', 'insta'] },
  { id: 'bio', terms: ['bio', 'profile', 'status', 'tagline'] },
  { id: 'username', terms: ['username', 'profile name', 'handle', 'nickname', 'user name'] },
  { id: 'math', terms: ['math', 'mathematical', 'equations', 'compound', 'chemical', 'chemistry', 'iupac'] },
  { id: 'discord', terms: ['discord', 'chat', 'server', 'clan'] }
];

export function getSynonymsForTerm(term: string): string[] {
  const synonyms: string[] = [];
  const normalized = term.toLowerCase().trim();

  SYNONYM_GROUPS.forEach(group => {
    if (group.terms.includes(normalized)) {
      group.terms.forEach(t => {
        if (t !== normalized) synonyms.push(t);
      });
    }
  });

  return synonyms;
}
