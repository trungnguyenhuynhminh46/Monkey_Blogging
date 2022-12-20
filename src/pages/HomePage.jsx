import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Assets
import { getAllPosts } from "../services/posts";
// Components
import HomeLayout from "../layouts/HomeLayout";
import SectionHeader from "../component/SectionHeader";
// Modules
import {
  HomeBanner,
  FeaturedPosts,
  NewestUpdate,
  ListOfPosts,
} from "./modules/Home";

const HomePage = () => {
  // States
  const [randomPosts, setRandomPosts] = useState([]);
  // Effect
  useEffect(() => {
    (async () => {
      const posts = await getAllPosts(1);
      const shuffled = posts.sort(() => 0.5 - Math.random());
      setRandomPosts(shuffled.slice(0, 8));
    })();
  }, []);
  return (
    <HomeLayout>
      <HomeBanner></HomeBanner>
      <FeaturedPosts></FeaturedPosts>
      <NewestUpdate></NewestUpdate>
      <SectionHeader>See other posts</SectionHeader>
      <ListOfPosts posts={randomPosts}></ListOfPosts>
    </HomeLayout>
  );
};

export default HomePage;
