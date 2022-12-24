import React, { useState } from "react";
import styled from "styled-components";
// Assets
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { postStatus } from "../../../utils/constants";
// Components
import SectionHeader from "../../../component/SectionHeader";
import PostItem from "../../../component/PostItem";
import NewestPostItem from "../../../component/NewestPostItem";
import { useEffect } from "react";

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

  .layout {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  @media screen and (min-width: 1024px) {
    .layout {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 40px;
    }
  }
`;

const NewestUpdate = () => {
  // States
  const [newestPosts, setNewestPosts] = useState([]);
  // Effect
  useEffect(() => {
    (async () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        where("status", "==", postStatus.APPROVED),
        where("hot", "==", false),
        limit(4)
      );
      const querySnap = await getDocs(postsQuery);
      let posts = [];
      querySnap.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setNewestPosts(posts);
    })();
  }, []);
  // Split to first post and other posts
  const [firstPost, ...otherPosts] = newestPosts;
  return (
    <StyledNewestUpdate>
      <SectionHeader>Newest update</SectionHeader>
      <div className="layout">
        {!!firstPost?.id && <PostItem data={firstPost}></PostItem>}

        <div className="right">
          <div className="newest-list">
            {otherPosts?.length > 0 &&
              otherPosts.map((post) => {
                return (
                  <div key={post.id} className="newest-item">
                    <NewestPostItem data={post}></NewestPostItem>
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
