// Reusable button component to open the Pokémon details modal

function ViewDetailsButton({ onClick }) {
  return (
    <button className="btn" onClick={onClick} type="button">
      View Details
    </button>
  );
}

export default ViewDetailsButton;
