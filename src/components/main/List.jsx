import React, { useState, useEffect, useRef } from "react";
import ListItem from "../main/ListItem";
import { useOutletContext } from "react-router-dom";

function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const targetObserver = useRef();

  const filterValue = useOutletContext();
  const itemsPerPage = 16;

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

      setData((prev) => [...prev, ...pokemonData]);
      setPage((prev) => prev + itemsPerPage);
    } catch (error) {
      console.log(error);
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
        threshold: 0.8
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
  }, [page]);

  let isTrue = false;
  useEffect(() => {
    if (!isTrue) {
      fetchData(page);
      isTrue = true;
    }
  }, []);

  let finalData = data;

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
      <div className="min-h-screen pb-20 flex flex-col justify-between">
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

          {finalData.length <= 0 && (
            <p className="capitalize text-xl font-medium">No data found</p>
          )}
        </ul>
      </div>
      <div ref={targetObserver}></div>
    </div>
  );
}

export default List;
