// Libraries
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteUser, signOut } from "firebase/auth";
// Assets
import { convertDateFormat } from "../../../utils/date";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../../services/posts";
import { db, auth } from "../../../firebase/firebase-config";
// Components
import Table from "../../../component/Table";
import Icons from "../../../component/Icons";
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

const Users = ({ users }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  // Effect
  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser?.uid));
        setCurrentUser({ uid: docSnap.id, ...docSnap.data() });
      }
    };
    getUser();
  }, [auth?.currentUser]);
  return (
    <Table>
      <thead>
        <tr>
          <th>Display name</th>
          <th className="hidden 2xl:table-cell">Info</th>
          <th className="hidden lg:table-cell">Email </th>
          <th className="hidden 2xl:table-cell">Phone number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                {user.displayName.lenght > 25
                  ? user.displayName.slice(0, 25) + "..."
                  : user.displayName}
              </td>
              <td className="hidden 2xl:table-cell">
                <div className="flex gap-4 items-center">
                  <img
                    src={user.image}
                    alt=""
                    className="w-[80px] h-auto rounded object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    {!!user?.fullName && (
                      <h1 className="font-semibold">
                        {user.fullName.length > 15
                          ? user.fullName.slice(0, 15) + "..."
                          : user.fullName}
                      </h1>
                    )}
                    <span>
                      {!!user.dob && convertDateFormat(user.dob.seconds)}
                    </span>
                  </div>
                </div>
              </td>
              <td className="hidden lg:table-cell">{user.email}</td>
              <td className="hidden 2xl:table-cell">{user.phone_num}</td>
              <td>
                {currentUser?.uid == user.id && (
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <StyledButton
                      onClick={() => {
                        navigate("/dashboard/profile");
                      }}
                    >
                      <Icons.IconPencilSquare iconClassName="w-5 h-5" />
                    </StyledButton>
                    <StyledButton
                      onClick={() => {
                        Swal.fire({
                          title: "Make sure you want this?",
                          text: "All your posts will be deleted too!!!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then(async (result) => {
                          if (result.isConfirmed && auth.currentUser) {
                            const allPostsByThisUser = await getAllPosts(
                              null,
                              "",
                              currentUser.uid
                            );
                            // Delete all post
                            allPostsByThisUser &&
                              allPostsByThisUser.forEach(async (post) => {
                                await deleteDoc(doc(db, "posts", post.id));
                              });
                            // Delete user in Firestore
                            await deleteDoc(
                              doc(db, "users", auth.currentUser.uid)
                            );
                            // Delete user in Auth
                            await deleteUser(auth.currentUser);
                            // Log out
                            await signOut(auth);
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

export default Users;
