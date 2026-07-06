import fs from 'fs';
import path from 'path';

const releaseReport = {
  title: 'Platform Release Operations Report',
  build: 'build-4958',
  status: 'SUCCESS',
  version: '1.2.0',
  commit: 'ed47721590479155ccb61b95ff842a222300b146',
  timestamp: new Date().toISOString()
};

const distPath = path.join(process.cwd(), 'dist');
fs.mkdirSync(distPath, { recursive: true });
fs.writeFileSync(path.join(distPath, 'release-report.json'), JSON.stringify(releaseReport, null, 2));

console.log('Generated release-report.json successfully inside dist/');
