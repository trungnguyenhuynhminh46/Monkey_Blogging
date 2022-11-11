import React from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
// Assets
import { auth } from "../firebase/firebase-config";
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
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign out
      </button>
    </HomeLayout>
  );
};

export default HomePage;
