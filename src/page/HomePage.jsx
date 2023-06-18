import React from "react";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="relative w-56 bg-red-400   ">
        <div className="fixed  w-56 left-0 h-full bg-[#182C61]  text-[#e8eaef] z-50">
          filter
        </div>
      </div>
      <main className="h-[100vh] p-10 ml-56 color-[#182C61]">
        <Outlet />
      </main>
    </div>
  );
}

export default HomePage;
