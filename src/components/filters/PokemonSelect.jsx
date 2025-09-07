// Dropdown component to select a Pokémon from the provided options

function PokemonSelect({
  options = [], // List of options to show in dropdown (default: empty array)
  value = "",
  onChange,
  id = "pokemon-select", // ID to link label and select
  label = "Select Pokémon:",
}) {
  // Disable dropdown if there are no options
  const isDisabled = options.length === 0;

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {/* Select element for choosing a Pokémon */}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="select"
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {/* Show message if no options are available */}
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
