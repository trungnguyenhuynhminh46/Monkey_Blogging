import React from "react";
// Components
import PostItem from "../../../component/PostItem";

const ListOfPosts = ({ posts }) => {
  return (
    <div className="grid-layout grid-layout--secondary">
      {posts.map((post) => {
        return (
          <PostItem key={post.id} data={post} image_height="200px"></PostItem>
        );
      })}
    </div>
  );
};

export default ListOfPosts;
