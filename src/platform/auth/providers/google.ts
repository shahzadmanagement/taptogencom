/**
 * Google OAuth provider config properties
 */
export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * Builds Google Authorization redirect URL
 * @param config oauth config properties
 * @returns Google Authorization URL
 */
export function buildGoogleAuthUrl(config: GoogleOAuthConfig): string {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&scope=openid%20email%20profile`;
}
