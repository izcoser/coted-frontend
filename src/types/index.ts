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

export interface FilterProps {
  institution: string;
  limit: number;
}

export type ReportProps = {
  unitPrice: number;
  by: string;
  timestamp: number;
  date?: string;
};

export type ReportArray = {
  reports: Array<ReportProps>;
};