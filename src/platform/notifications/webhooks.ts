export function triggerWebhook(endpoint: string, payload: any): Promise<boolean> {
  console.log(`[WebhookNotification] Triggering endpoint ${endpoint} with payload:`, payload);
  return Promise.resolve(true);
}
