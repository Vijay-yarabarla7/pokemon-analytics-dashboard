//functions for simple caching in localStorage.
// --- Retrieve from cache ---
function cacheGet(cacheKey) {
  try {
    // Get raw string from localStorage
    const rawValue = localStorage.getItem(cacheKey);
    if (!rawValue) return null;

    // Parse stored JSON → { value, expiresAt }
    const { value, expiresAt } = JSON.parse(rawValue);

    // If expired, remove and return null
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
  const expiresAt = ttlMs ? Date.now() + ttlMs : 0; // 0 = no expiry

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

  // If not cached, fetch new value and save
  const newValue = await fetchFunction();
  cacheSet(cacheKey, newValue, ttlMs);
  return newValue;
}

// --- Clear all cached entries with a given prefix ---
function cacheClearByPrefix(prefix) {
  try {
    const keysToRemove = [];

    // Collect keys that match the prefix
    for (let index = 0; index < localStorage.length; index++) {
      const currentKey = localStorage.key(index);
      if (currentKey && currentKey.startsWith(prefix)) {
        keysToRemove.push(currentKey);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {}
}

export { cacheGet, cacheSet, cacheGetOrSet, cacheClearByPrefix };
