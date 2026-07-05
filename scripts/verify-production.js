import https from 'https';

const pages = [
  '/',
  '/tools/fancy-text-generator/',
  '/tools/bold-text-generator/'
];

function checkPage(urlPath) {
  return new Promise((resolve) => {
    https.get(`https://taptogen.com${urlPath}`, (res) => {
      console.log(`- GET ${urlPath}: status code ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.error(`- GET ${urlPath} Error:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Verifying Production Live URL Statuses...');
  let allHealthy = true;
  for (const page of pages) {
    const ok = await checkPage(page);
    if (!ok) allHealthy = false;
  }
  if (!allHealthy) {
    console.error('Production Verification Failed!');
    process.exit(1);
  } else {
    console.log('Production Verification Passed!');
  }
}

run();
