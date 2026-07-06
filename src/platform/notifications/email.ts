export function sendEmailNotification(to: string, subject: string, body: string): Promise<boolean> {
  console.log(`[EmailNotification] Dispatching email to ${to}: "${subject}"`);
  return Promise.resolve(true);
}
