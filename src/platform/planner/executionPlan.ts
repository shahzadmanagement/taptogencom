export interface PlannedTask {
  id: string;
  description: string;
  assignedTool?: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
}

export interface ExecutionPlan {
  id: string;
  goal: string;
  tasksList: PlannedTask[];
}
