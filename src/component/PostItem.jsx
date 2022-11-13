import React from "react";
import styled from "styled-components";
// Components
import Badge from "./Badge";
import CompoundLink from "./CompoundLink";
import InfoDetail from "./InfoDetail";

const StyledPostitem = styled.div`
  .image {
    width: 100%;
    height: ${(props) => props.image_height};
    object-fit: cover;

    border-radius: 16px;
    margin-bottom: 32px;
  }
`;

const PostItem = ({ image_height = "436px" }) => {
  return (
    <StyledPostitem image_height={image_height}>
      <img
        src="https://images.unsplash.com/photo-1668015918583-e0dee8585f4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        alt=""
        className="image"
      />
      <Badge to="/category/kien-thuc">Kiến thức</Badge>
      <CompoundLink
        to="/post/huong-dan-setup-phong-cuc-chill-cho-nguoi-moi-toan-tap"
        style={{
          fontSize: "22px",
          lineHeight: "28px",
          padding: "16px 0",
          fontWeight: 600,
        }}
      >
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </CompoundLink>
      <InfoDetail color="#6B6B6B" style={{ width: 160 }}></InfoDetail>
    </StyledPostitem>
  );
};

export default PostItem;
