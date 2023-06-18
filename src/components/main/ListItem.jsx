import React from "react";

function ListItem({ name, id }) {
  function buttonHandler() {
    console.log("navigate", id);
  }

  return (
    <li className="border-2 p-8 flex flex-col items-center rounded flex-1 min-w-[250px]">
      <div className="text-center font-[Rubik] capitalize font-[500] text-xl mb-6">
        {name}
      </div>
      <img
        className="w-40 h-40"
        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${+id}.svg`}
        alt={name}
      />

      <button
        className="mt-5 text-sm px-3 py-1 bg-[#182b61e3] text-[#e8eaef]  font-normal rounded hover:bg-[#182C61]"
        onClick={buttonHandler}
      >
        View details
      </button>
    </li>
  );
}

export default ListItem;
