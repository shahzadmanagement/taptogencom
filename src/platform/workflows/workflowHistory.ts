export interface RunHistoryRecord {
  instanceId: string;
  stepId: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE';
}

const runHistory: RunHistoryRecord[] = [];

/**
 * Appends workflow steps trace records
 */
export function recordStepHistory(instanceId: string, stepId: string, status: 'SUCCESS' | 'FAILURE') {
  runHistory.push({
    instanceId,
    stepId,
    timestamp: new Date().toISOString(),
    status
  });
}

/**
 * Retrieves steps trace log records
 */
export function getHistory(): RunHistoryRecord[] {
  return runHistory;
}
