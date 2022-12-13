import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
// Assets
import { db } from "../../../firebase/firebase-config";

// Components
import Table from "../../../component/Table";
import Badge from "../../../component/Badge";
import Swal from "sweetalert2";
import Icons from "../../../component/Icons";

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

const Categories = ({ categories = [] }) => {
  const status = {
    1: "Approved",
    2: "Unapproved",
  };
  const navigate = useNavigate();
  return (
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
        {Array.isArray(categories) &&
          categories.map((category) => {
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
  );
};

export default Categories;
