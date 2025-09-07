import React from "react";
import usePokemonData from "../hooks/usePokemonData";

import DashboardGrid from "../components/layout/DashboardGrid";
import Card from "../components/layout/Card";
import Spinner from "../components/misc/Spinner";
import ErrorBlock from "../components/misc/ErrorBlock";
import EmptyState from "../components/misc/EmptyState";

import TypeDistributionChart from "../components/charts/TypeDistributionChart";
import StatsRadarChart from "../components/charts/StatsRadarChart";
import { getTypeDistribution, getRadarStats } from "../utils/dataTransformers";

function Dashboard() {
  const { data, loading, error, reload } = usePokemonData(20);

  if (loading) {
    return (
      <Card title="Loading">
        <Spinner />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Error">
        <ErrorBlock message={error} onRetry={reload} />
      </Card>
    );
  }

  return (
    <DashboardGrid>
      <Card title="Type Distribution">
        {data.length > 0 ? (
          <TypeDistributionChart {...getTypeDistribution(data)} />
        ) : (
          <EmptyState title="No type data" />
        )}
      </Card>

      <Card title="Stats Radar">
        {data.length > 0 ? (
          <StatsRadarChart {...getRadarStats(data[0])} name={data[0].name} />
        ) : (
          <EmptyState title="No stats data" />
        )}
      </Card>

      <Card title="Dataset">
        {Array.isArray(data) && data.length > 0 ? (
          <>
            <div style={{ marginBottom: 8 }}>
              Found <strong>{data.length}</strong> Pokémon
            </div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {data.slice(0, 8).map((p) => (
                <li key={p.id || p.name}>{p.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <EmptyState title="No data loaded" />
        )}
      </Card>
    </DashboardGrid>
  );
}

export default Dashboard;
