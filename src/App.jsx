import React from "react";
import "./styles/dashboard.css";

import Header from "./components/layout/Header";
import Toolbar from "./components/layout/Toolbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <main className="container" role="main">
      <Header />
      <Toolbar />
      <Dashboard />
    </main>
  );
}

export default App;
