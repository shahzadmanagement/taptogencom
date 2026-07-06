export interface FeatureDef {
  key: string;
  name: string;
  enabled: boolean;
  description: string;
}

export const featureRegistry: Record<string, FeatureDef> = {
  'enable-history': {
    key: 'enable-history',
    name: 'Workspace History Panel',
    enabled: true,
    description: 'Enables users to access their past conversion styles in workspace panels.'
  },
  'enable-previews': {
    key: 'enable-previews',
    name: 'Social Previews Engine',
    enabled: true,
    description: 'Enables quick copyable preview cards for Instagram/Twitter.'
  }
};
