export interface VersionInfo {
  version: string;
  buildNumber: number;
  commitHash: string;
  deployedAt: string;
}

class VersionManager {
  private current: VersionInfo = {
    version: '1.2.0',
    buildNumber: 198,
    commitHash: 'ed47721590479155ccb61b95ff842a222300b146',
    deployedAt: new Date().toISOString()
  };

  getVersion(): VersionInfo {
    return this.current;
  }
}

export const versionManager = new VersionManager();
