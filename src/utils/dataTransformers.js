// Helpers to shape raw PokéAPI data into chart/selector-friendly formats.

import titleCase from "./formatters";

/**
 * Count how many Pokémon belong to each type.
 * Returns { labels: [...], data: [...] } for charting.
 */
export function getTypeDistribution(pokemonList = []) {
  const counts = pokemonList.reduce((map, pokemon) => {
    (pokemon.types || []).forEach((typeEntry) => {
      const typeName = typeEntry?.type?.name;
      if (typeName) {
        map[typeName] = (map[typeName] || 0) + 1;
      }
    });
    return map;
  }, {});

  const sortedTypes = Object.entries(counts).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return {
    labels: sortedTypes.map(([type]) => titleCase(type)),
    data: sortedTypes.map(([, count]) => count),
  };
}

/**
 * Convert one Pokémon's stats into { labels, data } for radar charts.
 */
export function getRadarStats(pokemon) {
  if (!pokemon?.stats) return { labels: [], data: [] };

  return {
    labels: pokemon.stats.map((stat) => stat?.stat?.name?.toUpperCase() || ""),
    data: pokemon.stats.map((stat) => Number(stat?.base_stat) || 0),
  };
}

/**
 * Collect all unique types across the dataset.
 * Returns [{ value: "fire", label: "Fire" }, ...].
 */
export function getAllTypes(pokemonList = []) {
  const uniqueTypes = new Set();

  pokemonList.forEach((pokemon) =>
    (pokemon.types || []).forEach((typeEntry) => {
      if (typeEntry?.type?.name) uniqueTypes.add(typeEntry.type.name);
    })
  );

  return [...uniqueTypes]
    .sort((a, b) => a.localeCompare(b))
    .map((type) => ({ value: type, label: titleCase(type) }));
}

/**
 * Filter dataset by type (e.g. "fire").
 * If "all", returns the full list.
 */
export function filterByType(pokemonList = [], typeValue = "all") {
  if (typeValue === "all") return pokemonList;

  return pokemonList.filter((pokemon) =>
    pokemon?.types?.some((typeEntry) => typeEntry?.type?.name === typeValue)
  );
}
