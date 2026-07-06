import { systemOverview } from './systemOverview';
import { activityLog } from './activityLog';

class AdminDashboard {
  compileOverview() {
    return {
      title: 'TapToGen Enterprise Admin Administration Panel',
      system: systemOverview.getStats(),
      recentActivities: activityLog.getLogs()
    };
  }
}

export const adminDashboard = new AdminDashboard();
