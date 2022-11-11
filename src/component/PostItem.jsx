import React from "react";
import styled from "styled-components";
// Components
import Badge from "./Badge";
import InfoDetail from "./InfoDetail";

const StyledPostitem = styled.div`
  .image {
    width: 100%;
    height: ${(props) => props.image_height};
    object-fit: cover;

    border-radius: 16px;
    margin-bottom: 32px;
  }
  .title {
    padding: 16px 0;

    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
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
      <Badge style={{ width: 90 }}>Kiến thức</Badge>
      <p className="title">
        Hướng dẫn cách setup phòng cực chill dành cho người mới
      </p>
      <InfoDetail color="#6B6B6B" style={{ width: 160 }}></InfoDetail>
    </StyledPostitem>
  );
};

export default PostItem;
