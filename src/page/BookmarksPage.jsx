import React, { useState } from "react";
import { Link } from "react-router-dom";

function BookmarksPage() {
  const storedBookmarks = localStorage.getItem("bookmarks");

  let list = [];
  if (storedBookmarks) {
    list = JSON.parse(storedBookmarks);
  }

  const [bookmarks, setBookmarks] = useState(list);

  const addBookmarkHandler = function (id) {
    setBookmarks((prev) => {
      const filterList = prev.filter((item) => item.id !== +id);
      localStorage.setItem("bookmarks", JSON.stringify(filterList));
      return filterList;
    });
  };

  return (
    <div className="max-w-[800px] mx-auto mt-20 ">
      {bookmarks.length > 0 ? (
        <div className="shadow-md py-5 px-10">
          {bookmarks.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center p-5 gap-8 ${
                i < bookmarks.length - 1 ? "border-b-2 " : ""
              }`}
            >
              <img
                className="w-14 h-14"
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`}
                alt={item.name}
              />
              <Link
                to={`/${item.id}`}
                className="capitalize text-xl border-b border-transparent font-medium hover:border-b hover:border-red-300"
              >
                {item.name}
              </Link>
              <button
                onClick={() => {
                  addBookmarkHandler(item.id);
                }}
                className="ml-auto capitalize border self-end px-2 border-[#182C61]"
              >
                remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center font-semibold text-2xl capitalize">
          no bookmarks found :)
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
