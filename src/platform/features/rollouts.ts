export interface RolloutDef {
  key: string;
  percentage: number; // 0 to 100
}

class RolloutsEngine {
  private activeRollouts: Record<string, RolloutDef> = {
    'strikethrough-rollout': {
      key: 'strikethrough-rollout',
      percentage: 50
    }
  };

  isAllowed(key: string, id: string): boolean {
    const rollout = this.activeRollouts[key];
    if (!rollout) return true;
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 100) < rollout.percentage;
  }
}

export const rollouts = new RolloutsEngine();
