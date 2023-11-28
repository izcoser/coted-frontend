import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
}

export interface InstitutionProps {
  institution?: string;
  setInstitution: (institution: string) => void;
}

export interface MarketProps {
  exchange_id: string;
  exchange_name: string;
  pair: string;
  base_currency_id?: string;
  base_currency_name: string;
  quote_currency_id?: string;
  quote_currency_name?: string;
  market_url?: URL;
  category?: string;
  fee_type?: string;
  outlier?: false;
  adjusted_volume_24h_share: number;
  trust_score: string;
  last_updated: Date;
  quotes?: {
    USD: {
      price: number;
      volume_24h: number;
    };
  };
}

export interface FilterProps {
  institution: string;
  limit: number;
}

export type ReportProps = {
  unitPrice: number;
  by: string;
  timestamp: number;
};

export type ReportArray = {
  reports: Array<ReportProps>;
};