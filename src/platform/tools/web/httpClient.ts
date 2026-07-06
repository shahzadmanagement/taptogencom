import https from 'https';
import http from 'http';
import { validateUrl } from './urlValidator';

/**
 * Executes async HTTP GET request safely
 * @param url query url
 * @returns raw content string response
 */
export function requestHttpGet(url: string): Promise<string> {
  if (!validateUrl(url)) {
    return Promise.reject(new Error('Invalid URL protocol.'));
  }

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, res => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}
