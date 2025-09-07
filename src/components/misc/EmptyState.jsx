// Component to display a message when no data is available
function EmptyState({ text = "No data to display." }) {
  return <p className="empty-state">{text}</p>;
}

export default EmptyState;
