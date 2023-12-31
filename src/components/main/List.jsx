import React, { useState, useEffect, useRef } from "react";
import ListItem from "../main/ListItem";
import { useOutletContext } from "react-router-dom";
import Spinner from "../ui/Spinner";

function List() {
  const [datalist, setDataList] = useState([]);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const targetObserver = useRef();

  const filterValue = useOutletContext();
  const itemsPerPage = 20;

  const fetchData = async (pageNum) => {
    try {
      setIsLoading(true);
      const req = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${pageNum}`
      );

      const res = await req.json();

      const data = res?.results;

      const pokemon = await Promise.all(
        data?.map(async (item) => {
          const req = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${item.name}/`
          );
          if (!req.ok) throw new Error("failed to fetch data");

          const res = await req.json();

          const abilites = res?.abilities?.map((item) => item?.ability?.name);

          const resObj = {
            pokemon: item.name,
            id: res?.id,
            species: res?.species?.name,
            abilities: abilites
          };
          return resObj;
        })
      );

      const pokemonSpecies = await Promise.all(
        data?.map(async (item) => {
          const req = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${item.name}/`
          );

          if (!req.ok) throw new Error("failed to fetch data");
          const res = await req.json();

          const resObj = {
            id: res?.id,
            color: res?.color?.name,
            habitat: res?.habitat?.name,
            shape: res?.shape?.name,
            growthRate: res?.["growth_rate"]?.name
          };
          return resObj;
        })
      );

      const pokemonData = [];

      pokemon.forEach((item, i) => {
        const id = item.id;
        const filter = pokemonSpecies.filter((data) => data.id === id);
        pokemonData.push({ ...item, ...filter[0] });
      });

      setDataList([...datalist, ...pokemonData]);
      setPage((prev) => prev + itemsPerPage);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(page);
        }
      },
      {
        root: null,
        threshold: 1
      }
    );

    if (targetObserver.current) {
      observer.observe(targetObserver.current);
    }
    return () => {
      if (targetObserver.current) {
        observer.unobserve(targetObserver.current);
      }
    };
  }, [page, targetObserver]);

  useEffect(() => {
    fetchData(page);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filterValue]);

  // console.log(datalist);

  let finalData = datalist;

  if (filterValue.category !== "") {
    const { category, subCategory } = filterValue;

    const filterData = finalData.filter((item) => {
      const value = item[category];

      if (category == "abilities") {
        return value.includes(subCategory);
      }
      return value == subCategory;
    });
    finalData = filterData;
  }

  return (
    <div className="w-[80%] m-auto ">
      {datalist && (
        <div>
          <div className="min-h-screen mb-20 ">
            <ul className="flex justify-center flex-wrap gap-14 min-h-screen">
              {finalData?.map((item, i) => {
                return (
                  <ListItem
                    key={item.id + "" + i}
                    name={item.pokemon}
                    id={item.id}
                    color={item.color}
                  />
                );
              })}

              {finalData.length <= 0 && !isLoading && (
                <p className="capitalize text-xl font-medium">No data found</p>
              )}
            </ul>
          </div>
          <div ref={targetObserver}></div>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="flex items-center font-medium capitalize text-red-300 justify-center ">
          {error}
        </div>
      )}
    </div>
  );
}

export default List;
