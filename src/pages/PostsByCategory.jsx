import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
// Assets
import { db } from "../firebase/firebase-config";
// Components
import HomeLayout from "../layouts/HomeLayout";
import SectionHeader from "../component/SectionHeader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { ListOfPosts } from "./modules/Home";

const PostsByCategory = () => {
  // States
  const { slug } = useParams();
  const [postsByCategoryIsLoading, setPostsByCategoryIsLoading] =
    useState(true);
  const [category, setCategory] = useState(undefined);
  const [postsByCategory, setPostsByCategory] = useState([]);
  // Effect
  useEffect(() => {
    setPostsByCategoryIsLoading(true);
    setTimeout(() => {
      setPostsByCategoryIsLoading(false);
    }, 1000);
  }, []);
  // Get category
  useEffect(() => {
    if (!!slug && slug.length > 0) {
      (async () => {
        const catQuery = query(
          collection(db, "categories"),
          where("slug", "==", slug)
        );
        const querySnap = await getDocs(catQuery);
        let categoryBySlug = [];
        querySnap.forEach((doc) => {
          categoryBySlug.push({ id: doc.id, ...doc.data() });
        });
        setCategory(categoryBySlug[0]);
      })();
    }
  }, [slug]);
  // Get posts
  useEffect(() => {
    if (!!category?.id) {
      (async () => {
        const catID = category.id;
        const postsQuery = query(
          collection(db, "posts"),
          where("category_id", "==", catID)
        );
        const querySnap = await getDocs(postsQuery);
        let postsByCategory = [];
        querySnap.forEach((doc) => {
          postsByCategory.push({ id: doc.id, ...doc.data() });
        });
        setPostsByCategory(postsByCategory);
      })();
    }
  }, [category]);
  return (
    <>
      {postsByCategoryIsLoading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <ClimbingBoxLoader
            color="#36d7b7"
            loading={postsByCategoryIsLoading}
            size={20}
          />
        </div>
      ) : (
        <>
          {category?.id && postsByCategory.length > 0 ? (
            <HomeLayout>
              <SectionHeader>Posts by category</SectionHeader>
              <ListOfPosts posts={postsByCategory}></ListOfPosts>
            </HomeLayout>
          ) : (
            <HomeLayout>
              <SectionHeader>
                {`Sorry but no post with category ${slug} is found`}
              </SectionHeader>
            </HomeLayout>
          )}
        </>
      )}
    </>
  );
};

export default PostsByCategory;
