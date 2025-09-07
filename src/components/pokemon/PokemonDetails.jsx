// To display detailed information of a selected Pokémon
function PokemonDetails({ pokemon }) {
  // If no Pokémon is selected, show fallback message
  if (!pokemon) return <p>No Pokémon selected.</p>;

  // Determine which sprite (image) to display:
  // 1. Prefer official artwork
  // 2. Fallback to default front sprite
  // 3. If none available, use an empty string
  const sprite =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    "";

  // Normalize and prepare stats data for display
  // Each stat has: UPPERCASE name + numeric value (or 0 if missing)
  const stats = (pokemon.stats || []).map((statObj) => ({
    name: (statObj?.stat?.name || "-").toUpperCase(),
    value: statObj?.base_stat ?? 0,
  }));

  return (
    <div className="poke-details">
      {/* Render Pokémon image if sprite is available */}
      {sprite && (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            className="poke-details__img"
            src={sprite}
            alt={pokemon.name}
            style={{ width: 180, height: 180, objectFit: "contain" }}
          />
        </div>
      )}

      {/* Render Pokémon stats in a table format */}
      <div className="poke-details__stats">
        <table className="stats-table">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.name}>
                <td>{stat.name}</td>
                <td>{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PokemonDetails;
