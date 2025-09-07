import React, { useMemo, useState } from "react";
import usePokemonData from "../hooks/usePokemonData";

import DashboardGrid from "../components/layout/DashboardGrid";
import Card from "../components/layout/Card";
import Spinner from "../components/misc/Spinner";
import ErrorBlock from "../components/misc/ErrorBlock";
import EmptyState from "../components/misc/EmptyState";

import TypeDistributionChart from "../components/charts/TypeDistributionChart";
import StatsRadarChart from "../components/charts/StatsRadarChart";
import {
  getTypeDistribution,
  getRadarStats,
  getAllTypes,
  filterByType,
} from "../utils/dataTransformers";

import TypeFilter from "../components/filters/TypeFilter";
import PokemonSelect from "../components/filters/PokemonSelect";
import ViewDetailsButton from "../components/actions/ViewDetailsButton";

function Dashboard() {
  const { data: all, loading, error, reload } = usePokemonData(20);

  // --- Filters / selection state ---
  const [selectedType, setSelectedType] = useState("all");
  const [selectedName, setSelectedName] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false); // will be used in Commit 9

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

  // Build type options once data is available
  const typeOptions = useMemo(() => getAllTypes(all), [all]);

  // Filter list by selected type
  const filtered = useMemo(
    () => filterByType(all, selectedType),
    [all, selectedType]
  );

  // Build Pokémon dropdown options from filtered list
  const pokemonOptions = useMemo(
    () =>
      filtered.map((p) => ({
        value: p.name.toLowerCase(),
        label: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      })),
    [filtered]
  );

  // Determine selected Pokémon (by name) or fallback to first filtered
  const selectedPokemon =
    (selectedName &&
      filtered.find((p) => p.name.toLowerCase() === selectedName)) ||
    (filtered.length ? filtered[0] : null);

  // Chart data
  const typeChart = useMemo(() => getTypeDistribution(filtered), [filtered]);
  const radar = useMemo(
    () => getRadarStats(selectedPokemon),
    [selectedPokemon]
  );

  const datasetSummary = `Loaded ${filtered.length} Pokémon${
    selectedType !== "all" ? ` (type: ${selectedType})` : ""
  }`;

  return (
    <>
      {/* Toolbar with filters and details button */}
      <div className="toolbar">
        <div className="toolbar-inner">
          <TypeFilter
            options={typeOptions}
            value={selectedType}
            onChange={(v) => {
              setSelectedType(v);
              setSelectedName(""); // reset selection when type changes
            }}
          />
          <PokemonSelect
            options={pokemonOptions}
            value={selectedPokemon?.name?.toLowerCase() || ""}
            onChange={setSelectedName}
          />
          <ViewDetailsButton onClick={() => setDetailsOpen(true)} />
        </div>
      </div>

      <DashboardGrid>
        <Card title="Type Distribution">
          {typeChart.labels.length ? (
            <TypeDistributionChart
              labels={typeChart.labels}
              data={typeChart.data}
              onBarClick={(lower) => setSelectedType(lower)}
            />
          ) : (
            <EmptyState title="No type data" />
          )}
        </Card>

        <Card title="Stats Radar">
          {radar.labels.length ? (
            <StatsRadarChart
              labels={radar.labels}
              data={radar.data}
              name={selectedPokemon?.name}
            />
          ) : (
            <EmptyState title="No stats data" />
          )}
        </Card>

        <Card title="Dataset">
          <div className="dataset-summary">{datasetSummary}</div>
        </Card>
      </DashboardGrid>
    </>
  );
}

export default Dashboard;
