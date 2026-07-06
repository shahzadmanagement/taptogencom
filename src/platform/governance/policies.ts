export interface PolicyDef {
  code: string;
  enforceMfa: boolean;
  blockUnauthenticatedHealthChecks: boolean;
}

export const platformPolicies: PolicyDef = {
  code: 'GOV-POL-029',
  enforceMfa: true,
  blockUnauthenticatedHealthChecks: false
};
