import titleCase from "./formatters";

// Count Pokémon by type
export function getTypeDistribution(pokemonList = []) {
  const counts = pokemonList.reduce((map, p) => {
    (p.types || []).forEach((t) => {
      const typeName = t?.type?.name;
      if (typeName) map[typeName] = (map[typeName] || 0) + 1;
    });
    return map;
  }, {});
  const sorted = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  return {
    labels: sorted.map(([t]) => titleCase(t)),
    data: sorted.map(([, c]) => c),
  };
}

// Convert one Pokémon's stats for radar chart
export function getRadarStats(pokemon) {
  if (!pokemon?.stats) return { labels: [], data: [] };
  return {
    labels: pokemon.stats.map((s) => s?.stat?.name?.toUpperCase() || ""),
    data: pokemon.stats.map((s) => Number(s?.base_stat) || 0),
  };
}

// Collect all unique types
export function getAllTypes(pokemonList = []) {
  const unique = new Set();
  pokemonList.forEach((p) =>
    (p.types || []).forEach((t) => t?.type?.name && unique.add(t.type.name))
  );
  return [...unique]
    .sort((a, b) => a.localeCompare(b))
    .map((type) => ({ value: type, label: titleCase(type) }));
}

// Filter dataset by type
export function filterByType(pokemonList = [], typeValue = "all") {
  if (typeValue === "all") return pokemonList;
  return pokemonList.filter((p) =>
    p?.types?.some((t) => t?.type?.name === typeValue)
  );
}
