import { toolConfigs } from '../config';
import { workspaceRegistry } from './workspaceRegistry';

export interface DiagnosticResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  metadata: Record<string, any>;
}

export function runPlatformHealthCheck(): DiagnosticResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const metadata: Record<string, any> = {};

  // 1. Verify Registry and Config registrations
  const registered = workspaceRegistry.getAll();
  metadata.registeredCount = registered.length;

  registered.forEach(w => {
    const config = toolConfigs[w.slug];
    if (!config) {
      errors.push(`Registered tool "${w.slug}" lacks a configuration entry in configs/ index.`);
    } else {
      if (config.slug !== w.slug) {
        errors.push(`Config mismatch: "${w.slug}" maps to slug "${config.slug}" in config details.`);
      }
    }
  });

  // 2. Validate DOM structures client-side
  if (typeof document !== 'undefined') {
    const input = document.getElementById('tool-input');
    const output = document.getElementById('tool-output');

    if (!input) {
      warnings.push('DOM node "#tool-input" was not found on this view context.');
    }
    if (!output) {
      warnings.push('DOM node "#tool-output" was not found on this view context.');
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    metadata
  };
}
