"use client";
import MarketCard from "@/components/MarketCard";
import LineChart from "@/components/LineChart";
import OracleTable from "@/components/OracleTable";
import SearchInstitution from "@/components/SearchInstitution";
import ActualValue from "@/components/ActualValue";
import { Navbar } from "@/components/Navbar";
import { addresses, CONTRACT_EXAMPLE } from "@/constants";
import { usePrices, parseUnitPrice } from "@/hooks";
import { useState } from "react";
import { Tooltip } from "flowbite-react";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

export default function Home() {
  const hljsDefineSolidity = require("highlightjs-solidity");
  hljsDefineSolidity(hljs);
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code) {
        const language = "solidity";
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  const [openExample, setOpenExample] = useState(false);
  const { ipcaReports, selicReports, preReports, scores, isError, isLoading } =
    usePrices();

  const [selected, setSelected] = useState<string>("pre");
  const tokenName =
    selected === "pre"
      ? "Tesouro Prefixado 2026 LTN"
      : selected === "ipca"
      ? "Tesouro IPCA+ 2029 NTN-B Principal"
      : "Tesouro Selic 2026 LFT";
  const ipcaAverages = calculate30mAverages(ipcaReports.reports);
  const preAverages = calculate30mAverages(preReports.reports);
  const selicAverages = calculate30mAverages(selicReports.reports);

  const reports =
    selected === "pre"
      ? preReports
      : selected === "ipca"
      ? ipcaReports
      : selicReports;
  const averages =
    selected === "pre"
      ? preAverages
      : selected === "ipca"
      ? ipcaAverages
      : selicAverages;

  const toLineChart = [
    { points: Object.values(preAverages), tokenName: "Tesouro Prefixado 2026" },
    { points: Object.values(ipcaAverages), tokenName: "Tesouro IPCA+ 2029" },
    { points: Object.values(selicAverages), tokenName: "Tesouro Selic 2026" },
  ];

  console.log({ reports });

  return (
    <main className="overflow-hidden">
      <Navbar />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <SearchInstitution title={tokenName} setSelected={setSelected} />
          <ActualValue
            lastTimestamp={reports?.reports?.at(-1)?.timestamp}
            lastDate={reports?.reports?.at(-1)?.date || "Desconhecida"}
            lastValue={parseUnitPrice(
              reports?.latestRound?.avgPrice as unknown as bigint
            )}
            lastApy={parseUnitPrice(
              reports?.latestRound?.avgApy as unknown as bigint
            )}
          />
          <h1 className="text-4xl mt-10 font-bold">Oráculos</h1>
          <h2>
            Um oráculo é uma entidade que fornece dados externos para
            blockchains, conectando-as a informações do mundo real e permitindo
            o desenvolvimento de novos casos de uso. Para garantir a integridade
            dos dados, uma seleção de oráculos independentes e de boa reputação
            reporta as informações individualmente para que um valor final seja
            calculado. No contexto desta aplicação, os preços dos Títulos
            Públicos do Tesouro Direto no mercado secundário são reportados
            pelos oráculos em um smart contract a cada 2 horas. Após, um valor
            final médio para aquele período de tempo é calculado pelo smart
            contract. Assim, qualquer sistema onchain que necessita de dados
            atualizados sobre a cotação de um título público (e.g. empréstimos
            colateralizados via títulos públicos tokenizados) pode consultar
            este smart contract para executar sua lógica de negócios.
          </h2>
        </div>
        <MarketCard
          reports={reports.reports}
          tokenName={tokenName}
          scores={scores}
        />
        <div className="my-2 rounded-xl max-h-[100px] border-[1px] bg-slate-110 p-4">
          <div className="font-bold leading-5 flex flex-row">
            <p className="mr-2">Endereço do smart contract</p>
            <Tooltip
              content={
                <span className="max-w-[32ch] block text-justify">
                  Este é o endereço on-chain do smart contract responsável pelo
                  recebimento dos preços e cálculo do valor médio.
                </span>
              }
              placement="right"
              style={"light"}
              className=""
            >
              <button type="button" className="">
                <img src="https://smartcontract.imgix.net/icons/info.svg?auto=compress%2Cformat" />
              </button>
            </Tooltip>
          </div>
          <div className="mt-2">
            <a
              className="text-blue-600 font-bold"
              target="_blank"
              rel="noreferrer"
              href={`https://sepolia.etherscan.io/address/${addresses.PRICE_AGGREGATOR_ADDRESS}`}
            >
              {addresses.PRICE_AGGREGATOR_ADDRESS}
            </a>
          </div>
        </div>

        <div className="font-bold leading-5 flex flex-col my-2 rounded-xl border-[1px] bg-slate-110 p-4">
          <div className="flex flex-row">
            <h2
              className="cursor-pointer mr-2"
              onClick={() => setOpenExample(!openExample)}
            >
              Obtendo a cotação dos Títulos do Tesouro no seu smart contract
            </h2>
            <Tooltip
              content={
                <span className="max-w-[32ch] block text-justify">
                  Exemplo de smart contract em Solidity para obter valores do
                  Tesouro.
                </span>
              }
              placement="right"
              style={"light"}
              className=""
            >
              <button type="button" className="">
                <img src="https://smartcontract.imgix.net/icons/info.svg?auto=compress%2Cformat" />
              </button>
            </Tooltip>
          </div>
          {openExample && (
            <div
              className="bg-gray-100 p-2 text-xs prose-lg prose-invert mt-2 max-w-none prose-a:text-blue-400 prose-pre:w-fit prose-pre:bg-dark-secondary_background prose-tr:divide-x prose-th:border-b-[2px]"
              dangerouslySetInnerHTML={{
                __html: CONTRACT_EXAMPLE
                  ? (marked.parse(CONTRACT_EXAMPLE) as string)
                  : "No content.",
              }}
            ></div>
          )}
        </div>
      </div>
      <LineChart
        labels={Object.keys(averages)}
        data={toLineChart}
        tokenName={tokenName}
      />

      <OracleTable tokenName={tokenName} reports={reports.reports} />
    </main>
  );
}

function calculate30mAverages(data: any) {
  const dailyData: Record<string, any> = {};

  data.forEach((item: any) => {
    let key;
    const date = new Date(Number(item.timestamp) * 1000)
      .toISOString()
      .split("T")[0];

    const [hours, minutes, seconds] = new Date(Number(item.timestamp) * 1000)
      .toISOString()
      .split("T")[1]
      .split(":");

    if (Number(minutes) < 30) {
      key = date + " " + hours + "h" + "00m";
    } else {
      key = date + " " + ((Number(hours) + 1) % 24) + "h" + "00m";
    }

    if (!dailyData[key]) {
      dailyData[key] = { sum: 0, count: 0 };
    }

    dailyData[key].sum += Number(item.price);
    dailyData[key].count++;
  });

  const dailyAverages: Record<string, number> = {};
  for (const dateKey in dailyData) {
    const { sum, count } = dailyData[dateKey];
    dailyAverages[dateKey] = Number((sum / count).toFixed(2));
  }

  return dailyAverages;
}
