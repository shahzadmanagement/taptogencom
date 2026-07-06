export interface DeploymentMetricsData {
  deploymentFrequencyDaily: number;
  leadTimeMinutes: number;
  changeFailRatePercent: number;
  meanTimeToRecoveryMinutes: number;
}

export function getDeploymentMetrics(): DeploymentMetricsData {
  return {
    deploymentFrequencyDaily: 3.5,
    leadTimeMinutes: 8.2,
    changeFailRatePercent: 0.0,
    meanTimeToRecoveryMinutes: 0.0
  };
}
