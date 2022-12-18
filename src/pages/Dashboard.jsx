import React from "react";
// Components
import Heading from "../layouts/DashboardLayout/Heading";

const Dashboard = () => {
  return (
    <div className="flex-1 mb-[40px]">
      <Heading>Dashboard Page</Heading>
      <div className="gallery">
        <div>
          <img src="gallery/1.jpeg" alt="" />
        </div>
        <div className="v-stretch">
          <img src="gallery/2.jpeg" alt="" />
        </div>
        <div className="h-stretch">
          <img src="gallery/3.jpeg" alt="" />
        </div>
        <div>
          <img src="gallery/4.jpeg" alt="" />
        </div>
        <div>
          <img src="gallery/5.jpeg" alt="" />
        </div>
        <div className="v-stretch">
          <img src="gallery/6.jpeg" alt="" />
        </div>
        <div className="big-stretch">
          <img src="gallery/7.jpeg" alt="" />
        </div>
        <div>
          <img src="gallery/8.jpeg" alt="" />
        </div>
        <div className="h-stretch">
          <img src="gallery/9.jpeg" alt="" />
        </div>
        <div>
          <img src="gallery/10.jpeg" alt="" />
        </div>
        <div className="v-stretch">
          <img src="gallery/11.jpeg" alt="" />
        </div>
        <div className="big-stretch">
          <img src="gallery/12.jpeg" alt="" />
        </div>
        <div>
          <img src="gallery/13.jpeg" alt="" />
        </div>
        <div className="h-stretch">
          <img src="gallery/14.jpeg" alt="" />
        </div>
        <div>
          <img src="gallery/15.jpeg" alt="" />
        </div>
        <div>
          <img src="gallery/16.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
