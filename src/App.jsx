import "./styles/dashboard.css";

import Header from "./components/layout/Header";
import Toolbar from "./components/layout/Toolbar";
import DashboardGrid from "./components/layout/DashboardGrid";
import Card from "./components/layout/Card";

function App() {
  return (
    <main className="container" role="main">
      <Header />

      <Toolbar />

      <DashboardGrid>
        <Card title="Type Distribution" />
        <Card title="Stats Radar" />
        <Card title="Dataset" />
      </DashboardGrid>
    </main>
  );
}

export default App;
