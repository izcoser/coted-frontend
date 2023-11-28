"use client";
import { useState } from "react";
import Image from "next/image";
import { MarketProps } from "@/types";
import CustomButton from "./CustomButton";
import { FcApproval } from "react-icons/fc";
import InstitutionContact from "./InstitutionContact";

interface MarketCardProps {
  market: MarketProps;
}

const MarketCard = ({ market }: MarketCardProps) => {
  const {
    exchange_id,
    exchange_name,
    pair,
    base_currency_name,
    adjusted_volume_24h_share,
    quotes,
    trust_score,
    last_updated,
  } = market;

  const formattedDate = new Date(last_updated).toLocaleString();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="market-card group relative shadow-2xl border-[1px] bg-slate-110 ">
      <div className="flex p-4 flex-col">
        <h2 className="market-card__content-title">{exchange_name}</h2>
        <h3 className="market-card__price">${pair}</h3>
        <div className="flex mt-4 flex-row">
          <FcApproval className="mt-2 mr-2" />
          <p className="text-xs font-bold mt-2">
            Ultima Atualizaçao: {formattedDate}
          </p>
        </div>
        <div className="relative h-10 flex justify-end items-end">
          <CustomButton
            title={"Contato"}
            containerStyles="absolute bottom-0 right-0 mt-2 mr-2 w-20 h-10 rounded-full bg-transparent"
            textStyles="text-primary-green text-[12px] font-bold"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <InstitutionContact
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        market={market}
      />
    </div>
  );
};

export default MarketCard;
