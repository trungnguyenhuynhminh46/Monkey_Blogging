import React from "react";
import styled from "styled-components";
// Components
import Badge from "./Badge";
import InfoDetail from "./InfoDetail";

const StyledNewestPostItem = styled.div`
  display: flex;
  gap: 20px;
  font-weight: 600;
  .image {
    flex-shrink: 0;
    height: 130px;
    width: 180px;
    object-fit: cover;
    border-radius: 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    font-style: normal;
    font-size: 18px;
    line-height: 24px;

    padding: 12px 0;
  }
`;

const NewestPostItem = () => {
  return (
    <StyledNewestPostItem>
      <img
        src="https://images.unsplash.com/photo-1668015918583-e0dee8585f4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        alt=""
        className="image"
      />
      <div className="content">
        <Badge bg="white" style={{ width: 92 }}>
          Kiến thức
        </Badge>
        <div className="title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </div>
        <InfoDetail color="#6B6B6B" style={{ width: 160 }}></InfoDetail>
      </div>
    </StyledNewestPostItem>
  );
};

export default NewestPostItem;
