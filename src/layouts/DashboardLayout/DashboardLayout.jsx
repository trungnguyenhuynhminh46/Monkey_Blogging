import React from "react";
import { Outlet } from "react-router-dom";
// Components
import Header from "./Header";
import Sidebar from "./Sidebar";
// import NotFoundPage from "../../pages/NotFoundPage";

const DashboardLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className="py-10 px-5 flex gap-x-10">
        <div>
          <Sidebar></Sidebar>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
