export interface AdminSettings {
  mfaRequired: boolean;
  sessionTimeoutMinutes: number;
}

class SettingsManager {
  private currentSettings: AdminSettings = {
    mfaRequired: true,
    sessionTimeoutMinutes: 30
  };

  getSettings(): AdminSettings {
    return this.currentSettings;
  }
}

export const settings = new SettingsManager();
