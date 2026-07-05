import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StorageManager } from '../StorageManager';

describe('StorageManager', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('retrieves default value if key does not exist', () => {
    const value = StorageManager.get('non-existent', { default: [] });
    expect(value).toEqual([]);
  });

  it('safely sets and gets JSON items', () => {
    StorageManager.set('test-key', { name: 'taptogen' });
    const value = StorageManager.get('test-key', { default: {} });
    expect(value).toEqual({ name: 'taptogen' });
  });

  it('handles localStorage quota exclusions gracefully', () => {
    const spy = vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const success = StorageManager.set('full-key', 'a'.repeat(100000));
    expect(success).toBe(false);
  });
});
