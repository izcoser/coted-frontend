"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { useState } from "react";
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
  data: { points: Array<number>; tokenName: string }[];
  tokenName: string;
};

const color = (tokenName: string): string => {
  return tokenName === "Tesouro Prefixado 2026"
    ? "blue"
    : tokenName === "Tesouro IPCA+ 2029"
    ? "red"
    : "green";
};

const LineChart = ({ labels, data, tokenName }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const chartData = {
    labels: labels,
    datasets: data
      .filter((d) => d.tokenName === tokenName || showAll)
      .map((d, i) => ({
        label: d.tokenName,
        data: d.points,
        borderColor: color(d.tokenName),
        borderWidth: 4,
        fill: false,
      })),
  };

  return (
    <div className="line-chart-container mb-20">
      <div className="flex-1 overflow-auto">
        <h2 className="mt-10 text-2xl font-bold">
          Cotação do
          {showAll ? "s Títulos Públicos do Tesouro" : " " + tokenName}
        </h2>
        <div className="font-bold my-2 items-center">
          <div className="flex flex-col space-y-2">
            <div className="space-x-2">
              <label htmlFor="showAll">Mostrar todos</label>
              <input
                onChange={() => setShowAll(!showAll)}
                name="showAll"
                type="checkbox"
              ></input>
            </div>
            <div className="space-x-2">
              <span>Legenda: </span>
              {(showAll || tokenName === "Tesouro Prefixado 2026") && (
                <span className="text-[#0000f7]">• Prefixado 2026</span>
              )}
              {(showAll || tokenName === "Tesouro IPCA+ 2029") && (
                <span className="text-[#ed3939]">• IPCA+ 2029</span>
              )}
              {(showAll || tokenName === "Tesouro Selic 2026") && (
                <span className="text-[#2e912e]">• Selic 2026</span>
              )}
            </div>
          </div>
        </div>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LineChart;
