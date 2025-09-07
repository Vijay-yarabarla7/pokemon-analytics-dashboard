import React, { createContext, useContext, useState } from "react";

// Context to share Pokémon data and filters across the app
const PokemonDataContext = createContext({
  pokemonData: [], // List of Pokémon data
  setPokemonData: () => {}, // Setter for Pokémon data
  filters: { type: "all", generation: "all" }, // Current filters
  setFilters: () => {}, // Setter for filters
});

// Context provider to manage and supply state to children
function PokemonDataProvider({ children }) {
  // State for Pokémon data
  const [pokemonData, setPokemonData] = useState([]);

  // State for filters
  const [filters, setFilters] = useState({ type: "all", generation: "all" });

  return (
    <PokemonDataContext.Provider
      value={{ pokemonData, setPokemonData, filters, setFilters }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
}

// Custom hook to consume Pokémon context easily
function usePokemonData() {
  return useContext(PokemonDataContext);
}

export { PokemonDataProvider, usePokemonData };
