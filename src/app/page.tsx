"use client";
import Image from "next/image";
import Hero from "@/components/Hero";
import CustomFilter from "@/components/CustomFilter";
import MarketCard from "@/components/MarketCard";
import InstitutionContact from "@/components/InstitutionContact";
import LineChart from "@/components/LineChart";
import OracleTable from "@/components/OracleTable";
import { MarketProps, ReportArray, ReportProps } from "@/types";

import { useContractRead } from "wagmi";
import { labelhash, multicall3Abi } from "viem";
import { priceAggregatorAbi } from "@/abis";
import { multicall } from "@wagmi/core";
import { useContractReads } from "wagmi";
import { useState } from "react";
import { ChartData } from "chart.js";
import SearchInstitution from "@/components/SearchInstitution";
import ActualValue from "@/components/ActualValue";
import { Navbar } from "@/components/Navbar";

const DEPLOY_TIME = 1700776440;
const PRICE_AGGREGATOR_ADDRESS = "0x903d07fb501017e45d5a73ffba41aafa5413ef07";
const PRE_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";
const SELIC_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000001";
const IPCA_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000002";

export default function Home({ searchParams }: any) {
  const priceCall = {
    address: PRICE_AGGREGATOR_ADDRESS,
    abi: priceAggregatorAbi,
    functionName: "getTokenPriceReports",
  };

  const roundTime = 7200;
  const now = (new Date() as any) / 1000;
  const currentRound = Math.ceil((now - DEPLOY_TIME) / roundTime);
  const calls: any = Array.from(Array(currentRound).keys()).map((n) => {
    return {
      ...priceCall,
      args: [PRE_TOKEN_ADDRESS, n],
    };
  });

  console.log(calls);

  const { data, isError, isLoading } = useContractReads({
    contracts: calls,
    staleTime: 300_000,
    onSuccess(data) {
      console.log("Fetched data successfully", data);
    },
  });

  const allMarkets = [
    {
      exchange_id: "1",
      exchange_name: "Oracle 1",
      pair: "IPCA/BRL",
      base_currency_name: "BRL",
      adjusted_volume_24h_share: 1,
      trust_score: "a",
      last_updated: new Date(),
    } as MarketProps,
  ];

  const isDataEmpty =
    !Array.isArray(allMarkets) || allMarkets.length < 0 || !allMarkets;

  // console.log(allMarkets);

  console.log({ data });
  return (
    <main className="overflow-hidden">
      <Navbar />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <SearchInstitution />

          <Hero title={""} />
          <ActualValue />
          <h1 className="text-4xl mt-10 font-bold">Oráculos</h1>
          <h2>
            Um "oráculo" no contexto de Títulos do Tesouro Direto no Mercado
            Secundário é uma entidade ou serviço que fornece informações
            externas e confiáveis para contratos ou sistemas automatizados em
            uma plataforma financeira. Quando um contrato ou sistema precisa
            saber o preço atual de um Título do Tesouro Direto no Mercado
            Secundário, ele pode usar um oráculo para obter essa informação. O
            oráculo consulta fontes externas, como plataformas de negociação de
            títulos, para obter o preço mais recente. Ele então fornece essa
            informação ao contrato ou sistema, permitindo que ele execute lógica
            de negócios com base no valor atualizado do Título do Tesouro
            Direto.
          </h2>
        </div>

        {
          !isDataEmpty && (
            <section>
              <div className="home__markets-wrapper">
                {allMarkets.slice(0, 20).map((market) => (
                  <MarketCard key={market.exchange_id} market={market} />
                ))}
              </div>
            </section>
          )
          // : (
          //   <div className="home__error-container">
          //     <h2 className="text-black text-base font-bold">No results!</h2>
          //     <p>{allMarkets?.message}</p>
          //   </div>
        }
      </div>
      <LineChart
        labels={getChartDataFromCalls(calls, currentRound).labels}
        datasets={getChartDataFromCalls(calls, currentRound).datasets}
      />
      {/* {!isDataEmpty ? (
        <div>
          {allMarkets.slice(0, 20).map((market) => (
            <OracleTable key={market.exchange_id} market={market} />
          ))}
        </div>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-base font-bold">No results!</h2>
          <p>{allMarkets?.message}</p>
        </div>
      )} */}

      {/* {data &&
        data
          .filter((response) => response.result.length > 0)
          .reverse()
          .map((response, i) => (
            <div key={i}>
              Round {data.length - i - 1}
              {response.result.map((r, j) => (
                <div key={j}>
                  <div>{r.unitPrice.toString() / 10 ** 8}</div>
                  <div>{r.timestamp.toString()}</div>
                  <div>{r.by}</div>
                </div>
              ))}
            </div>
          ))} */}

      {/* {
        data && data.filter((response) => response.result.length > 0)
        .reverse()
        .map((response, i) => (
          <div key={i}>
            Round {data.length - i - 1}
            {response.result.map((r, j) => (
              <div key={j}>
                <div>{r.unitPrice.toString() / 10 ** 8}</div>
                <div>{r.timestamp.toString()}</div>
                <div>{r.by}</div>
              </div>
            ))}
          </div>
        ))} */}

      <OracleTable reports={parseReports(data)} />
    </main>
  );
}

const parseReports = (data: any): ReportProps[] => {
  let flattenedArray = data.flatMap((item) =>
    item.result.map((subItem) => ({
      unitPrice: subItem.unitPrice.toString() / 10 ** 8,
      timestamp: epochToLabel(subItem.timestamp.toString()),
      by: subItem.by,
      status: item.status,
    }))
  );

  // Now 'flattenedArray' contains a single-level array
  console.log(flattenedArray);

  // if (flattenedReports === undefined) {
  //   flattenedReports = [];
  // }
  return flattenedArray;
};

function getChartDataFromCalls(
  calls:
    | (
        | {
            error: Error;
            result?: undefined;
            status: "failure";
          }
        | {
            error?: undefined;
            result: unknown;
            status: "success";
          }
      )[]
    | undefined,
  currentRound: number
): ChartData {
  if (!calls || calls[0].result == undefined) {
    return {
      labels: [],
      datasets: [
        {
          label: "$PREFIXADO/BRL Oraculo 1",
          data: [],
          borderColor: "green",
          borderWidth: 1,
          backgroundColor: "green",
          fill: "true",
        },
      ],
    } as ChartData;
  }
  const epochs = generateSequence(DEPLOY_TIME, 7200, (calls as []).length);
  const labels = epochs.map((e) => epochToLabel(e));
  let values = (calls as []).map((response) =>
    response.result.length > 0
      ? response.result[0].unitPrice.toString() / 10 ** 8
      : 0
  );
  if (values.length == 0) {
    values = Array(epochs.length).fill(0);
  }

  const dataset = {
    label: "$PREFIXADO/BRL Oraculo 1",
    data: values,
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "green",
    fill: "true",
  };

  // const chartData = { labels: labels, datasets: datasets } as ChartData;
  // console.log({ chartData });
  // return chartData;

  return { labels: labels, datasets: [dataset] } as ChartData;
}

function epochToLabel(epoch: number): string {
  const date = new Date(epoch * 1000);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`;
}

function generateSequence(start: number, x: number, k: number) {
  return Array.from({ length: k }, (_, index) => start + (index + 1) * x);
}

