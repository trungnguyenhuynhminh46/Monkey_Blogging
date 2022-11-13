import React from "react";
import styled from "styled-components";
// Components
import Badge from "./Badge";
import CompoundLink from "./CompoundLink";
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
        <Badge to="/category/kien-thuc" bg="white">
          Kiến thức
        </Badge>
        <CompoundLink
          to="/post/huong-dan-setup-phong-cuc-chill-cho-nguoi-moi-toan-tap"
          style={{ fontSize: "18px", lineHeight: "24px", padding: "12px 0" }}
        >
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </CompoundLink>
        <InfoDetail color="#6B6B6B" style={{ width: 160 }}></InfoDetail>
      </div>
    </StyledNewestPostItem>
  );
};

export default NewestPostItem;
