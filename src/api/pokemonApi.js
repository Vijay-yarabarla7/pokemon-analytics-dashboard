// Wrapper around PokéAPI endpoints for Pokémon list, details, and types
import http from "./http";

const pokemonApi = {
  // Fetch a list of Pokémon (name + URL only).
  async getPokemonList(limit = 151) {
    const res = await http.get(`/pokemon?limit=${limit}`);
    return res.data.results; // [{ name, url }]
  },

  // Fetch detailed Pokémon data
  async getPokemonDetails(nameOrUrl) {
    const url =
      typeof nameOrUrl === "string" && nameOrUrl.startsWith("http")
        ? nameOrUrl
        : `/pokemon/${nameOrUrl}`;
    const res = await http.get(url);
    return res.data;
  },

  // Fetch list of all Pokémon types
  async getTypes() {
    const res = await http.get(`/type`);
    return res.data.results; // [{ name, url }]
  },
};

export default pokemonApi;
