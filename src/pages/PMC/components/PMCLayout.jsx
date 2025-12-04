import React from "react";
import { Outlet } from "react-router-dom";
import PMCSidebar from "./PmcSidebar";
import PMCNavbar from "./PMCNavbar";

const PMCLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PMCSidebar />

      <div className="flex-1 flex flex-col">
        <PMCNavbar />
        <div className="p-8 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PMCLayout;
