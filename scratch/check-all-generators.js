import https from 'https';

const baseUrl = 'https://taptogen.vercel.app/tools/';
const tools = [
  'fancy-text-generator',
  'bold-text-generator',
  'cursive-text-generator',
  'italic-text-generator',
  'underline-text-generator',
  'strikethrough-text-generator',
  'vaporwave-text-generator',
  'unicode-text-generator'
];

function checkTool(slug) {
  return new Promise((resolve) => {
    https.get(`${baseUrl}${slug}/`, res => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        const charCounter = data.includes('char-counter');
        const searchInput = data.includes(`${slug.split('-')[0]}-style-search`);
        const exporters = data.includes('btn-download-txt');
        const previews = data.includes('mockup-panel-ig');
        
        console.log(`Tool: ${slug}`);
        console.log(`- Status code: ${res.statusCode}`);
        console.log(`- char-counter: ${charCounter ? 'FOUND' : 'NOT FOUND'}`);
        console.log(`- style-search: ${searchInput ? 'FOUND' : 'NOT FOUND'}`);
        console.log(`- exporters: ${exporters ? 'FOUND' : 'NOT FOUND'}`);
        console.log(`- previews: ${previews ? 'FOUND' : 'NOT FOUND'}`);
        console.log('');
        resolve();
      });
    }).on('error', err => {
      console.error(`Request failed for ${slug}:`, err);
      resolve();
    });
  });
}

async function runAll() {
  for (const tool of tools) {
    await checkTool(tool);
  }
}

runAll();
