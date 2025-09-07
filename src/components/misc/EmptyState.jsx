// Component to display a message when no data is available

function EmptyState({ title = "No data", subtitle }) {
  return (
    <div
      style={{
        padding: 20,
        textAlign: "center",
        color: "var(--muted)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
      {subtitle && <div>{subtitle}</div>}
    </div>
  );
}

export default EmptyState;
