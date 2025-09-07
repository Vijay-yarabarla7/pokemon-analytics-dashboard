// Simple caching using localStorage with TTL support

// --- Retrieve from cache ---
function cacheGet(cacheKey) {
  try {
    const rawValue = localStorage.getItem(cacheKey);
    if (!rawValue) return null;

    const { value, expiresAt } = JSON.parse(rawValue);

    if (expiresAt && expiresAt <= Date.now()) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return value;
  } catch {
    return null;
  }
}

// --- Store value in cache with optional TTL ---
function cacheSet(cacheKey, value, ttlMs = 0) {
  const expiresAt = ttlMs ? Date.now() + ttlMs : 0;
  try {
    localStorage.setItem(cacheKey, JSON.stringify({ value, expiresAt }));
  } catch {}
}

// --- Retrieve value from cache or fetch & set if missing ---
async function cacheGetOrSet(cacheKey, fetchFunction, ttlMs = 0) {
  const cachedValue = cacheGet(cacheKey);
  if (cachedValue !== null && cachedValue !== undefined) {
    return cachedValue;
  }

  const newValue = await fetchFunction();
  cacheSet(cacheKey, newValue, ttlMs);
  return newValue;
}

// --- Clear all cached entries with a given prefix ---
function cacheClearByPrefix(prefix) {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const currentKey = localStorage.key(i);
      if (currentKey && currentKey.startsWith(prefix)) {
        keysToRemove.push(currentKey);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {}
}

export { cacheGet, cacheSet, cacheGetOrSet, cacheClearByPrefix };
