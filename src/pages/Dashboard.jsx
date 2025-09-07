import { useState, useMemo } from "react";

// Layout components
import Header from "../components/layout/Header";
import Toolbar from "../components/layout/Toolbar";
import Card from "../components/layout/Card";
import DashboardGrid from "../components/layout/DashboardGrid";

// Filters
import TypeFilter from "../components/filters/TypeFilter";
import PokemonSelect from "../components/filters/PokemonSelect";

// Charts
import TypeDistributionChart from "../components/charts/TypeDistributionChart";
import StatsRadarChart from "../components/charts/StatsRadarChart";

// Misc UI (feedback, utilities, modal, details)
import Spinner from "../components/misc/Spinner";
import ErrorBlock from "../components/misc/ErrorBlock";
import JsonPreview from "../components/misc/JsonPreview";
import Modal from "../components/misc/Modal";
import PokemonDetails from "../components/pokemon/PokemonDetails";
import ViewDetailsButton from "../components/actions/ViewDetailsButton";

// Data: custom hook + transformers
import usePokemonData from "../hooks/usePokemonData";
import {
  filterByType,
  getAllTypes,
  getTypeDistribution,
  getRadarStats,
} from "../utils/dataTransformers";

// Small helpers
import titleCase from "../utils/formatters";
import compactPokemonList from "../utils/jsonHelpers";

function Dashboard() {
  // Fetch Pokémon dataset (first 20 with details) via custom hook.
  const { data: allPokemon, loading, error, reload } = usePokemonData(20);

  // Local UI state
  const [selectedType, setSelectedType] = useState("all"); // active type filter
  const [selectedPokemonName, setSelectedPokemonName] = useState(""); // dropdown selection
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // modal toggle

  // Build available type filter options from dataset.
  // Memoized to avoid recomputing when data hasn’t changed.
  const typeOptions = useMemo(() => getAllTypes(allPokemon), [allPokemon]);

  // Filter dataset by currently selected type.
  // Memoized to avoid unnecessary recalculations on every render.
  const filteredPokemon = useMemo(
    () => filterByType(allPokemon, selectedType),
    [allPokemon, selectedType]
  );

  // Identify currently selected Pokémon.
  // If none selected, fall back to the first in the filtered list.
  let selectedPokemon = null;
  if (filteredPokemon.length) {
    const pokemonByName =
      selectedPokemonName &&
      filteredPokemon.find(
        (pokemon) => pokemon?.name?.toLowerCase() === selectedPokemonName
      );
    selectedPokemon = pokemonByName || filteredPokemon[0];
  }

  // Transform filtered list into dropdown options.
  // Memoized for stable props → prevents unnecessary re-renders in PokemonSelect.
  const pokemonOptions = useMemo(
    () =>
      filteredPokemon.map((pokemon) => ({
        value: pokemon.name.toLowerCase(),
        label: titleCase(pokemon.name),
      })),
    [filteredPokemon]
  );

  // Prepare chart data for type distribution.
  // Memoized since chart libraries benefit from stable data references.
  const typeChartData = useMemo(
    () => getTypeDistribution(filteredPokemon),
    [filteredPokemon]
  );

  // Prepare chart data for selected Pokémon stats.
  // Memoized to avoid recalculating unless selection changes.
  const radarChartData = useMemo(
    () => getRadarStats(selectedPokemon),
    [selectedPokemon]
  );

  // Loading / error states
  if (loading) {
    return (
      <div className="container">
        <Header />
        <Spinner /> {/* spinner while fetching data */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Header />
        {/* Error block provides retry option via reload() */}
        <ErrorBlock message={error} onRetry={reload} />
      </div>
    );
  }

  // ----- Handlers -----
  function handleTypeChange(newTypeValue) {
    setSelectedType(newTypeValue);
    setSelectedPokemonName(""); // reset dropdown when type changes
  }

  function handlePokemonChange(newPokemonName) {
    setSelectedPokemonName(newPokemonName);
  }

  function handleTypeBarClick(lowercaseTypeLabel) {
    handleTypeChange(lowercaseTypeLabel);
  }

  // Dataset summary string displayed in Dataset card
  const datasetSummary = `Loaded ${filteredPokemon.length} Pokémon${
    selectedType !== "all" ? ` (type: ${selectedType})` : ""
  }.`;

  // ----- Render -----
  return (
    <main className="container" role="main">
      <Header />

      {/* Toolbar contains filters, dropdown, and actions */}
      <Toolbar>
        <TypeFilter
          options={typeOptions}
          value={selectedType}
          onChange={handleTypeChange}
        />

        <PokemonSelect
          options={pokemonOptions}
          value={selectedPokemon?.name?.toLowerCase() || ""}
          onChange={handlePokemonChange}
        />

        <ViewDetailsButton onClick={() => setIsDetailsModalOpen(true)} />
      </Toolbar>

      <DashboardGrid>
        {/* Type distribution chart card */}
        <Card title="Type Distribution">
          <TypeDistributionChart
            labels={typeChartData.labels}
            data={typeChartData.data}
            onBarClick={handleTypeBarClick}
          />
        </Card>
        {/* Stats radar chart card */}
        <Card title="Stats Radar">
          <StatsRadarChart
            labels={radarChartData.labels}
            data={radarChartData.data}
            title={
              selectedPokemon
                ? `${titleCase(selectedPokemon.name)} Stats`
                : "Stats"
            }
          />
        </Card>
        {/* Dataset overview card */}
        <Card title="Dataset">
          <p className="dataset-summary">{datasetSummary}</p>
          <JsonPreview data={compactPokemonList(filteredPokemon)} />
        </Card>
      </DashboardGrid>

      {/* Modal with Pokémon details */}
      <Modal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={selectedPokemon ? titleCase(selectedPokemon.name) : "Pokémon"}
      >
        <PokemonDetails pokemon={selectedPokemon} />
      </Modal>
    </main>
  );
}

export default Dashboard;
