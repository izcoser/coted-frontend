"use client";

import { MarketProps } from "@/types";
import { useState } from "react";

interface OracleTableProps {
  market: MarketProps;
}

const OracleTable = ({ market }: OracleTableProps) => {
  return (
    <div className="flex mx-10 justify-between items-center flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <table className="shadow-lg bg-white">
            <tbody>
              <tr>
                <th className="bg-green-100 border text-left px-8 py-4">
                  Oráculo
                </th>
                <th className="bg-green-100 border text-left px-8 py-4">
                  Preço Unitário
                </th>
                <th className="bg-green-100 border text-left px-8 py-4">
                  Data da Atualizaçao
                </th>
              </tr>
              <tr>
                <td className="border px-8 py-4 font-bold">Oráculo X </td>
                <td className="border px-8 py-4">R$ 900,00 </td>
                <td className="border px-8 py-4">27/11/2023, 15:47:57 </td>
              </tr>
              <tr>
                <td className="border px-8 py-4 font-bold">Oráculo X </td>
                <td className="border px-8 py-4">R$ 900,00 </td>
                <td className="border px-8 py-4">27/11/2023, 15:47:57 </td>
              </tr>
              <tr>
                <td className="border px-8 py-4 font-bold">Oráculo X </td>
                <td className="border px-8 py-4">R$ 900,00 </td>
                <td className="border px-8 py-4">27/11/2023, 15:47:57 </td>
              </tr>
              <tr>
                <td className="border px-8 py-4 font-bold">Oráculo X </td>
                <td className="border px-8 py-4">R$ 900,00 </td>
                <td className="border px-8 py-4">27/11/2023, 15:47:57 </td>
              </tr>
              <tr>
                <td className="border px-8 py-4 font-bold">Oráculo X </td>
                <td className="border px-8 py-4">R$ 900,00 </td>
                <td className="border px-8 py-4">27/11/2023, 15:47:57 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OracleTable;