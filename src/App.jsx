import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./page/HomePage";
import DetailsPage from "./page/DetailsPage";
import SearchResult from "./page/SearchResult";
import BookmarksPage from "./page/BookmarksPage";
import List from "./components/main/List";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<List />}></Route>
        </Route>
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/:id" element={<DetailsPage />} />
        <Route path="/bookmark" element={<BookmarksPage />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </div>
  );
}

export default App;

/*


const [data, setData] = useState(null);

  useEffect(() => {
    let isTrue = true;

    const fetchData = async function () {
      const req = await fetch("https://pokeapi.co/api/v2/pokemon");

      const res = await req.json();
      const data = res?.results;

      const pokemonData = data?.map(async (item) => {
        const req = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${item.name}/`
        );
        const res = await req.json();

        const resObj = { pokemon: item.name, id: res?.id, color: "" };

        const colorData = await fetch(
          `https://pokeapi.co/api/v2/pokemon-color/${res?.id}/`
        );

        if (colorData.ok) {
          const { name, id } = await colorData.json();
          resObj.id = id;
          resObj.color = name;
        }

        return resObj;
      });

      const pokemons = await Promise.all(pokemonData);
      // if (isTrue) {
      setData(pokemons);
      // }
    };

    fetchData();

    () => {
      isTrue = false;
    };
  }, []);

  // console.log(data);

  return (
    <div>
      {data?.map((item) => {
        return <ListItem key={item.id} name={item.pokemon} id={item.id} />;
      })}
    </div>
  );


*/
