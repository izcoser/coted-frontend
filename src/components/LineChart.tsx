"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  ChartData,
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
  labels: Array<string>,
  datasets: any
}

const LineChart = ({labels, datasets}: Props) => {
  const placeholderData = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="line-chart-container mb-20">
      <div className="flex-1 overflow-autopt-36 padding padding-x">
        <h2 className="my-20 text-2xl font-bold">Cotação</h2>
        <Line
          data={placeholderData}
        />
      </div>
    </div>
  );
};
export default LineChart;
