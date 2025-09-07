import React from "react";

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        border: "1px solid #e5e7eb",
        background: "#f8fafc",
        marginRight: 6,
        marginBottom: 6,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
      <div style={{ width: 120, color: "var(--muted)" }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function PokemonDetails({ pokemon }) {
  if (!pokemon) return null;

  const img =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16 }}>
      <div style={{ display: "grid", placeItems: "center" }}>
        {img ? (
          <img src={img} alt={pokemon.name} width={140} height={140} />
        ) : (
          <div
            style={{
              width: 140,
              height: 140,
              background: "#f1f5f9",
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              color: "var(--muted)",
            }}
          >
            No image
          </div>
        )}
      </div>

      <div>
        <Row label="Name" value={pokemon.name} />
        <Row label="ID" value={`#${pokemon.id}`} />
        <Row
          label="Types"
          value={
            <span>
              {(pokemon.types || []).map((t) => (
                <Pill key={t.slot || t.type?.name}>{t.type?.name}</Pill>
              ))}
            </span>
          }
        />
        <Row
          label="Height / Weight"
          value={`${pokemon.height ?? "?"} / ${pokemon.weight ?? "?"}`}
        />

        <div style={{ marginTop: 12 }}>
          <div style={{ color: "var(--muted)", marginBottom: 6 }}>
            Base Stats
          </div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {(pokemon.stats || []).map((s) => (
              <li key={s.stat?.name}>
                <strong>{s.stat?.name}:</strong> {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
