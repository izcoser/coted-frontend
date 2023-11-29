import CustomButton from "./CustomButton";
import { FcApproval } from "react-icons/fc";
import InstitutionContact from "./InstitutionContact";
import { useState } from "react";
import { ReportProps } from "@/types";

type Props = {
  reports: ReportProps[];
};

const MarketCard = ({ reports }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayedReports = reports.slice(0, 3);
  const [selectedMarket, setSelectedMarket] = useState<ReportProps | null>(
    null
  );

  return (
    <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayedReports.map((r, i) => {
        const marketName = addressToName(r.by);
        return (
          <div
            key={i}
            className="group rounded-xl relative shadow-2xl border-[1px] bg-slate-110 p-4"
          >
            <div className="flex flex-col">
              <h2 className="market-card__content-title">{marketName}</h2>
              <h3 className="market-card__price">R$ {r.unitPrice}</h3>
              <div className="flex mt-4 flex-row">
                <FcApproval className="mt-2 mr-2" />
                <p className="text-xs font-bold mt-2">
                  Última Atualização: {r.timestamp}
                </p>
              </div>
              <a
                className="text-blue-600 text-sm mt-2 font-bold"
                target="_blank"
                href={`https://sepolia.etherscan.io/address/${r.by}`}
              >
                {minifyAddress(r.by)}
              </a>
              <div className="relative h-10 flex justify-end items-end">
                <CustomButton
                  title={"Contato"}
                  containerStyles="absolute bottom-0 right-0 mt-2 mr-2 w-20 h-10 rounded-full bg-transparent"
                  textStyles="text-primary-green text-[12px] font-bold"
                  handleClick={() => {
                    setSelectedMarket(r);
                    setIsOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <InstitutionContact
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        selectedMarket={selectedMarket}
      />
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

export default MarketCard;
