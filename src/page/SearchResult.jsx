import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

function SearchResult() {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const searchHandler = async function (e) {
    e.preventDefault();
    if (searchInput.trim().length <= 0) {
      return;
    }
    try {
      setIsLoading(true);
      const req = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}/`
      );

      if (!req.ok) throw new Error("No Result Found");
      const res = await req.json();
      setData(res);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
    setSearchInput("");
  };

  let output;

  if (isLoading) {
    output = <Spinner />;
  }

  if (error) {
    output = <p>{error}</p>;
  }

  if (!isLoading && data) {
    output = (
      <div className="grid grid-flow-row items-center justify-items-center ">
        <h3 className="text-2xl capitalize mb-5 font-semibold">{data?.name}</h3>
        <img
          className="w-28 mb-5"
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data?.id}.svg`}
          alt={data?.name}
        />
        <div className="flex gap-2 items-center self-start justify-self-start">
          <span className="font-medium text-lg capitalize">weight - </span>
          <span className="font-normal">{data?.weight}</span>
          <span className="font-medium text-lg capitalize">height - </span>
          <span>{data?.height}</span>
        </div>
        <div className="flex gap-2 items-center self-start justify-self-start"></div>
        <div className="flex gap-2 items-center self-start justify-self-start">
          <span className="font-medium text-lg capitalize">abilities - </span>
          <span className="flex gap-2">
            {data?.abilities?.map((item, i) => {
              return <span key={i}>{item?.ability?.name}</span>;
            })}
          </span>
        </div>

        <button
          className="border mt-8 font-medium px-5 py-1 border-[#fc9c76] text-sm"
          onClick={() => {
            navigate(`/${data?.id}`);
          }}
        >
          Know more
        </button>
      </div>
    );
  }

  // console.log(data, isLoading, error);

  return (
    <div className="w-[70%] mx-auto flex flex-col items-center gap-16 justify-center mt-20">
      <form onClick={searchHandler} className="w-[500px] flex">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type="text"
          className="border border-[#fea37faf] py-2 px-5 text-lg w-full outline-none placeholder:text-base placeholder:font-thin font-[Outfit] capitalize focus:border-[#fc9c76]"
          placeholder="search with pokemon name"
          onFocus={() => setError(null)}
        />
        <button className="border outline-none  border-[#fea37faf] px-5 capitalize focus:border-[#fc9c76] focus:font-semibold">
          search
        </button>
      </form>

      <div>{output}</div>
    </div>
  );
}

export default SearchResult;
