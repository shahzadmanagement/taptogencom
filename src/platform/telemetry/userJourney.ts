import { eventBus } from '../analytics/eventBus';

class UserJourneyTracker {
  private steps: string[] = [];

  recordStep(pagePath: string) {
    this.steps.push(pagePath);
    eventBus.publish('telemetry_journey_step', {
      currentStep: pagePath,
      totalStepsCount: this.steps.length,
      history: this.steps
    });
  }
}

export const userJourney = new UserJourneyTracker();
