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
  const status = {
    1: "Approved",
    2: "Unapproved",
  };
  const [categories, setCategories] = useState([]);
  // Effect
  useEffect(() => {
    const fetchCategories = async () => {
      let catsList = await getAllCategories();
      setCategories(catsList);
    };
    fetchCategories();
  }, []);
  return (
    <div className="flex-1 mb-[40px]">
      <Heading>Manage Categories</Heading>
      <div className="flex justify-between items-center px-10">
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
          className="flex-1 p-4 w-full max-w-[300px] outline-none border border-gray-200 rounded-lg"
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
                            await deleteDoc(doc(db, "categories", category.id));
                            document.location.reload(true);
                            Swal.fire(
                              "Deleted!",
                              "Your category has been deleted.",
                              "success"
                            );
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
