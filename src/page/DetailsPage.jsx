import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import Spinner from "../components/ui/Spinner";

function DetailsPage() {
  const params = useParams();

  const { data, isLoading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params.id}`
  );

  // console.log(data, isLoading, error);
  const {
    data: speciesData,
    isLoading: isSpeciesDataLoading,
    error: speciesDataError
  } = useFetch(`https://pokeapi.co/api/v2/nature/${params.id}`);

  const storedBookmarks = localStorage.getItem("bookmarks");

  let list = [];
  if (storedBookmarks) {
    list = JSON.parse(storedBookmarks);
  }
  const [bookmarkList, setBookMarkList] = useState(list);

  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    if (storedBookmarks) {
      const list = JSON.parse(storedBookmarks);
      const includes = list.some((item) => item.id == data?.id);
      setBookmark(includes);
    }
  }, [data?.id]);

  useEffect(() => {
    if (bookmarkList.length > 0) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    }
  }, [bookmark]);

  const addBookmarkHandler = function () {
    setBookmark((prev) => !prev);

    const item = { id: data?.id, name: data?.name };

    const includes = bookmarkList?.some((item) => item.id === data?.id);

    if (includes) {
      setBookMarkList((prev) => {
        const list = prev.filter((item) => item.id !== data?.id);
        return list;
      });
    } else {
      setBookMarkList((prev) => {
        return [...prev, item];
      });
    }
  };

  return (
    <div className="max-w-[600px] mx-auto mt-10 bg-[#FFECE4] p-12 rounded shadow-md min-h-[600px]">
      {data && (
        <div className="bg-white p-10 grid grid-flow-row justify-center py-15 relative gap-4 rounded shadow-sm">
          <div className="text-center uppercase mb-4 font-semibold text-[#182C61] text-2xl font-[Rubik]">
            {data?.name}
          </div>
          <img
            className="w-40 h-40 mb-5"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data?.id}.svg`}
            alt={data?.name}
          />

          <div className="flex flex-col capitalize">
            <span className="font-semibold text-xl">Color </span>
            <span>{data?.color?.name}</span>
          </div>
          <div className="flex flex-col capitalize">
            <span className="font-semibold text-xl">growth rate</span>
            <span>{data?.["growth_rate"]?.name}</span>
          </div>
          <div className="flex flex-col capitalize">
            <span className="font-semibold text-xl">shape</span>
            <span>{data?.shape?.name}</span>
          </div>
          <div className="flex flex-col capitalize">
            <span className="font-semibold text-xl ">habitat: </span>
            <span className=" font-medium ">{data?.habitat?.name}</span>
          </div>

          <div onClick={addBookmarkHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-5 h-5 absolute right-5 top-5 text-red-500  hover:cursor-pointer ${
                bookmark ? "fill-red-400" : ""
              }`}
              //
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner></Spinner>
        </div>
      )}
      {error && (
        <div className="flex h-full w-full items-center justify-center capitalize text-red-400 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
