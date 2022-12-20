import React, { useState, useEffect } from "react";
// Assets
import { getAllPosts } from "../../../services/posts";
// Components
import PostItem from "../../../component/PostItem";
import SectionHeader from "../../../component/SectionHeader";

const RandomPosts = () => {
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
    <>
      <SectionHeader>See other posts</SectionHeader>
      <div className="grid-layout grid-layout--secondary">
        {randomPosts.map((post) => {
          return (
            <PostItem key={post.id} data={post} image_height="200px"></PostItem>
          );
        })}
      </div>
    </>
  );
};

export default RandomPosts;
