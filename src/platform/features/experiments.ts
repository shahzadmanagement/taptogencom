export interface ExperimentDef {
  key: string;
  variations: string[];
}

class ExperimentsRegistry {
  private activeExperiments: Record<string, ExperimentDef> = {
    'new-toolbar-ab': {
      key: 'new-toolbar-ab',
      variations: ['control', 'premium_layout']
    }
  };

  getVariation(key: string, userId: string): string {
    const exp = this.activeExperiments[key];
    if (!exp) return 'control';
    // Consistent hash assignment
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return exp.variations[hash % exp.variations.length];
  }
}

export const experiments = new ExperimentsRegistry();
