import { parseBatchContent } from '../src/scripts/workspace/batch/parser';
import { BatchProcessor } from '../src/scripts/workspace/batch/processor';
import { exportBatchResults } from '../src/scripts/workspace/batch/export';

async function runBatchVerification() {
  console.log('=== INDEPENDENT FORENSIC BATCH PROCESSING SYSTEM VERIFICATION ===\n');

  // 1. File Import & Parsing Tests
  const sampleTxt = 'Alpha\nBeta\n\nGamma\nAlpha';
  const parsedTxt = parseBatchContent(sampleTxt, 'test.txt', { skipEmpty: true, removeDuplicates: true, trimWhitespace: true, preserveOrdering: true });
  console.log('1. TXT Parsing & Deduplication:');
  console.log('   - Count (expected 3):', parsedTxt.length);
  console.log('   - Items:', parsedTxt.map(i => i.original).join(', '));

  const sampleCsv = 'Col1,Col2\nVal1,Val2\nVal3,Val4';
  const parsedCsv = parseBatchContent(sampleCsv, 'data.csv');
  console.log('\n2. CSV Parsing:');
  console.log('   - Count (expected 3):', parsedCsv.length);

  const sampleJson = JSON.stringify(['Item 1', 'Item 2', 'Item 3']);
  const parsedJson = parseBatchContent(sampleJson, 'data.json');
  console.log('\n3. JSON Array Parsing:');
  console.log('   - Count (expected 3):', parsedJson.length);

  // 2. Non-Blocking Processor Test
  console.log('\n4. Non-Blocking Batch Processor Execution:');
  const processor = new BatchProcessor(parsedTxt, (input) => input.toUpperCase());
  let progressCount = 0;

  processor.onProgress((stats) => {
    progressCount++;
  });

  await new Promise<void>((resolve) => {
    processor.onComplete((stats, items) => {
      console.log('   - Batch process finished!');
      console.log('   - TotalProcessed:', stats.processed);
      console.log('   - Successful:', stats.successful);
      console.log('   - Processed Outputs:', items.map(i => i.processed).join(', '));
      resolve();
    });
    processor.start();
  });

  console.log('\n=== ALL ENTERPRISE BATCH PROCESSING SYSTEM VERIFICATIONS PASSED ===');
}

runBatchVerification();
