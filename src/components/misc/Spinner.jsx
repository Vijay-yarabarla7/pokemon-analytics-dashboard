// Loading spinner component with optional text message
function Spinner({ text = "Loading Pokémon data..." }) {
  return (
    <div className="spinner-wrapper">
      {/* Spinner animation element */}
      <div className="spinner" />

      {/* Loading message text */}
      <p className="spinner-text">{text}</p>
    </div>
  );
}

export default Spinner;
