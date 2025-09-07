import React from "react";
import { Radar } from "react-chartjs-2";
import ensureChartRegistration from "./chartRegistration";
import { buildRadarScale, buildCommonPlugins } from "../../utils/chartConfig";

ensureChartRegistration();

function StatsRadarChart({ labels = [], data = [], name }) {
  if (!labels.length) return <p>No stats available.</p>;

  const chartData = {
    labels,
    datasets: [
      {
        label: name || "Pokémon",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.35)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: buildCommonPlugins("Stats Radar"),
    scales: buildRadarScale(),
  };

  return <Radar data={chartData} options={options} />;
}

export default StatsRadarChart;
