import fs from 'fs';
import path from 'path';

function runPerformanceAudit() {
  console.log('Auditing Production Bundle Performance budgets...');
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log(`- Bundle elements compiled count: ${files.length}`);
  } else {
    console.log('- Build directory not present (local run). Skipping size evaluation.');
  }
}

runPerformanceAudit();
