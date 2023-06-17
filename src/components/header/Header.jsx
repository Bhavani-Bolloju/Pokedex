import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="relative h-20 top-0 left-0">
      <div className="fixed top-0 left-0 h-20 w-full bg-orange-300 flex items-center px-32">
        <h1 className="font-bold text-2xl">Pokedex</h1>
        <ul className="flex gap-12 justify-center w-full">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/bookmark">Bookmark</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
