import React, { useState, useEffect } from "react";
// Assets
import { getAllPosts } from "../../../services/posts";
// Components
import PostItem from "../../../component/PostItem";
import SectionHeader from "../../../component/SectionHeader";

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
