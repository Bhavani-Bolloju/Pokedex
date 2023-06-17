import React from "react";

function ListItem({ name, id }) {
  // console.log(name);
  return (
    <div>
      <div>{name}</div>
      <img
        className="w-40 h-40"
        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
    </div>
  );
}

export default ListItem;
