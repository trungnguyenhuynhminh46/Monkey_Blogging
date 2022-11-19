import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, query, where } from "firebase/firestore";
// Assets
import { db } from "../../../firebase/firebase-config";
// Components
import SectionHeader from "../../../component/SectionHeader";
import FeaturedPostItem from "../../../component/FeaturedPostItem";

const StyledFeaturePosts = styled.div``;

const FeaturedPosts = () => {
  // States
  const [featuredPosts, setFeaturedPosts] = useState([]);
  // Effect
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("status", "==", 1),
        where("hot", "==", true)
      );
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setFeaturedPosts((prev) => {
          return [...prev, { id: doc.id, ...doc.data() }];
        });
      });
    };
    fetchPosts();
  }, []);
  return (
    <StyledFeaturePosts>
      <SectionHeader>Feature</SectionHeader>
      <div className="grid-layout">
        {featuredPosts.map((data) => {
          return <FeaturedPostItem key={data.id} data={data} />;
        })}
      </div>
    </StyledFeaturePosts>
  );
};

export default FeaturedPosts;
