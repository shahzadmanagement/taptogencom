export interface DeploymentRecord {
  id: string;
  version: string;
  commitHash: string;
  status: 'SUCCESS' | 'FAILED';
  durationMs: number;
  timestamp: string;
}

class DeploymentHistory {
  private records: DeploymentRecord[] = [
    {
      id: "dep-102",
      version: "1.2.0",
      commitHash: "ed47721590479155ccb61b95ff842a222300b146",
      status: "SUCCESS",
      durationMs: 42000,
      timestamp: new Date().toISOString()
    }
  ];

  getHistory(): DeploymentRecord[] {
    return this.records;
  }

  addRecord(record: DeploymentRecord) {
    this.records.push(record);
  }
}

export const deploymentHistory = new DeploymentHistory();
