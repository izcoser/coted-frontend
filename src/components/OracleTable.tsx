"use client";

import { MarketProps } from "@/types";
import { useState } from "react";

interface OracleTableProps {
  market: MarketProps;
}

const OracleTable = ({ market }: OracleTableProps) => {
  const { exchange_id, exchange_name, quotes, trust_score, last_updated } =
    market;

  const usdQuote = quotes.USD;
  const formattedDate = new Date(last_updated).toLocaleString();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex mx-10 justify-between items-center flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Oráculo
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Última resposta
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="border-b dark:border-neutral-500"
                  key={exchange_id}
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {exchange_name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {usdQuote.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {formattedDate}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{trust_score}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OracleTable;
