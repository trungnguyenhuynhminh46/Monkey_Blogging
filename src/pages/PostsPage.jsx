import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// Assets
import { db } from "../firebase/firebase-config";
import { getAllPosts } from "../services/posts";
import { getAllCategories, getCategoryByID } from "../services/categories";
import { getUserByID } from "../services/users";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Table from "../component/Table";
import Pagination from "../component/Pagination";
import Icons from "../component/Icons";
import { Dropdown } from "../component/Dropdown";
import Button from "../component/Button";
import Swal from "sweetalert2";
import Badge from "../component/Badge";

const StyledButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  border-radius: 4px;
  border: 1px solid rgb(229 231 235);
  cursor: pointer;
`;

const PostsPage = () => {
  const status = {
    1: "Approved",
    2: "Pending",
    3: "Rejected",
  };
  // States
  const [categoriesByUserID, setCategoriesByUserID] = useState({});
  const [authorsByUserID, setAuthorByUserID] = useState({});
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  // Effect
  // Fetching Datas
  useEffect(() => {
    const fetchCategories = async () => {
      let catsList = await getAllCategories(1);
      setCategories(catsList);
    };
    const fetchPosts = async () => {
      let postsList = await getAllPosts();
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
  }, []);
  useEffect(() => {
    console.log(posts[0]?.cat);
  }, [posts]);
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
        <div className="flex-1 flex justify-end items-center gap-x-5">
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
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!!posts &&
            posts.map((post, index) => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <div className="flex gap-4">
                      <img
                        src={post.image}
                        alt=""
                        className="w-16 h-auto rounded"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-semibold">{post.title}</h1>
                        <span>Date: 25 Oct 2021</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">
                      {categoriesByUserID[post.id]?.name}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-500">
                      {authorsByUserID[post.id]?.displayName}
                    </span>
                  </td>
                  <td>
                    <Badge>{status[post.status]}</Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3 text-gray-500">
                      <StyledButton>
                        <Icons.IconEye iconClassName="w-5 h-5" />
                      </StyledButton>
                      <StyledButton>
                        <Icons.IconPencilSquare iconClassName="w-5 h-5" />
                      </StyledButton>
                      <StyledButton
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await deleteDoc(doc(db, "posts", post.id));
                              document.location.reload(true);
                            }
                          });
                        }}
                      >
                        <Icons.IconTrashCan iconClassName="w-5 h-5" />
                      </StyledButton>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default PostsPage;
