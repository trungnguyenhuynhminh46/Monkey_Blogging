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

const StyledPostitem = styled.div`
  .image {
    width: 100%;
    height: ${(props) => props.image_height};
    object-fit: cover;

    border-radius: 16px;
    margin-bottom: 32px;
  }
`;

const PostItem = ({ image_height = "436px", data }) => {
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
    <StyledPostitem image_height={image_height}>
      <img src={data?.image} alt="" className="image" />
      <Badge to={`/category/${category?.slug}`}>{category?.name}</Badge>
      <CompoundLink
        to={`/post/${data?.slug}`}
        style={{
          fontSize: "22px",
          lineHeight: "28px",
          padding: "16px 0",
          fontWeight: 600,
        }}
      >
        {data.title}
      </CompoundLink>
      <InfoDetail
        color="#6B6B6B"
        style={{ width: 160 }}
        date={convertDateFormat(data?.createdAt.seconds)}
        name={author?.displayName?.split(" ").at(-1)}
      ></InfoDetail>
    </StyledPostitem>
  );
};

export default PostItem;
