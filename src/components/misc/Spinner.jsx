import React from "react";

function Spinner({ label = "Loading…" }) {
  return (
    <div style={{ display: "grid", placeItems: "center", padding: 24 }}>
      <div
        aria-label={label}
        role="status"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "3px solid rgba(0,0,0,0.1)",
          borderTopColor: "var(--accent)",
          animation: "spin 0.9s linear infinite",
        }}
      />
      <style>{`@keyframes spin {to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Spinner;
