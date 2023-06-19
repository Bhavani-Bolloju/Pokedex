import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Filter from "../components/main/Filter";

function HomePage() {
  const [filterValue, setFilterValue] = useState({
    category: "",
    subCategory: ""
  });

  const filterHandler = function (value) {
    setFilterValue(value);
  };

  return (
    <div className="">
      <Filter onFilter={filterHandler} />
      <main className=" p-10 ml-56 color-[#182C61] ">
        <Outlet context={filterValue} />
      </main>
    </div>
  );
}

export default HomePage;
