export interface ValidationWarning {
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  warnings: ValidationWarning[];
}

export function runGlobalFlagChecks(registry: Record<string, any>): ValidationResult {
  const warnings: ValidationWarning[] = [];
  let hasCircular = false;

  for (const key of Object.keys(registry)) {
    const flag = registry[key];
    if (flag.dependencies && Array.isArray(flag.dependencies)) {
      for (const depKey of flag.dependencies) {
        const depFlag = registry[depKey];
        if (depFlag && depFlag.dependencies && depFlag.dependencies.includes(key)) {
          hasCircular = true;
          warnings.push({ message: `Circular reference detected between ${key} and ${depKey}` });
        }
      }
    }
  }

  return {
    isValid: !hasCircular,
    warnings
  };
}
