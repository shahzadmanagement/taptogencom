export interface WorkflowStep {
  id: string;
  name: string;
  type: 'action' | 'condition';
  actionName?: string;
  nextStepId?: string;
}

export interface WorkflowDef {
  id: string;
  name: string;
  stepsList: WorkflowStep[];
}
