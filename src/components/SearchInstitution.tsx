"use client";
import React, { ChangeEvent, useState } from "react";
import Hero from "./Hero";

const SearchInstitution = () => {
  const [selectedOption, setSelectedOption] = useState(
    "TESOURO PREFIXADO 2026"
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOptionText = event.target.options[selectedIndex].text;
    setSelectedOption(selectedOptionText);
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
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option defaultValue={"PRE2026"}>Escolha um Título</option>
          <option value="PRE2026">TESOURO PREFIXADO 2026</option>
          <option value="PRE2029">TESOURO PREFIXADO 2029</option>
          <option value="PRE2033cjuros">
            TESOURO PREFIXADO c/ juros semestrais 2033
          </option>
          <option value="SEL2026">TESOURO SELIC 2026</option>
          <option value="SEL2029">TESOURO SELIC 2029</option>
          <option value="IPCA2029">TESOURO IPCA+ 2029</option>
          <option value="IPCA2035">TESOURO IPCA+ 2035</option>
          <option value="IPCA2045">TESOURO IPCA+ 2045</option>
          <option value="IPCA2032cjuros">
            TESOURO IPCA+ c/ juros semestrais 2032
          </option>
          <option value="IPCA2040cjuros">
            TESOURO IPCA+ c/ juros semestrais 2040
          </option>
          <option value="IPCA2055cjuros">
            TESOURO IPCA+ c/ juros semestrais 2055
          </option>
        </select>
      </div>
      <Hero title={selectedOption} />
    </div>
  );
};

export default SearchInstitution;