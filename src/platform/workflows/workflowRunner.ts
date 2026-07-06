import type { WorkflowDef } from './workflow';
import { setWorkflowState, type WorkflowState } from './workflowState';
import { recordStepHistory } from './workflowHistory';
import { executeTool } from '../tools/toolExecutor';

/**
 * Runs workflow execution steps sequentially
 * @param workflow definition parameters
 * @param inputs initial variables mappings
 * @returns execution result outcome status
 */
export async function runWorkflow(workflow: WorkflowDef, inputs: Record<string, any>): Promise<WorkflowState> {
  const instanceId = `wf-run-${Math.random().toString(36).substring(2, 10)}`;
  
  let currentStep = workflow.stepsList[0];
  const state: WorkflowState = {
    workflowId: workflow.id,
    currentStepId: currentStep ? currentStep.id : '',
    variablesStore: { ...inputs },
    status: 'RUNNING'
  };
  setWorkflowState(instanceId, state);

  while (currentStep) {
    state.currentStepId = currentStep.id;
    try {
      if (currentStep.type === 'action' && currentStep.actionName) {
        // Run action as registered tool call
        const output = await executeTool(currentStep.actionName, state.variablesStore);
        state.variablesStore[currentStep.id] = output;
      }
      recordStepHistory(instanceId, currentStep.id, 'SUCCESS');
      
      const nextId = currentStep.nextStepId;
      currentStep = nextId ? workflow.stepsList.find(s => s.id === nextId) as any : undefined;
    } catch {
      recordStepHistory(instanceId, currentStep.id, 'FAILURE');
      state.status = 'FAILED';
      return state;
    }
  }

  state.status = 'COMPLETED';
  return state;
}
