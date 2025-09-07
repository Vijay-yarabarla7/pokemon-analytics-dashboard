// Read a CSS custom property from :root and return a trimmed string
function readCssVar(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    name
  );
  return (value && value.trim()) || "";
}

// Common plugins: title, legend, tooltip — all styled via CSS vars.
function buildCommonPlugins(titleText) {
  const textColor = readCssVar("--text");
  const tooltipBg = readCssVar("--chart-tooltip-bg");
  const tooltipBorder = readCssVar("--chart-tooltip-border");
  const tooltipText = readCssVar("--chart-tooltip-text");

  return {
    legend: {
      display: false,
      labels: { color: textColor, font: { size: 13 } },
    },
    title: {
      display: !!titleText,
      text: titleText,
      color: textColor,
      font: { size: 15, weight: "600" },
      padding: { top: 6, bottom: 10 },
    },
    tooltip: {
      enabled: true,
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      borderWidth: 1,
      titleColor: tooltipText,
      bodyColor: tooltipText,
      displayColors: true,
      padding: 10,
      boxWidth: 10,
      boxHeight: 10,
      mode: "index",
      intersect: false,
    },
  };
}

// Cartesian axes (bar/line) with themed ticks and grid.
function buildAxes() {
  const textColor = readCssVar("--text");
  const gridColor = readCssVar("--chart-grid");

  return {
    x: {
      grid: { color: "transparent" },
      ticks: { color: textColor, font: { size: 13 }, maxRotation: 50 },
    },
    y: {
      beginAtZero: true,
      grid: { color: gridColor },
      ticks: { color: textColor, font: { size: 13 }, precision: 0 },
    },
  };
}

// Radar scale (for radar charts) with themed ticks, grid, and labels.
function buildRadarScale() {
  const textColor = readCssVar("--text");
  const gridColor = readCssVar("--chart-grid");

  return {
    r: {
      beginAtZero: true,
      grid: { color: gridColor },
      angleLines: { color: gridColor },
      ticks: {
        showLabelBackdrop: false,
        color: textColor,
        font: { size: 13 },
        stepSize: 20,
      },
      pointLabels: { color: textColor, font: { size: 12 } },
    },
  };
}

export { readCssVar, buildCommonPlugins, buildAxes, buildRadarScale };
