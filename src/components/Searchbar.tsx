"use client";

import { useState } from "react";
import SearchInstitution from "./SearchInstitution";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-5 z-10 ${otherClasses}`}>
    <IoSearch />
  </button>
);

const Searchbar = () => {
  const [institution, setInstitution] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (institution === "") {
      return alert("Preencha o campo de busca");
    }

    updateSearchParams(institution.toLowerCase());
  };

  const updateSearchParams = (institution: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (institution) {
      searchParams.set("institution", institution);
    } else {
      searchParams.delete("institution");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <div className="line-chart-container">
      <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
          <SearchInstitution
            institution={institution}
            setInstitution={setInstitution}
          />
          <SearchButton otherClasses="" />
        </div>
        <div className="searchbar__item"></div>
      </form>
    </div>
  );
};

export default Searchbar;
