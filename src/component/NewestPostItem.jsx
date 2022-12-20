import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Assets
import { db } from "../firebase/firebase-config";
import { convertDateFormat } from "../utils/date";
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

const NewestPostItem = ({ data }) => {
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
  return (
    <StyledNewestPostItem>
      <CompoundLink to={`/post/${data?.slug}`}>
        <img src={data?.image} alt="" className="image" />
      </CompoundLink>
      <div className="content">
        <Badge to={`/category/${category?.slug}`} bg="white">
          {category?.name}
        </Badge>
        <CompoundLink
          to={`/post/${data?.slug}`}
          style={{ fontSize: "18px", lineHeight: "24px", padding: "12px 0" }}
        >
          {data?.title}
        </CompoundLink>
        <InfoDetail
          color="#6B6B6B"
          style={{ width: 200 }}
          date={convertDateFormat(data?.createdAt.seconds)}
          name={author?.displayName?.split(" ").at(-1)}
        ></InfoDetail>
      </div>
    </StyledNewestPostItem>
  );
};

export default NewestPostItem;
