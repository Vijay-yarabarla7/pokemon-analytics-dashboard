// For visualizing Pokémon stats

import { Radar } from "react-chartjs-2";
import ensureChartRegistration from "./chartRegistration";
import {
  readCssVar,
  buildRadarScale,
  buildCommonPlugins,
} from "../../utils/chartConfig";

// Ensure required Chart.js components are registered once before rendering
ensureChartRegistration();

function StatsRadarChart({ labels = [], data = [], title = "Stats" }) {
  // If no labels, render a fallback message instead of an empty chart
  if (!labels.length) return <p>No stats available.</p>;

  // Pull chart accent colors from CSS variables
  const accent = readCssVar("--chart-accent");
  const accentFill = readCssVar("--chart-accent-fill");

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderWidth: 2,
        borderColor: accent,
        backgroundColor: accentFill,
        pointBackgroundColor: accent,
        pointBorderColor: accent,
        pointRadius: 3,
        pointHoverRadius: 4,
        fill: true,
      },
    ],
  };

  // Chart.js options for responsiveness, plugins, and radar-specific scaling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: buildCommonPlugins(title), // shared plugin config (title, legend, etc.)
    scales: buildRadarScale(),
    animation: { duration: 250 },
  };

  // Container ensures fixed height for consistent layout
  return (
    <div style={{ height: 340 }}>
      <Radar data={chartData} options={options} />
    </div>
  );
}
export default StatsRadarChart;
