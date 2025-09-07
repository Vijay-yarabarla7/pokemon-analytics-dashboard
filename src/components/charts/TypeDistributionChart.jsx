// Bar chart showing counts per Pokémon type with clickable bars for filtering
import { Bar } from "react-chartjs-2";
import ensureChartRegistration from "./chartRegistration";
import {
  readCssVar,
  buildAxes,
  buildCommonPlugins,
} from "../../utils/chartConfig";

// Ensure Chart.js components are registered once before any chart renders
ensureChartRegistration();

function TypeDistributionChart({ labels = [], data = [], onBarClick }) {
  // To avoid rendering an empty chart; show a friendly message instead
  if (!labels.length) return <p>No type data available.</p>;

  // Pull palette from CSS variables
  const accent = readCssVar("--chart-accent");
  const accentFill = readCssVar("--chart-accent-fill");

  const chartData = {
    labels,
    datasets: [
      {
        label: "Count by Type",
        data,
        backgroundColor: accentFill,
        borderColor: accent,
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.82,
        categoryPercentage: 0.78,
        hoverBorderColor: accent,
        hoverBorderWidth: 2,
      },
    ],
  };

  // Shared plugins, axes, quick animation, and click → filter
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: buildCommonPlugins("Pokémon Type Distribution"),
    scales: buildAxes(),
    animation: { duration: 250 },
    onClick: (evt, elements) => {
      if (!onBarClick || !elements?.length) return;
      const index = elements[0].index;
      const clickedLabel = labels[index];
      if (clickedLabel) onBarClick(clickedLabel.toLowerCase());
    },
  };

  return (
    <div style={{ height: 360 }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
export default TypeDistributionChart;
