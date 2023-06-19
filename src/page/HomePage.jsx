import React from "react";
import { Outlet } from "react-router-dom";
import Filter from "../components/main/Filter";

function HomePage() {
  return (
    <div className="">
      <Filter />
      <main className=" p-10 ml-56 color-[#182C61] ">
        <Outlet />
      </main>
    </div>
  );
}

export default HomePage;
