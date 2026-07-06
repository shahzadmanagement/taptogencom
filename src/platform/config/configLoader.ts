import { configStore } from './configStore';
import { environmentRegistry } from './environmentRegistry';

export function loadPlatformConfig(env: string) {
  const meta = environmentRegistry[env] || environmentRegistry.development;
  configStore.set('envName', meta.name);
  configStore.set('debug', meta.debugMode);
  configStore.set('domain', meta.domain);
}
