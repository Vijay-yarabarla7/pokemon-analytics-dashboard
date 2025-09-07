function TypeFilter({
  options = [],
  value = "all",
  onChange,
  id = "type-filter",
  label = "Filter by Type:",
}) {
  const allOptions = [{ value: "all", label: "All Types" }, ...options];

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
      >
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
