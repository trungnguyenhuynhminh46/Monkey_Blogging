import React from "react";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Table from "../component/Table";
import Pagination from "../component/Pagination";

const PostsPage = () => {
  return (
    <div className="flex-1 mb-[40px]">
      <Heading>Manage Post</Heading>
      <div className="flex justify-end">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search post..."
          className="p-4 w-full max-w-[300px] outline-none border border-gray-200 rounded-lg"
        />
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
                <span className="flex items-center justify-center w-10 h-10 border border-gray-200 border-solid rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
                <span className="flex items-center justify-center w-10 h-10 border border-gray-200 border-solid rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </span>
                <span className="flex items-center justify-center w-10 h-10 border border-gray-200 border-solid rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </span>
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
