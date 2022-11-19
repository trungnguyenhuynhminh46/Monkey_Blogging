import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { format } from "date-fns";
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
  // console.log(data);
  // State
  const [category, setCategory] = useState({});
  const [author, setAuthor] = useState({});
  // Effect
  useEffect(() => {
    const fetchData = async () => {
      // Get category
      const categoryRef = doc(db, "categories", data.category_id);
      const categorySnap = await getDoc(categoryRef);
      setCategory(categorySnap.data());

      // Get author
      const authorRef = doc(db, "users", data.user_id);
      const authorSnap = await getDoc(authorRef);
      setAuthor(authorSnap.data());
    };
    fetchData();
  }, []);
  // Handlers, Functions
  const convertDateFormat = (seconds) => {
    const date = new Date(1000 * seconds);
    const formattedDate = format(date, "MMM d y");
    return formattedDate;
  };
  return (
    <StyledFeaturedPostItem>
      <img src={data?.image} alt="" className="post__bg_img" />
      <div className="post__overlay"></div>
      <div className="post__content">
        <div className="post__info">
          <Badge to={`/category/${category?.slug}`}>{category?.name}</Badge>
          <InfoDetail
            date={convertDateFormat(data?.createdAt.seconds)}
            name={author?.displayName?.split(" ").at(-1)}
            color="#f8f9fa"
          ></InfoDetail>
        </div>
        <CompoundLink
          to={`/to/${data?.slug}`}
          style={{ fontSize: "22px", lineHeight: "28px" }}
        >
          {data.title}
        </CompoundLink>
      </div>
    </StyledFeaturedPostItem>
  );
};

export default FeaturedPostItem;
