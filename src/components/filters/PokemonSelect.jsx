function PokemonSelect({
  options = [],
  value = "",
  onChange,
  id = "pokemon-select",
  label = "Select Pokémon:",
}) {
  const isDisabled = options.length === 0;

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="select"
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {isDisabled ? (
          <option value="">No options</option>
        ) : (
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default PokemonSelect;
