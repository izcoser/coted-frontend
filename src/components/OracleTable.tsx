import { ReportProps } from "@/types";

type Props = {
  reports: ReportProps[];
};

const OracleTable = ({ reports }: Props) => {
  return (
    <div className="flex mx-4 sm:mx-10 justify-between items-center flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <table className="shadow-lg bg-white w-full sm:w-auto">
            <thead className="hidden sm:table-header-group">
              <tr>
                <th className="bg-green-100 border text-left px-4 sm:px-8 py-2 sm:py-4">
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
              {reports.map((r, i) => (
                <tr key={i}>
                  <td className="border px-4 sm:px-8 py-2 sm:py-4 font-bold text-sm sm:text-base">
                    <span className="mr-1">{addressToName(r.by)} -</span>
                    <a
                      className="text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://sepolia.etherscan.io/address/${r.by}`}
                    >
                      {minifyAddress(r.by)}
                    </a>
                  </td>
                  <td className="border px-4 sm:px-8 py-2 sm:py-4 font-bold text-sm sm:text-base">
                    Tesouro Prefixado
                  </td>
                  <td className="border px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base">
                    R$ {r.unitPrice}
                  </td>
                  <td className="border px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base">
                    {r.timestamp}
                  </td>
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
