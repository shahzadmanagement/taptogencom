export interface SearchableDocument {
  id: string; // tool slug or page slug
  title: string;
  description: string;
  category: string;
  keywords: string[];
  url: string;
}

export interface SearchResult {
  document: SearchableDocument;
  score: number;
  matches: string[];
}

export interface SearchOptions {
  limit?: number;
  fuzzy?: boolean;
  weights?: {
    title?: number;
    description?: number;
    category?: number;
    keywords?: number;
  };
  threshold?: number; // minimum score to include
}
