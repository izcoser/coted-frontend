"use client";

import { ReportArray, ReportProps } from "@/types";

type Props = {
  reports: ReportProps[];
};

const OracleTable = ({ reports }: Props) => {
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
                  Título
                </th>
                <th className="bg-green-100 border text-left px-8 py-4">
                  Preço Unitário
                </th>
                <th className="bg-green-100 border text-left px-8 py-4">
                  Data da Atualizaçao
                </th>
              </tr>
              {reports.map((r, i) => (
                <tr key={i}>
                  <td className="border px-8 py-4 font-bold">
                    <a className="text-blue-600" target="_blank" href={`https://sepolia.etherscan.io/address/${r.by}`}>
                      {minifyAddress(r.by)}
                    </a>
                  </td>
                  <td className="border px-8 py-4 font-bold">
                    Tesouro Prefixado
                  </td>
                  <td className="border px-8 py-4">R$ {r.unitPrice}</td>
                  <td className="border px-8 py-4">{r.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const addressToName = (address: string): string => {
  return "Oráculo " + address.charAt(-1);
};

const minifyAddress = (address: string): string => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export default OracleTable;
