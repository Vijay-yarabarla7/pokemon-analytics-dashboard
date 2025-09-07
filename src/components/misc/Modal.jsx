// Modal dialog component with backdrop and close button
function Modal({ open, onClose, title = "", children }) {
  // Do not render anything if modal is closed
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <section className="modal-panel" role="dialog" aria-modal="true">
        {/* Modal header with optional title and close button */}
        <header className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        {/* Modal content area */}
        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
