import type { PlannedTask } from './executionPlan';

class TaskQueue {
  private queue: PlannedTask[] = [];

  enqueue(task: PlannedTask) {
    this.queue.push(task);
  }

  dequeue(): PlannedTask | undefined {
    return this.queue.shift();
  }

  getPending(): PlannedTask[] {
    return this.queue.filter(t => t.status === 'PENDING');
  }

  clear() {
    this.queue = [];
  }
}

export const taskQueue = new TaskQueue();
