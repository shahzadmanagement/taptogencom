/**
 * Microsoft OAuth config properties
 */
export interface MicrosoftOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * Builds Microsoft Authorization redirect URL
 * @param config oauth config properties
 * @returns Microsoft Authorization URL
 */
export function buildMicrosoftAuthUrl(config: MicrosoftOAuthConfig): string {
  return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&scope=openid%20email%20profile`;
}
