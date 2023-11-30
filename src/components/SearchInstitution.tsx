"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Hero from "./Hero";

type Props = {
  title: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const SearchInstitution = ({ setSelected, title }: Props) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="w-full">
      <div className="max-w-[840px] mx-auto flex items-start sm:px-16 px-6 py-4">
        <label
          htmlFor="Escolha o Título"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <select
          id="titles"
          className="bg-gradient-to-l shadow-xl from-green-200 via-green-400 to-green-600 border px-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          onChange={handleSelectChange}
        >
          <option value={"pre"} defaultValue={"pre"}>
            TESOURO PREFIXADO 2026
          </option>
          <option value="ipca">TESOURO IPCA+ 2029</option>
          <option value="selic">TESOURO SELIC 2026</option>
        </select>
      </div>
      <Hero title={title} />
    </div>
  );
};

export default SearchInstitution;
