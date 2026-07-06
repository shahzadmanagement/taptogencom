export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
}

const documentStore = new Map<string, KnowledgeDocument>();

/**
 * Registers new Knowledge document reference
 * @param doc Knowledge document
 */
export function addKnowledgeDocument(doc: KnowledgeDocument) {
  documentStore.set(doc.id, doc);
}

/**
 * Fetches Knowledge document reference by ID
 * @param id doc ID
 * @returns Knowledge document or undefined
 */
export function getKnowledgeDocument(id: string): KnowledgeDocument | undefined {
  return documentStore.get(id);
}
