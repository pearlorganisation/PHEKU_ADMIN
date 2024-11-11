import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const LayoutComponent = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutComponent;
