import React, { useState, useEffect, useRef } from "react";
import ListItem from "../main/ListItem";

function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const targetObserver = useRef();

  const fetchData = async (offSetPage) => {
    try {
      setIsLoading(true);
      const req = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offSetPage}`
      );

      const res = await req.json();
      const data = res?.results;

      const pokemonData = await Promise.all(
        data?.map(async (item) => {
          const req = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${item.name}/`
          );
          const res = await req.json();

          const resObj = { pokemon: item.name, id: res?.id, color: "" };

          return resObj;
        })
      );

      setData((prev) => [...prev, ...pokemonData]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);

    // console.log(isTrue);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // fetchData(page);
          // console.log(entries[0]);
        }
      },
      { threshold: 0 }
    );

    if (targetObserver.current) {
      observer.observe(targetObserver.current);
    }
  }, [targetObserver]);

  let isTrue = false;
  useEffect(() => {
    if (!isTrue) {
      fetchData(page);
      isTrue = true;
    }
  }, []);

  // console.log(isLoading);

  return (
    <div className="w-[80%] m-auto pb-20">
      <ul className="flex justify-center flex-wrap gap-14">
        {data?.map((item, i) => {
          return (
            <ListItem
              key={item.id + "" + i}
              name={item.pokemon}
              id={item.id}
              color={item.color}
            />
          );
        })}
      </ul>
      <div ref={targetObserver}></div>
    </div>
  );
}

export default List;

// const pokemons = await Promise.all(pokemonData);

// setData((prev) => {
//   console.log(prev, "prev");
//   return [...prev, ...pokemons];
// });

// setPage((prev) => {
//   return (prev += 1);
// });

// const colorData = await fetch(
//   `https://pokeapi.co/api/v2/pokemon-color/${res?.id}/`
// );

// if (colorData.ok) {
//   const { name, id } = await colorData.json();
//   resObj.id = id;
//   resObj.color = name;
// }
