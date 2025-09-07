// Reusable card container component for wrapping content
function Card({ title, children }) {
  return (
    <section className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {/* Card content */}
      {children}
    </section>
  );
}

export default Card;
