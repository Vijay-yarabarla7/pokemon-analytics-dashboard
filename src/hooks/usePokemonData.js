import { useEffect, useState, useCallback } from "react";
import pokemonApi from "../api/pokemonApi";
import { cacheGetOrSet } from "../utils/cache";

/**
 * Fetches Pokémon dataset with basic caching.
 * @param {number} limit how many Pokémon to load (default 20)
 */
export default function usePokemonData(limit = 20) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = `pokemons_${limit}_v1`;
      const ttlMs = 6 * 60 * 60 * 1000; // 6 hours

      const result = await cacheGetOrSet(
        cacheKey,
        async () => {
          const list = await pokemonApi.getPokemonList(limit);
          const details = await Promise.all(
            list.map((p) => pokemonApi.getPokemonDetails(p.url))
          );
          return details;
        },
        ttlMs
      );

      setData(result || []);
    } catch (e) {
      setError("Failed to load Pokémon data. Please try again.");
      // console.error(e);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
