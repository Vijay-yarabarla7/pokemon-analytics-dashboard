import React, { useMemo, useState } from "react";

// Collapsible component to preview JSON data
function JsonPreview({ data }) {
  // State to toggle collapse open/close
  const [isOpen, setIsOpen] = useState(false);

  // Memoized pretty-printed JSON string (fallback if invalid)
  const prettyJson = useMemo(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return "// Unable to render JSON";
    }
  }, [data]);

  // If no data, render nothing
  if (!data) return null;

  return (
    <div className="collapse">
      {/* Collapse header button */}
      <button
        type="button"
        className="collapse-header"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle collapse state
      >
        <span className={`caret ${isOpen ? "caret-open" : ""}`} aria-hidden />
        Filtered dataset JSON
      </button>

      {/* Collapsible body with scrollable JSON preview */}
      {isOpen && (
        <div className="collapse-body open">
          <div className="json-scroll">
            <pre className="json">{prettyJson}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default JsonPreview;
