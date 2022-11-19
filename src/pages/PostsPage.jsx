import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, query, where } from "firebase/firestore";
// Assets
import { db } from "../firebase/firebase-config";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Table from "../component/Table";
import Pagination from "../component/Pagination";
import Icons from "../component/Icons";
import { Dropdown } from "../component/Dropdown";
import Button from "../component/Button";

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
  // States
  const [categories, setCategories] = useState([]);
  // Effect
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesQuery = query(
        collection(db, "categories"),
        where("status", "==", 1)
      );
      const querySnap = await getDocs(categoriesQuery);
      let catsList = [];
      querySnap.forEach((category) => {
        catsList.push({ id: category.id, ...category.data() });
      });
      setCategories(catsList);
    };
    fetchCategories();
  }, []);
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
            <th></th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>01</td>
            <td>
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1668365187350-05c997d09eba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60"
                  alt=""
                  className="w-12 h-auto rounded"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold">One Special 4K Camera</h1>
                  <span>Date: 25 Oct 2021</span>
                </div>
              </div>
            </td>
            <td>
              <span className="text-gray-500">Camera Gear</span>
            </td>
            <td>
              <span className="text-gray-500">Hanna</span>
            </td>
            <td>
              <div className="flex items-center gap-x-3 text-gray-500">
                <StyledButton>
                  <Icons.IconEye iconClassName="w-5 h-5" />
                </StyledButton>
                <StyledButton>
                  <Icons.IconPencilSquare iconClassName="w-5 h-5" />
                </StyledButton>
                <StyledButton>
                  <Icons.IconTrashCan iconClassName="w-5 h-5" />
                </StyledButton>
              </div>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </Table>
      <div className="mt-10 flex justify-center">
        <Pagination></Pagination>
      </div>
    </div>
  );
};

export default PostsPage;
