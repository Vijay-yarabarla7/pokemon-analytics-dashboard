import React, { useState } from "react";

function JsonPreview({ data, title = "JSON Preview" }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          border: "1px solid #e5e7eb",
          background: "#f8fafc",
          padding: "6px 10px",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {open ? "Hide" : "Show"} {title}
      </button>
      {open && (
        <pre
          style={{
            marginTop: 8,
            fontSize: 12,
            background: "#f1f5f9",
            padding: 10,
            borderRadius: 8,
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default JsonPreview;
