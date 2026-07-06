export interface WorkflowState {
  workflowId: string;
  currentStepId: string;
  variablesStore: Record<string, any>;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
}

const states = new Map<string, WorkflowState>();

/**
 * Registers active running state configurations mapping
 */
export function setWorkflowState(instanceId: string, state: WorkflowState) {
  states.set(instanceId, state);
}

/**
 * Fetches state configuration record
 */
export function getWorkflowState(instanceId: string): WorkflowState | undefined {
  return states.get(instanceId);
}
