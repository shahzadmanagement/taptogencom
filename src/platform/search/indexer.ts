export interface IndexDocument {
  id: string;
  title: string;
  body: string;
  category?: string;
}

class SearchIndexer {
  private indexStore = new Map<string, IndexDocument>();
  private termInvertedIndex = new Map<string, Set<string>>();

  /**
   * Adds document records to index maps
   * @param doc index document record
   */
  addDocument(doc: IndexDocument) {
    this.indexStore.set(doc.id, doc);
    
    // Normalize and tokenize fields
    const tokens = this.tokenizeText(`${doc.title} ${doc.body}`);
    tokens.forEach(token => {
      const docIds = this.termInvertedIndex.get(token) || new Set<string>();
      docIds.add(doc.id);
      this.termInvertedIndex.set(token, docIds);
    });
  }

  /**
   * Searches doc ids by term token
   */
  searchToken(token: string): string[] {
    const ids = this.termInvertedIndex.get(token.toLowerCase());
    return ids ? Array.from(ids) : [];
  }

  /**
   * Gets index document by ID
   */
  getDocument(id: string): IndexDocument | undefined {
    return this.indexStore.get(id);
  }

  private tokenizeText(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 0);
  }
}

export const searchIndexer = new SearchIndexer();
