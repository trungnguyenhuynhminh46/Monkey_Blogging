import React from "react";
import styled from "styled-components";
// Assets
// Components
import HomeLayout from "../layouts/HomeLayout";
// Modules
import {
  HomeBanner,
  FeaturedPosts,
  NewestUpdate,
  RandomPosts,
} from "./modules/Home";

const HomePage = () => {
  return (
    <HomeLayout>
      <HomeBanner></HomeBanner>
      <FeaturedPosts></FeaturedPosts>
      <NewestUpdate></NewestUpdate>
      <RandomPosts></RandomPosts>
    </HomeLayout>
  );
};

export default HomePage;
