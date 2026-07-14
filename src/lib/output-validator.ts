export interface ValidationResult {
  isValid: boolean;
  sanitized: string;
  errors: string[];
}

export function validateAiOutput(rawText: string, expectedFormat: 'text' | 'json' = 'text'): ValidationResult {
  const errors: string[] = [];
  let sanitized = rawText.trim();

  if (!sanitized) {
    return { isValid: false, sanitized: '', errors: ['Empty generation response received'] };
  }

  // Safety filter - verify presence of placeholder strings
  const placeholders = [/\bplaceholder\b/i, /\blorem ipsum\b/i, /\bmock response\b/i, /\bfake response\b/i];
  placeholders.forEach(p => {
    if (p.test(sanitized)) {
      errors.push(`Response contains suspicious placeholder text matching: ${p}`);
    }
  });

  if (expectedFormat === 'json') {
    try {
      // Strip json codeblocks wrapper if present
      let jsonCandidate = sanitized;
      if (jsonCandidate.startsWith('```json')) {
        jsonCandidate = jsonCandidate.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (jsonCandidate.startsWith('```')) {
        jsonCandidate = jsonCandidate.replace(/^```/, '').replace(/```$/, '').trim();
      }
      JSON.parse(jsonCandidate);
      sanitized = jsonCandidate;
    } catch (e) {
      errors.push('Response is not valid JSON format');
    }
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
}
