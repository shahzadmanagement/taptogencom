export interface ValidationWarning {
  type: 'error' | 'warning';
  eventName: string;
  message: string;
}

export function validateEventPayload(name: string, payload: any): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  if (!payload) {
    warnings.push({
      type: 'error',
      eventName: name,
      message: 'Event payload is missing or undefined'
    });
    return warnings;
  }

  // 1. Check size limit
  const str = JSON.stringify(payload);
  const sizeKb = str.length / 1024;
  if (sizeKb > 2.0) {
    warnings.push({
      type: 'warning',
      eventName: name,
      message: `Payload size (${sizeKb.toFixed(2)} KB) exceeds warning threshold of 2.0 KB`
    });
  }

  // 2. Schema integrity constraints checking
  if (name.startsWith('tool_')) {
    if (!payload.toolSlug) {
      warnings.push({
        type: 'error',
        eventName: name,
        message: 'Missing "toolSlug" parameter in tool interaction payload'
      });
    }
    if (!payload.session || !payload.session.sessionId) {
      warnings.push({
        type: 'warning',
        eventName: name,
        message: 'Missing active session metadata block'
      });
    }
  }

  return warnings;
}
