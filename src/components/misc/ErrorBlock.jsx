// Component to display an error message with an optional retry action

function ErrorBlock({ message, onRetry }) {
  return (
    <div
      role="alert"
      style={{
        padding: 16,
        borderRadius: 12,
        border: "1px solid #fecaca",
        background: "#fff1f2",
        color: "#7f1d1d",
      }}
    >
      <div style={{ marginBottom: 8, fontWeight: 600 }}>
        Something went wrong
      </div>
      <div style={{ marginBottom: 12 }}>{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid #ef4444",
            background: "#ef4444",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorBlock;
