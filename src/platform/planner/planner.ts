import type { ExecutionPlan, PlannedTask } from './executionPlan';

class TaskPlanner {
  /**
   * Translates abstract goals into execution plan lists
   * @param goal goal string
   * @returns ExecutionPlan format
   */
  createPlan(goal: string): ExecutionPlan {
    const planId = `plan-${Math.random().toString(36).substring(2, 10)}`;
    const tasksList: PlannedTask[] = [
      {
        id: `${planId}-t1`,
        description: `Analyze target goal: ${goal}`,
        status: 'PENDING'
      },
      {
        id: `${planId}-t2`,
        description: 'Verify outputs configurations',
        status: 'PENDING'
      }
    ];

    return { id: planId, goal, tasksList };
  }
}

export const taskPlanner = new TaskPlanner();
