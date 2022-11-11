import React from "react";
import styled from "styled-components";
// Components
import SectionHeader from "../../../component/SectionHeader";
import FeaturedPostItem from "../../../component/FeaturedPostItem";

const StyledFeaturePosts = styled.div``;

const FeaturedPosts = () => {
  const featuredPosts = [1, 2, 3];
  return (
    <StyledFeaturePosts>
      <SectionHeader>Feature</SectionHeader>
      <div className="grid-layout">
        {featuredPosts.map((data, index) => {
          return <FeaturedPostItem key={index} data={data} />;
        })}
      </div>
    </StyledFeaturePosts>
  );
};

export default FeaturedPosts;
