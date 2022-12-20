import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Assets
import { getAllPosts } from "../services/posts";
import { getAllCategories, getCategoryByID } from "../services/categories";
import { getUserByID } from "../services/users";
import { debounce } from "lodash";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Pagination from "../component/Pagination";
import { Dropdown } from "../component/Dropdown";
import Button from "../component/Button";
import Posts from "./modules/Dashboard/Posts";

const POST_PER_PAGES = 2;
const PostsPage = () => {
  const { userInfo } = useAuth();
  // console.log(userInfo);
  // States
  const [user, setUser] = useState(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [categoriesByUserID, setCategoriesByUserID] = useState({});
  const [authorsByUserID, setAuthorByUserID] = useState({});
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Effect
  // Fetching Datas
  useEffect(() => {
    if (userInfo?.uid) {
      (async () => {
        const uid = userInfo.uid;
        const docSnap = await getDoc(doc(db, "users", uid));
        setUser({ id: docSnap.id, ...docSnap.data() });
      })();
    }
  }, [userInfo]);
  useEffect(() => {
    const fetchCategories = async () => {
      let catsList = await getAllCategories(1);
      setCategories(catsList);
    };
    const fetchPosts = async () => {
      let postsList = await getAllPosts(null, searchInput);
      postsList.forEach(async (post) => {
        const category = await getCategoryByID(post.category_id);
        const author = await getUserByID(post.user_id);
        setCategoriesByUserID((prev) => {
          return { ...prev, [post.id]: category };
        });
        setAuthorByUserID((prev) => {
          return { ...prev, [post.id]: author };
        });
      });
      setPosts(postsList);
    };
    fetchCategories();
    fetchPosts();
    setCurrentPage(1);
  }, [searchInput]);
  // Handlers, functions
  const handleInputSeach = debounce((e) => {
    setSearchInput(e.target.value);
  }, 600);
  // Paginate
  const indexOfLastPost = currentPage * POST_PER_PAGES - 1;
  const indexOfFirstPost = indexOfLastPost - POST_PER_PAGES + 1;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost + 1);
  return (
    <div className="flex-1 mb-[40px]">
      <Heading>Manage Posts</Heading>
      <div className="flex justify-between items-center px-10">
        <Button
          style={{ width: 192 }}
          fontSize={"18px"}
          fontWeight={600}
          padding={"18px 0"}
          to="/dashboard/add-post"
        >
          Add post
        </Button>
        <div className="flex-1 flex justify-end items-stretch gap-x-5">
          <Dropdown style={{ maxWidth: 300 }} selectionBG="white">
            {categories.map((category) => {
              return (
                <Dropdown.Option key={category.id}>
                  {category.name}
                </Dropdown.Option>
              );
            })}
          </Dropdown>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search category..."
            className="p-4 w-full max-w-[300px] outline-none border border-gray-200 rounded-lg"
            defaultValue={searchInput}
            onChange={handleInputSeach}
          />
        </div>
      </div>
      {!!user?.id && Array.isArray(currentPosts) && currentPosts.length > 0 && (
        <Posts
          currentUser={user}
          posts={currentPosts}
          categoriesByUserID={categoriesByUserID}
          authorsByUserID={authorsByUserID}
        ></Posts>
      )}
      {posts.length > POST_PER_PAGES && (
        <div className="mt-10 flex justify-center">
          <Pagination
            itemsPerPage={POST_PER_PAGES}
            totalItems={posts.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
