// Component to display an error message with an optional retry action
function ErrorBlock({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="error-block">
      {/* Error message text */}
      <p className="error-text">{message}</p>

      {/* Retry button, shown only if onRetry callback is provided */}
      {onRetry && (
        <div className="error-actions">
          <button className="btn" onClick={onRetry}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default ErrorBlock;
