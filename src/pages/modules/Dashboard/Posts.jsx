import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
// Assets
import { convertDateFormat } from "../../../utils/date";
import { db } from "../../../firebase/firebase-config";
import { userRole } from "../../../utils/constants";
// Components
import Table from "../../../component/Table";
import Badge from "../../../component/Badge";
import Icons from "../../../component/Icons";
import Swal from "sweetalert2";

const status = {
  1: "Approved",
  2: "Pending",
  3: "Rejected",
};

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

const Posts = ({
  currentUser,
  posts = [],
  categoriesByUserID,
  authorsByUserID,
}) => {
  const navigate = useNavigate();
  // posts.forEach((post) => {
  //   console.log("post", post.id);
  //   console.log("author", authorsByUserID[post.id]);
  // });
  return (
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
        {Array.isArray(posts) &&
          posts.length > 0 &&
          posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <div className="flex gap-4">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[80px] h-auto rounded object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className="font-semibold">
                        {post?.title.slice(0, 25) + "..."}
                      </h1>
                      <span>{convertDateFormat(post.createdAt.seconds)}</span>
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
                  {(currentUser.role == userRole.ADMIN ||
                    (authorsByUserID[post.id] &&
                      currentUser.id == authorsByUserID[post.id].id)) && (
                    <div className="flex items-center gap-x-3 text-gray-500">
                      <StyledButton
                        onClick={() => {
                          navigate(`/post/${post.slug}`);
                        }}
                      >
                        <Icons.IconEye iconClassName="w-5 h-5" />
                      </StyledButton>
                      <StyledButton
                        onClick={() => {
                          navigate(`/dashboard/update-post?id=${post.id}`);
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
                              await deleteDoc(doc(db, "posts", post.id));
                              document.location.reload(true);
                            }
                          });
                        }}
                      >
                        <Icons.IconTrashCan iconClassName="w-5 h-5" />
                      </StyledButton>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default Posts;
