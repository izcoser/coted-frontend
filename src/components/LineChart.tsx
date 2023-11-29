"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

type Props = {
  labels: Array<string>;
  data: Array<number>;
};

const LineChart = ({ labels, data }: Props) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Daily Averages",
        data: data,
        borderColor: "green",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <div className="line-chart-container mb-20">
      <div className="flex-1 overflow-auto pt-36 padding padding-x">
        <h2 className="my-20 text-2xl font-bold">Médias Diárias</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LineChart;
