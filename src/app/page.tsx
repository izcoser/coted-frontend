"use client";
import Image from "next/image";
import Hero from "@/components/Hero";
import MarketCard from "@/components/MarketCard";
import InstitutionContact from "@/components/InstitutionContact";
import LineChart from "@/components/LineChart";
import OracleTable from "@/components/OracleTable";
import { ReportArray, ReportProps } from "@/types";

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

  console.log({ data });
  const dailyAverages = calculateDailyAverages(data);
  const lastDate = Object.keys(dailyAverages).pop();
  const lastValue = dailyAverages[lastDate] || 0;

  return (
    <main className="overflow-hidden">
      <Navbar />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <SearchInstitution />
          <Hero title={""} />
          <ActualValue lastDate={lastDate} lastValue={lastValue} />
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
        <MarketCard reports={parseReports(data)} />
      </div>
      <LineChart
        labels={Object.keys(dailyAverages)}
        data={Object.values(dailyAverages)}
      />

      <OracleTable reports={parseReports(data)} />
    </main>
  );
}

function calculateDailyAverages(data: any) {
  const dailyData = {};

  if (!data || !Array.isArray(data)) {
    console.error("Invalid data format or empty data.");
    return {};
  }

  data.forEach((item: { result: any[] }) => {
    if (item && Array.isArray(item.result)) {
      item.result.forEach((subItem) => {
        const dateKey = new Date(Number(subItem.timestamp) * 1000)
          .toISOString()
          .split("T")[0];

        if (!dailyData[dateKey]) {
          dailyData[dateKey] = { sum: 0, count: 0 };
        }

        dailyData[dateKey].sum += Number(subItem.unitPrice);
        dailyData[dateKey].count++;
      });
    }
  });

  const dailyAverages = {};
  for (const dateKey in dailyData) {
    const { sum, count } = dailyData[dateKey];
    dailyAverages[dateKey] = sum / count / 10 ** 8;
  }

  return dailyAverages;
}
const parseReports = (data: any): ReportProps[] => {
  if (!data || !Array.isArray(data)) {
    console.error("Invalid data format or empty data.");
    return [];
  }

  let flattenedArray: ReportProps[] = [];

  data.forEach((item) => {
    if (item && item.result && Array.isArray(item.result)) {
      flattenedArray = flattenedArray.concat(
        item.result.map((subItem) => ({
          unitPrice: subItem.unitPrice.toString() / 10 ** 8,
          timestamp: epochToLabel(subItem.timestamp.toString()),
          by: subItem.by,
          status: item.status,
        }))
      );
    }
  });

  // Now 'flattenedArray' contains a single-level array
  console.log(flattenedArray);

  return flattenedArray;
};

function epochToLabel(epoch: number): string {
  const date = new Date(epoch * 1000);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`;
}

function generateSequence(start: number, x: number, k: number) {
  return Array.from({ length: k }, (_, index) => start + (index + 1) * x);
}

