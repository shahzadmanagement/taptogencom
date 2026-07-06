import { requestHttpGet } from './httpClient';

/**
 * Scrapes HTML text content from a web page
 * @param url query url
 * @returns parsed text response
 */
export async function scrapeWebPage(url: string): Promise<string> {
  const html = await requestHttpGet(url);
  // Strip tags to return clean readable text content
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
