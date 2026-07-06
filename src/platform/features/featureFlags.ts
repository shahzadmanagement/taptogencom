import { featureRegistry } from './featureRegistry';

class FeatureFlagsEvaluator {
  isEnabled(key: string): boolean {
    const feature = featureRegistry[key];
    return feature ? feature.enabled : false;
  }
}

export const featureFlags = new FeatureFlagsEvaluator();
