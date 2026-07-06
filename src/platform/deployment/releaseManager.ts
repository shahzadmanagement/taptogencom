import { versionManager } from './versionManager';
import { deploymentHistory } from './deploymentHistory';

class ReleaseManager {
  getReleaseDetails() {
    const version = versionManager.getVersion();
    const history = deploymentHistory.getHistory();
    return {
      releaseName: `TapToGen Release v${version.version}`,
      currentVersion: version,
      totalDeploymentsCount: history.length,
      history
    };
  }
}

export const releaseManager = new ReleaseManager();
