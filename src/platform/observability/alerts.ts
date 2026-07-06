import { logger } from '../logging/logger';

export interface AlertRule {
  metricName: string;
  threshold: number;
  condition: 'gt' | 'lt';
}

class AlertsEngine {
  private rules: AlertRule[] = [];

  addRule(rule: AlertRule) {
    this.rules.push(rule);
  }

  evaluate(name: string, value: number) {
    const matchingRules = this.rules.filter(r => r.metricName === name);
    matchingRules.forEach(rule => {
      const triggered = rule.condition === 'gt' ? value > rule.threshold : value < rule.threshold;
      if (triggered) {
        logger.error(`[AlertTriggered] Alert triggered for "${rule.metricName}": value ${value} satisfies rule threshold ${rule.threshold}`);
      }
    });
  }
}

export const alertsEngine = new AlertsEngine();
