// Wrapper around PokéAPI endpoints for Pokémon list, details, and types
import http from "./http";

const pokemonApi = {
  // Fetch a list of Pokémon (name + URL only).
  // The `limit` is passed from the caller (Dashboard via usePokemonData).
  // If no limit is provided, it defaults to 151.
  async getPokemonList(limit = 151) {
    const res = await http.get(`/pokemon?limit=${limit}`);
    return res.data.results; // [{ name, url }]
  },

  // Fetch detailed Pokémon data
  // Accepts either a Pokémon name or a full API URL
  async getPokemonDetails(nameOrUrl) {
    const url =
      typeof nameOrUrl === "string" && nameOrUrl.startsWith("http")
        ? nameOrUrl // use as-is if a full URL is passed
        : `/pokemon/${nameOrUrl}`; // otherwise build URL from name

    const res = await http.get(url);
    return res.data; // full Pokémon object (stats, types, abilities, etc.)
  },

  // Fetch list of all Pokémon types
  async getTypes() {
    const res = await http.get(`/type`);
    return res.data.results; // [{ name, url }]
  },
};

export default pokemonApi;
