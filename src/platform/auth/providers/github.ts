/**
 * GitHub OAuth config properties
 */
export interface GitHubOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * Builds GitHub Authorization redirect URL
 * @param config oauth config properties
 * @returns GitHub Authorization URL
 */
export function buildGitHubAuthUrl(config: GitHubOAuthConfig): string {
  return `https://github.com/login/oauth/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=user:email`;
}
