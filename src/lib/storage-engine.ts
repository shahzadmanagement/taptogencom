/**
 * Enterprise IndexedDB Storage Engine with localStorage Fallback
 *
 * 1. Pure client-side local storage (No server, no tracking)
 * 2. Manages generation sessions (Max 20 per tool)
 * 3. Manages user favorites (Max 100 per tool)
 * 4. Full async Promise API with fallback support
 */

export interface SessionRecord {
  id: string;
  tool: string;
  input: string;
  output: string;
  selectedOptions?: Record<string, string>;
  timestamp: number;
  language: string;
}

export interface FavoriteRecord {
  id: string;
  tool: string;
  name: string;
  text: string;
  timestamp: number;
}

const DB_NAME = 'taptogen-storage-v1';
const SESSIONS_STORE = 'sessions';
const FAVORITES_STORE = 'favorites';
const MAX_SESSIONS = 20;
const MAX_FAVORITES = 100;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB unavailable'));
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(SESSIONS_STORE)) {
          const sessionStore = db.createObjectStore(SESSIONS_STORE, { keyPath: 'id' });
          sessionStore.createIndex('tool', 'tool', { unique: false });
          sessionStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        if (!db.objectStoreNames.contains(FAVORITES_STORE)) {
          const favStore = db.createObjectStore(FAVORITES_STORE, { keyPath: 'id' });
          favStore.createIndex('tool', 'tool', { unique: false });
          favStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (err) {
      reject(err);
    }
  });

  return dbPromise;
}

// ==================== SESSIONS STORAGE ====================

export async function saveSessionRecord(record: SessionRecord): Promise<void> {
  try {
    const db = await getDb();
    const tx = db.transaction(SESSIONS_STORE, 'readwrite');
    const store = tx.objectStore(SESSIONS_STORE);
    await new Promise((res, rej) => {
      const req = store.put(record);
      req.onsuccess = res;
      req.onerror = rej;
    });

    // Cleanup: Enforce max 20 sessions per tool
    const all = await getSessionsByTool(record.tool);
    if (all.length > MAX_SESSIONS) {
      const sorted = all.sort((a, b) => b.timestamp - a.timestamp);
      const toDelete = sorted.slice(MAX_SESSIONS);
      const cleanupTx = db.transaction(SESSIONS_STORE, 'readwrite');
      const cleanupStore = cleanupTx.objectStore(SESSIONS_STORE);
      toDelete.forEach(item => cleanupStore.delete(item.id));
    }
  } catch (err) {
    // localStorage Fallback
    try {
      const key = `taptogen-sessions-${record.tool}`;
      const existing: SessionRecord[] = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = existing.filter(s => s.id !== record.id);
      filtered.unshift(record);
      localStorage.setItem(key, JSON.stringify(filtered.slice(0, MAX_SESSIONS)));
    } catch (e) {}
  }
}

export async function getSessionsByTool(tool: string): Promise<SessionRecord[]> {
  try {
    const db = await getDb();
    const tx = db.transaction(SESSIONS_STORE, 'readonly');
    const store = tx.objectStore(SESSIONS_STORE);
    const index = store.index('tool');
    const records: SessionRecord[] = await new Promise((res, rej) => {
      const req = index.getAll(tool);
      req.onsuccess = () => res(req.result || []);
      req.onerror = rej;
    });
    return records.sort((a, b) => b.timestamp - a.timestamp);
  } catch (err) {
    // localStorage Fallback
    try {
      const key = `taptogen-sessions-${tool}`;
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      return [];
    }
  }
}

export async function deleteSessionRecord(id: string, tool: string): Promise<void> {
  try {
    const db = await getDb();
    const tx = db.transaction(SESSIONS_STORE, 'readwrite');
    tx.objectStore(SESSIONS_STORE).delete(id);
  } catch (err) {
    try {
      const key = `taptogen-sessions-${tool}`;
      const existing: SessionRecord[] = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(existing.filter(s => s.id !== id)));
    } catch (e) {}
  }
}

export async function clearSessionsByTool(tool: string): Promise<void> {
  try {
    const sessions = await getSessionsByTool(tool);
    const db = await getDb();
    const tx = db.transaction(SESSIONS_STORE, 'readwrite');
    const store = tx.objectStore(SESSIONS_STORE);
    sessions.forEach(s => store.delete(s.id));
  } catch (err) {
    try {
      localStorage.removeItem(`taptogen-sessions-${tool}`);
    } catch (e) {}
  }
}

// ==================== FAVORITES STORAGE ====================

export async function saveFavoriteRecord(fav: FavoriteRecord): Promise<void> {
  try {
    const db = await getDb();
    const tx = db.transaction(FAVORITES_STORE, 'readwrite');
    const store = tx.objectStore(FAVORITES_STORE);
    await new Promise((res, rej) => {
      const req = store.put(fav);
      req.onsuccess = res;
      req.onerror = rej;
    });

    // Cleanup: Enforce max 100 favorites per tool
    const all = await getFavoritesByTool(fav.tool);
    if (all.length > MAX_FAVORITES) {
      const sorted = all.sort((a, b) => b.timestamp - a.timestamp);
      const toDelete = sorted.slice(MAX_FAVORITES);
      const cleanupTx = db.transaction(FAVORITES_STORE, 'readwrite');
      const cleanupStore = cleanupTx.objectStore(FAVORITES_STORE);
      toDelete.forEach(item => cleanupStore.delete(item.id));
    }
  } catch (err) {
    try {
      const key = `taptogen-favs-${fav.tool}`;
      const existing: FavoriteRecord[] = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = existing.filter(f => f.id !== fav.id);
      filtered.unshift(fav);
      localStorage.setItem(key, JSON.stringify(filtered.slice(0, MAX_FAVORITES)));
    } catch (e) {}
  }
}

export async function deleteFavoriteRecord(id: string, tool: string): Promise<void> {
  try {
    const db = await getDb();
    const tx = db.transaction(FAVORITES_STORE, 'readwrite');
    tx.objectStore(FAVORITES_STORE).delete(id);
  } catch (err) {
    try {
      const key = `taptogen-favs-${tool}`;
      const existing: FavoriteRecord[] = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(existing.filter(f => f.id !== id)));
    } catch (e) {}
  }
}

export async function getFavoritesByTool(tool: string): Promise<FavoriteRecord[]> {
  try {
    const db = await getDb();
    const tx = db.transaction(FAVORITES_STORE, 'readonly');
    const store = tx.objectStore(FAVORITES_STORE);
    const index = store.index('tool');
    const records: FavoriteRecord[] = await new Promise((res, rej) => {
      const req = index.getAll(tool);
      req.onsuccess = () => res(req.result || []);
      req.onerror = rej;
    });
    return records.sort((a, b) => b.timestamp - a.timestamp);
  } catch (err) {
    try {
      const key = `taptogen-favs-${tool}`;
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      return [];
    }
  }
}
