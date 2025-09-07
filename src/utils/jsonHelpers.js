// Simplifies full PokéAPI Pokémon objects for preview

function compactPokemonList(pokemonList = []) {
  return pokemonList.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: (pokemon.types || []).map((typeEntry) => typeEntry?.type?.name),
    stats: (pokemon.stats || []).map((statEntry) => ({
      [statEntry?.stat?.name]: statEntry?.base_stat,
    })),
  }));
}

export default compactPokemonList;
