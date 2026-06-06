import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyticsChart = ({ analytics }) => {
  if (!analytics || !analytics.mealStats) {
    return <p className="text-gray-500 text-center">No data</p>;
  }

  // Bar Chart
  const barData = {
    labels: Object.keys(analytics.mealStats),
    datasets: [
      {
        label: "Average Rating",
        data: Object.values(analytics.mealStats).map((m) => m.avg),
        backgroundColor: "#22c55e",
      },
    ],
  };

  // Doughnut Chart
  const doughnutData = {
    labels: Object.keys(analytics.tagStats),
    datasets: [
      {
        data: Object.values(analytics.tagStats),
        backgroundColor: ["#16a34a", "#6ec522", "#dc2427", "#ef8686","#e8c136"],
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      
      {/* RESPONSIVE CONTAINER */}
      <div className="w-full max-w-md">

        {/* GRID FIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BAR CHART */}
          <div className="bg-gray-800 p-3 rounded-xl">
            <Bar data={barData} />
          </div>

          {/* DOUGHNUT CHART */}
          <div className="bg-gray-800 p-3 rounded-xl">
            <Doughnut data={doughnutData} />
          </div>

        </div>

      </div>

    </div>
  );
};

export default AnalyticsChart;