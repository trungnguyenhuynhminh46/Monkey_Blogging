import React, { useEffect, useState } from "react";
// Assets
import { getAllCategories } from "../services/categories";
import { db } from "../firebase/firebase-config";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import Button from "../component/Button";
import Pagination from "../component/Pagination";
import { debounce } from "lodash";
import Categories from "./modules/Dashboard/Categories";

const CATEGORIES_PER_PAGE = 3;

const CategoriesPage = () => {
  const [searchInput, setInputSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  // Effect
  useEffect(() => {
    const fetchCategories = async () => {
      let catsList = await getAllCategories(null, searchInput);
      setCategories(catsList);
    };
    fetchCategories();
    setCurrentPage(1);
  }, [searchInput]);
  // Handlers, functions
  const handleInputSearch = debounce((e) => {
    setInputSearch(e.target.value);
  }, 600);
  // Paginations
  const indexOfLastCategory = currentPage * CATEGORIES_PER_PAGE - 1;
  const indeOfFirstCategory = indexOfLastCategory - CATEGORIES_PER_PAGE + 1;
  const currentCategories = categories.slice(
    indeOfFirstCategory,
    indexOfLastCategory + 1
  );
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
      {currentCategories.length > 0 && (
        <Categories categories={currentCategories} />
      )}
      {categories.length > CATEGORIES_PER_PAGE && (
        <div className="mt-10 flex justify-center">
          <Pagination
            itemsPerPage={CATEGORIES_PER_PAGE}
            totalItems={categories.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
