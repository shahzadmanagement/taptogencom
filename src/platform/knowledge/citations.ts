import { getKnowledgeDocument, type KnowledgeDocument } from './documents';

export interface Citation {
  sourceId: string;
  sourceTitle: string;
  excerpt: string;
}

/**
 * Maps source document metadata onto citations references
 * @param docId original document ID
 * @param excerpt excerpt string
 * @returns Citation format
 */
export function buildCitation(docId: string, excerpt: string): Citation {
  const doc = getKnowledgeDocument(docId);
  return {
    sourceId: docId,
    sourceTitle: doc ? doc.title : 'External Source',
    excerpt: excerpt.substring(0, 100) + '...'
  };
}
