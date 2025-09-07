import { useEffect, useState, useCallback } from "react";
import pokemonApi from "../api/pokemonApi";
import { cacheGetOrSet } from "../utils/cache";

function usePokemonData(limit = 20) {
  // --- State ---
  const [pokemon, setPokemon] = useState([]); // holds full dataset with details
  const [loading, setLoading] = useState(true); // true while fetching
  const [errorMessage, setErrorMessage] = useState(null); // stores error messages
  const [reloadCounter, setReloadCounter] = useState(0); // incremented to force refetch

  // Reload handler → increments counter so useEffect re-runs
  const reload = useCallback(() => {
    setReloadCounter((count) => count + 1);
  }, []);

  useEffect(() => {
    let cancelled = false; // flag to prevent state updates if component unmounts

    // ── Guard: if limit <= 0, treat as "no data"
    if (limit <= 0) {
      setPokemon([]);
      setLoading(false);
      setErrorMessage(null);
      return () => {
        cancelled = true;
      };
    }
    async function load() {
      try {
        setLoading(true);
        setErrorMessage(null);

        // Fetch Pokémon list
        // Cached for 1 hour to reduce API calls
        const listCacheKey = `pokemon:list:${limit}`;
        const list = await cacheGetOrSet(
          listCacheKey,
          () => pokemonApi.getPokemonList(limit),
          60 * 60 * 1000
        );

        // Fetch details for each Pokémon
        // Each detail response cached for 6 hours
        const detailed = await Promise.all(
          list.map((pokemonItem) => {
            const name = pokemonItem?.name;
            if (!name) return null;

            const detailCacheKey = `pokemon:detail:${name}`;
            return cacheGetOrSet(
              detailCacheKey,
              () => pokemonApi.getPokemonDetails(name),
              6 * 60 * 60 * 1000
            );
          })
        );

        // Only update state if still mounted
        if (!cancelled) {
          setPokemon(detailed.filter(Boolean));
        }
      } catch (error) {
        // Handle API/network errors gracefully
        if (!cancelled) {
          console.error("Failed to load Pokémon:", error);
          const status = error?.response?.status;
          setErrorMessage(
            status
              ? `API error (${status}). Please try again.`
              : "Network error. Please try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    // Cleanup → marks request as cancelled to avoid memory leaks
    return () => {
      cancelled = true;
    };
  }, [limit, reloadCounter]); // refetch when limit changes or reload is triggered

  // Public API returned by the hook
  return { data: pokemon, loading, error: errorMessage, reload };
}

export default usePokemonData;
