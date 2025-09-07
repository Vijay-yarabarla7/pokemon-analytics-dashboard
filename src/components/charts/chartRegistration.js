// Register required Chart.js components once
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

let isRegistered = false;

function ensureChartRegistration() {
  if (isRegistered) return;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Tooltip,
    Legend,
    Title
  );
  isRegistered = true;
}

export default ensureChartRegistration;
