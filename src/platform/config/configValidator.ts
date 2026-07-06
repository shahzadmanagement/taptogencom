export function validateConfigKey(key: string, value: any): boolean {
  if (key === 'mfaRequired' && typeof value !== 'boolean') return false;
  if (key === 'sessionTimeoutMinutes' && typeof value !== 'number') return false;
  return true;
}
