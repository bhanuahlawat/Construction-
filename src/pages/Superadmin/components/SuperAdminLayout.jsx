import React from "react";
import SuperSidebar from "./Supersidebar";
import SuperNavbar from "./SuperNavbar";
import { Outlet } from "react-router-dom";

const SuperAdminLayout = () => {
  return (
    <div className="flex h-100% bg-gradient-to-br from-slate-50 to-blue-50">
      <SuperSidebar />

      <div className="flex-1 flex flex-col">
        <SuperNavbar />
        <div className="p-8 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
