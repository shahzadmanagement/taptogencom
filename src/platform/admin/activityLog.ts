export interface ActivityEntry {
  adminId: string;
  action: string;
  timestamp: string;
}

class ActivityLog {
  private logs: ActivityEntry[] = [
    {
      adminId: "sysadmin-101",
      action: "Enabled enable-history flag",
      timestamp: new Date().toISOString()
    }
  ];

  getLogs(): ActivityEntry[] {
    return this.logs;
  }

  logAction(adminId: string, action: string) {
    this.logs.push({ adminId, action, timestamp: new Date().toISOString() });
  }
}

export const activityLog = new ActivityLog();
