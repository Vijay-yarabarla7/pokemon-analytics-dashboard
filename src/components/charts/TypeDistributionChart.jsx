import React from "react";
import { Bar } from "react-chartjs-2";
import ensureChartRegistration from "./chartRegistration";
import { buildAxes, buildCommonPlugins } from "../../utils/chartConfig";

ensureChartRegistration();

function TypeDistributionChart({ labels = [], data = [], onBarClick }) {
  if (!labels.length) return <p>No type data available.</p>;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Count by Type",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.45)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: buildCommonPlugins("Pokémon by Type"),
    scales: buildAxes(),
    onClick: (_evt, elements, chart) => {
      if (!onBarClick || !elements?.length) return;
      const idx = elements[0].index;
      const clickedLabel = chart?.data?.labels?.[idx];
      if (clickedLabel) onBarClick(String(clickedLabel).toLowerCase());
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default TypeDistributionChart;
