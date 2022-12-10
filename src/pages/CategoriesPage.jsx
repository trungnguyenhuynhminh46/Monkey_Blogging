import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
// Assets
import { getAllCategories } from "../services/categories";
import { db } from "../firebase/firebase-config";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Button from "../component/Button";
import Icons from "../component/Icons";
import Table from "../component/Table";
import Pagination from "../component/Pagination";
import Badge from "../component/Badge";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

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

const CategoriesPage = () => {
  const [searchInput, setInputSearch] = useState("");
  const status = {
    1: "Approved",
    2: "Unapproved",
  };
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // Effect
  useEffect(() => {
    const fetchCategories = async () => {
      let catsList = await getAllCategories(null, searchInput);
      setCategories(catsList);
    };
    fetchCategories();
  }, [searchInput]);
  // Handlers, functions
  const handleInputSearch = debounce((e) => {
    setInputSearch(e.target.value);
  }, 600);
  return (
    <div className="flex-1 mb-[40px]">
      <Heading>Manage Categories</Heading>
      <div className="flex justify-between items-stretch px-10">
        <Button
          style={{ width: 192 }}
          fontSize={"18px"}
          fontWeight={600}
          padding={"18px 0"}
          to="/dashboard/add-category"
        >
          Add category
        </Button>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search post..."
          className="flex-1 p-4 w-full max-w-[300px] my-4 outline-none border border-gray-200 rounded-lg"
          onChange={handleInputSearch}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  <span className="text-gray-500">{category.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{category.slug}</span>
                </td>
                <td>
                  <span className="text-gray-500">
                    <Badge>{status[category.status]}</Badge>
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <StyledButton>
                      <Icons.IconEye iconClassName="w-5 h-5" />
                    </StyledButton>
                    <StyledButton
                      onClick={() => {
                        navigate(
                          `/dashboard/update-category?id=${category.id}`
                        );
                      }}
                    >
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
                            await deleteDoc(doc(db, "categories", category.id));
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
      {/* <div className="mt-10 flex justify-center">
        <Pagination></Pagination>
      </div> */}
    </div>
  );
};

export default CategoriesPage;
