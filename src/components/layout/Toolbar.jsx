// Page header component for the dashboard
function Toolbar({ children }) {
  return (
    <div className="toolbar">
      {/* To hold toolbar items */}
      <div className="toolbar-inner">{children}</div>
    </div>
  );
}

export default Toolbar;
