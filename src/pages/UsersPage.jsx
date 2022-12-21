import React, { useState, useEffect } from "react";
// Assets
import { getAllUsers } from "../services/users";
import { debounce } from "lodash";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Users from "./modules/Dashboard/Users";
import Pagination from "../component/Pagination";
import BeatLoader from "react-spinners/BeatLoader";

const USERS_PER_PAGE = 3;
const UsersPage = () => {
  // States
  const [usersAreLoading, setUsersAreLoading] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Effect
  useEffect(() => {
    setUsersAreLoading(true);
    setTimeout(() => {
      setUsersAreLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    (async () => {
      const usersList = await getAllUsers(null, inputSearch);
      setUsers(usersList);
    })();
  }, [inputSearch]);
  // Functions, handlers
  const handleInputSearch = debounce((e) => {
    setInputSearch(e.target.value);
  }, 500);
  // Pagination
  const indexOfLastUser = USERS_PER_PAGE * currentPage - 1;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE + 1;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser + 1);
  return (
    <>
      {usersAreLoading ? (
        <div className="w-full h-[540px] flex justify-center items-center">
          <BeatLoader color="#36d7b7" loading={usersAreLoading} size={14} />
        </div>
      ) : (
        <div className="flex-1 mb-[40px]">
          <Heading>Manage Users</Heading>
          <div className="flex justify-end px-10">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search by username..."
              className="flex-1 p-4 w-full max-w-[300px] my-4 outline-none border border-gray-200 rounded-lg"
              onChange={handleInputSearch}
            />
          </div>
          {Array.isArray(currentUsers) && currentUsers.length > 0 && (
            <Users users={currentUsers} />
          )}
          {users.length > USERS_PER_PAGE && (
            <div className="mt-10 flex justify-center">
              <Pagination
                itemsPerPage={USERS_PER_PAGE}
                totalItems={users.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              ></Pagination>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UsersPage;
