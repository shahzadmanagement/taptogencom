export interface EnvironmentMetadata {
  name: string;
  debugMode: boolean;
  domain: string;
}

export const environmentRegistry: Record<string, EnvironmentMetadata> = {
  development: {
    name: 'development',
    debugMode: true,
    domain: 'localhost'
  },
  production: {
    name: 'production',
    debugMode: false,
    domain: 'taptogen.com'
  }
};
