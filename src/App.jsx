import "./styles/dashboard.css";

import Header from "../src/layout/Header";
import Toolbar from "../src/layout/Toolbar";
import DashboardGrid from "../src/layout/DashboardGrid";
import Card from "../src/layout/Card";

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
