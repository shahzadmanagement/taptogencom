export interface BuildRecord {
  buildId: string;
  trigger: 'git_push' | 'manual';
  result: 'SUCCESS' | 'FAILURE';
  durationSeconds: number;
  createdAt: string;
}

export const buildHistory: BuildRecord[] = [
  {
    buildId: "build-4958",
    trigger: "git_push",
    result: "SUCCESS",
    durationSeconds: 98,
    createdAt: new Date().toISOString()
  }
];
