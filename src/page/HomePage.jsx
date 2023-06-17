import React from "react";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="relative left-0 top-0 w-40 h-full bg-slate-100">
        <div className="fixed  w-40 left-0 h-full bg-slate-500">filter</div>
      </div>
      <div className="bg-green-300 h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
