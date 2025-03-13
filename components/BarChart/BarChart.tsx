import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { BarChartProps } from "./BarChart.types"; // Ensure it's imported if needed
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BarChart: React.FC<BarChartProps> = ({ targets }) => {
  const pipelineCounts = targets.reduce(
    (acc: { [key: string]: number }, target) => {
      const status = target.pipelineStatus || "Uncategorized";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = {
    labels: Object.keys(pipelineCounts),
    datasets: [
      {
        label: "Number of Targets",
        data: Object.values(pipelineCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "white", // Change x-axis ticks color to white
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // Change y-axis ticks color to white
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"bar">) {
            const value = tooltipItem.raw as number; // Get the raw value
            return `Number of Targets: ${value}`; // Customize tooltip label
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 shadow-lg  p-4 mx-auto">
      <div className="relative w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
