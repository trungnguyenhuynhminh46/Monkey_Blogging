import React from "react";
import styled from "styled-components";
// Components
import Badge from "./Badge";
import InfoDetail from "../component/InfoDetail";
import CompoundLink from "./CompoundLink";

const StyledFeaturedPostItem = styled.div`
  position: relative;

  width: 100%;
  height: 270px;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #f8f9fa;

  .post__bg_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
  .post__overlay {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.75);
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
  .post__content {
    position: absolute;
    inset: 0;
    padding: 20px;
    border-radius: 16px;
  }
  .post__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
`;

const FeaturedPostItem = ({ data }) => {
  return (
    <StyledFeaturedPostItem>
      <img
        src="https://images.unsplash.com/photo-1661961110144-12ac85918e40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
        className="post__bg_img"
      />
      <div className="post__overlay"></div>
      <div className="post__content">
        <div className="post__info">
          <Badge to="/category/kien-thuc">Kiến thức</Badge>
          <InfoDetail date="Mar 24" name="Anna Le" color="#f8f9fa"></InfoDetail>
        </div>
        <CompoundLink
          to="/post/huong-dan-setup-phong-cuc-chill-cho-nguoi-moi-toan-tap"
          style={{ fontSize: "22px", lineHeight: "28px" }}
        >
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </CompoundLink>
      </div>
    </StyledFeaturedPostItem>
  );
};

export default FeaturedPostItem;
