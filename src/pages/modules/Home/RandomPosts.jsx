import React from "react";
// Components
import PostItem from "../../../component/PostItem";

const RandomPosts = () => {
  const randomPosts = [1, 2, 3, 4];
  return (
    <div className="grid-layout grid-layout--secondary">
      {randomPosts.map((item, index) => {
        return (
          <PostItem key={index} data={item} image_height="200px"></PostItem>
        );
      })}
    </div>
  );
};

export default RandomPosts;
