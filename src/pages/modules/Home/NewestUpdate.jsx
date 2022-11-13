import React from "react";
import styled from "styled-components";
// Components
import SectionHeader from "../../../component/SectionHeader";
import PostItem from "../../../component/PostItem";
import NewestPostItem from "../../../component/NewestPostItem";

const StyledNewestUpdate = styled.div`
  margin-bottom: 52px;
  .newest-list {
    background: #f3edff;
    padding: 0px 18px;
    border-radius: 15px;
  }
  .newest-item {
    padding: 32px 0;
    border-bottom: 1px solid #e0e0e0;
    &:last-child {
      border-bottom: transparent;
    }
  }
`;

const NewestUpdate = () => {
  const newestPosts = [1, 2, 3];
  return (
    <StyledNewestUpdate>
      <SectionHeader>Newest update</SectionHeader>
      <div className="layout">
        <PostItem></PostItem>
        <div className="right">
          <div className="newest-list">
            {newestPosts.map((item, index) => {
              return (
                <div key={index} className="newest-item">
                  <NewestPostItem data={item}></NewestPostItem>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StyledNewestUpdate>
  );
};

export default NewestUpdate;
