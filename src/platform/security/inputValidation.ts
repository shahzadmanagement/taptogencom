export function cleanString(input: string): string {
  // Strip script tags and potential HTML injection risks
  return input
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim();
}

export function validateInputLength(input: string, maxLimit = 5000): boolean {
  return input.length <= maxLimit;
}
