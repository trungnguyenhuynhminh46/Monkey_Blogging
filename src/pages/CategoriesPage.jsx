import React from "react";
import styled from "styled-components";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Button from "../component/Button";
import Icons from "../component/Icons";
import Table from "../component/Table";
import Pagination from "../component/Pagination";

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
            <th></th>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>01</td>
            <td>
              <span className="text-gray-500">Tên danh mục</span>
            </td>
            <td>
              <span className="text-gray-500">ten-danh-muc</span>
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

export default CategoriesPage;
