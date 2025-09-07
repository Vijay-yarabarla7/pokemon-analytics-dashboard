// Utility to safely register required Chart.js components once

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

let isRegistered = false; // tracks if Chart.js components have already been registered

function ensureChartRegistration() {
  // Prevent duplicate registration
  if (isRegistered) return;
  // Register only once all the scales, elements, and plugins needed across charts
  ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale, // required for radar charts
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Tooltip,
    Legend,
    Title
  );
  isRegistered = true; // mark as registered
}

export default ensureChartRegistration;
