import { retrieveChunks } from '../knowledge/retrieval';
import { buildPromptContext } from './contextBuilder';
import { aiRouter } from './router';
import { buildCitation, type Citation } from '../knowledge/citations';

export interface RagResponse {
  answer: string;
  citations: Citation[];
}

/**
 * Executes Retrieval-Augmented Generation flow (RAG)
 * @param query question query
 * @param provider target AI provider
 * @returns RagResponse object
 */
export async function executeRagFlow(query: string, provider = 'gemini'): Promise<RagResponse> {
  const chunks = await retrieveChunks(query);
  const context = buildPromptContext(chunks);

  const systemPrompt = `You are a helpful AI assistant. Use the following source context details to formulate your answer:\n\n${context}`;
  const response = await aiRouter.routeRequest(provider, {
    prompt: `${systemPrompt}\n\nUser Question: ${query}`
  });

  const citations = chunks.map(c => buildCitation(c.chunk.docId, c.chunk.text));

  return {
    answer: response.text,
    citations
  };
}
