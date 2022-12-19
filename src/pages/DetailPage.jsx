import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
// Assets
import { db } from "../firebase/firebase-config";
import { convertDateFormat } from "../utils/date";
import parse from "html-react-parser";
// Components
import HomeLayout from "../layouts/HomeLayout";
import Badge from "../component/Badge";
import InfoDetail from "../component/InfoDetail";
import { RandomPosts } from "./modules/Home";
import SectionHeader from "../component/SectionHeader";
import NotFoundPage from "./NotFoundPage";

const StyledDetailPage = styled.div`
  .post-info {
    display: flex;
  }
  .post-info__img {
    width: 50%;
    height: 466px;
    object-fit: cover;
    border-radius: 40px;
  }
  .post-info__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 50%;
    padding: 32px;
  }
  .post-info__title {
    padding: 16px 0;

    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 48px;

    color: ${(props) => props.theme.secondary};
  }
  .post-info__meta {
    width: 100%;
    display: flex;
    justify-content: space-between;

    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    .view {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }

  .author {
    width: 100%;
    display: flex;
    margin: 40px 0;
    background: #f8f9fa;
    border-radius: 20px;
    overflow: hidden;
    img {
      flex-shrink: 0;
      width: 240px;
      height: 240px;
      border-radius: 50%;
      object-fit: cover;
    }
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      padding: 32px;
      h1 {
        padding-bottom: 20px;

        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 28px;
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;

const DetailPage = () => {
  // Variables, states
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});
  // Effects
  useEffect(() => {
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setPost(posts[0]);
    });

    return () => {
      unsub();
    };
  }, [slug]);
  useEffect(() => {
    if (post?.id) {
      const unsub_author = onSnapshot(
        doc(db, "users", post?.user_id),
        (doc) => {
          setAuthor({ id: doc.id, ...doc.data() });
        }
      );
      const unsub_category = onSnapshot(
        doc(db, "categories", post?.category_id),
        (doc) => {
          setCategory({ id: doc.id, ...doc.data() });
        }
      );
      return () => {
        unsub_author();
        unsub_category();
      };
    }
  }, [post]);
  if (!post?.id) return <NotFoundPage />;
  // console.log(post?.content);
  return (
    <HomeLayout>
      <StyledDetailPage>
        <div className="post-info">
          <img src={post?.image} alt="" className="post-info__img" />
          <div className="post-info__content">
            <Badge to={`/category/${category?.slug}`} bg="#F3EDFF">
              {category?.name}
            </Badge>
            <p className="post-info__title">{post?.title}</p>
            <div className="post-info__meta">
              <InfoDetail
                color="#6B6B6B"
                date={
                  post?.createdAt?.seconds &&
                  convertDateFormat(post?.createdAt?.seconds)
                }
                name={author?.fullName}
              />
              <div className="view">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="num">5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer py-[20px]"></div>
        <div className="entry-content">
          {post?.content && parse(post?.content)}
        </div>
        <div className="author">
          <img src={author?.image} alt="" />
          {author?.id && (
            <div className="author-info">
              <h1>{author.fullName}</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium enim, nemo repellendus quam molestias ad eveniet
                rerum nihil nisi totam maxime eaque dignissimos commodi harum,
                voluptates dolore vero. Optio, incidunt.
              </p>
            </div>
          )}
        </div>
        <SectionHeader color="#23BB86">Bài viết liên quan</SectionHeader>
        <RandomPosts></RandomPosts>
      </StyledDetailPage>
    </HomeLayout>
  );
};

export default DetailPage;
