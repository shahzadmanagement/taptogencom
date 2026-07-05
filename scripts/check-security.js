import https from 'https';

function checkSecurityHeaders() {
  return new Promise((resolve) => {
    https.get('https://taptogen.com/', (res) => {
      const headers = res.headers;
      const csp = headers['content-security-policy'];
      const xFrame = headers['x-frame-options'];
      
      console.log('Auditing Security Headers on Production...');
      console.log(`- Content-Security-Policy: ${csp ? 'PRESENT' : 'MISSING'}`);
      console.log(`- X-Frame-Options: ${xFrame ? 'PRESENT' : 'MISSING'}`);
      
      resolve(true);
    }).on('error', () => {
      resolve(false);
    });
  });
}

checkSecurityHeaders();
