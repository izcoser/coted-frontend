"use client";

import { ReportArray, ReportProps } from "@/types";
import { useState } from "react";

type Props = {
  reports: ReportProps[];
  tokenName: string;
};

const OracleTable = ({ reports, tokenName }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const view = expanded ? reports : reports.slice(0, 10);

  return (
    <>
      <div className="flex mx-4 sm:mx-10 justify-between items-center flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <table className="shadow-lg bg-white max-h-[100px] w-full sm:w-auto">
              <thead className="hidden sm:table-header-group">
                <tr>
                  <th className="bg-green-100 border text-left px-4 sm:px-8 py-2 sm:py-4 ">
                    Oráculo
                  </th>
                  <th className="bg-green-100 border text-left px-4 sm:px-8 py-2 sm:py-4">
                    Título
                  </th>
                  <th className="bg-green-100 border text-left px-4 sm:px-8 py-2 sm:py-4">
                    Preço Unitário
                  </th>
                  <th className="bg-green-100 border text-left px-4 sm:px-8 py-2 sm:py-4">
                    Data da Atualização
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* @ts-ignore */}
                {view.toReversed().map((r, i) => (
                  <tr key={i}>
                    <td className="border px-4 sm:px-8 py-2 sm:py-4 font-bold text-sm sm:text-base font-bold ">
                      <span className="mr-1">{addressToName(r.by)} -</span>
                      <a
                        className="text-blue-600"
                        target="_blank"
                        href={`https://sepolia.etherscan.io/address/${r.by}`}
                      >
                        {minifyAddress(r.by)}
                      </a>
                    </td>
                    <td className="border px-4 sm:px-8 py-2 sm:py-4 font-bold text-sm sm:text-base font-bold">{tokenName}</td>
                    <td className="border px-4 sm:px-8 py-2 sm:py-4 font-bold text-sm sm:text-base">R$ {r.unitPrice}</td>
                    <td className="border px-4 sm:px-8 py-2 sm:py-4 font-bold text-sm sm:text-base">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setExpanded(!expanded)}
              className="my-2 mx-auto w-full"
            >
              {expanded ? "Colapsar" : "Ver mais"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const addressToName = (address: string): string => {
  switch (address.slice(0, 3)) {
    case "0xd":
      return "Oráculo 1";
    case "0xA":
      return "Oráculo 2";
    case "0x1":
      return "Oráculo 3";
  }
  return "Unknown";
};

const minifyAddress = (address: string): string => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export default OracleTable;
