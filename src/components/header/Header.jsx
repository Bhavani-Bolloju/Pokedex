import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/pokemon.svg";
import logo1 from "../../assets/pokebball.svg";

function Header() {
  return (
    <header className="relative h-20 top-0 left-0 z-[200]">
      <div className="fixed top-0 left-0 h-20 w-full  flex items-center px-32 bg-white border-b-2 border-[#FEA47F] z-[300] ">
        <h1 className="font-['Outfit'] font-bold text-xl flex items-center gap-1 uppercase">
          <img src={logo} alt="pokemon" className="w-12" />
          <span>Pokedex</span>
        </h1>
        <ul className="flex gap-12 justify-center w-full text-base font-medium">
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
