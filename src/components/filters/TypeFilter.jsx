// Dropdown component to filter Pokémon list by type
function TypeFilter({
  options = [],
  value = "all",
  onChange,
  id = "type-filter",
  label = "Filter by Type:",
}) {
  // Prepend an "All Types" option to the provided list
  const allOptions = [{ value: "all", label: "All Types" }, ...options];

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {/* Select element for choosing a type */}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="select"
      >
        {/* Render list of options*/}
        {allOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypeFilter;
