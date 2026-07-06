const store = new Map<string, any>();

class ConfigStore {
  set(key: string, value: any) {
    store.set(key, value);
  }

  get<T>(key: string, fallback: T): T {
    return store.has(key) ? store.get(key) : fallback;
  }
}

export const configStore = new ConfigStore();
