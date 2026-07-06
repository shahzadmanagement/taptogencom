export type EnvType = 'development' | 'staging' | 'production';

class EnvironmentConfig {
  getEnv(): EnvType {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
      return 'production';
    }
    return 'development';
  }

  isProduction(): boolean {
    return this.getEnv() === 'production';
  }
}

export const environment = new EnvironmentConfig();
