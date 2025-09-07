import React, { useMemo, useState } from "react";
import usePokemonData from "../hooks/usePokemonData";

import DashboardGrid from "../components/layout/DashboardGrid";
import Card from "../components/layout/Card";
import Spinner from "../components/misc/Spinner";
import ErrorBlock from "../components/misc/ErrorBlock";
import EmptyState from "../components/misc/EmptyState";
import Modal from "../components/misc/Modal";
import PokemonDetails from "../components/pokemon/PokemonDetails";
import JsonPreview from "../components/misc/JsonPreview";

import TypeDistributionChart from "../components/charts/TypeDistributionChart";
import StatsRadarChart from "../components/charts/StatsRadarChart";
import {
  getTypeDistribution,
  getRadarStats,
  getAllTypes,
  filterByType,
} from "../utils/dataTransformers";

function Dashboard() {
  const { data: all, loading, error, reload } = usePokemonData(20);

  // --- Filters / selection state ---
  const [selectedType, setSelectedType] = useState("all");
  const [selectedName, setSelectedName] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false); // used in next commit

  // --- Hooks must run on every render (even during loading/error) ---
  const typeOptions = useMemo(
    () => (loading || error ? [] : getAllTypes(all)),
    [all, loading, error]
  );

  const filtered = useMemo(
    () => (loading || error ? [] : filterByType(all, selectedType)),
    [all, selectedType, loading, error]
  );

  const pokemonOptions = useMemo(
    () =>
      filtered.map((p) => ({
        value: p.name.toLowerCase(),
        label: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      })),
    [filtered]
  );

  const selectedPokemon =
    (selectedName &&
      filtered.find((p) => p.name.toLowerCase() === selectedName)) ||
    (filtered.length ? filtered[0] : null);

  const typeChart = useMemo(
    () =>
      filtered.length
        ? getTypeDistribution(filtered)
        : { labels: [], data: [] },
    [filtered]
  );

  const radar = useMemo(
    () =>
      selectedPokemon
        ? getRadarStats(selectedPokemon)
        : { labels: [], data: [] },
    [selectedPokemon]
  );

  const datasetSummary = `Loaded ${filtered.length} Pokémon${
    selectedType !== "all" ? ` (type: ${selectedType})` : ""
  }`;

  // --- Rendering (now it’s safe to early-return) ---
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
    <>
      <div className="toolbar">
        <div className="toolbar-inner">
          <TypeFilter
            options={typeOptions}
            value={selectedType}
            onChange={(v) => {
              setSelectedType(v);
              setSelectedName("");
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
          <JsonPreview data={filtered.slice(0, 3)} title="Sample Data" />
        </Card>
      </DashboardGrid>
      <Modal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={
          selectedPokemon?.name
            ? `${selectedPokemon.name} — Details`
            : "Details"
        }
      >
        <PokemonDetails pokemon={selectedPokemon} />
      </Modal>
    </>
  );
}

import TypeFilter from "../components/filters/TypeFilter";
import PokemonSelect from "../components/filters/PokemonSelect";
import ViewDetailsButton from "../components/actions/ViewDetailsButton";

export default Dashboard;
