import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // Make sure axios is configured to make requests
import Swal from "sweetalert2"; // For nice alert boxes
import { NavLink } from "react-router-dom";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]); // State for storing categories
  const [categoryName, setCategoryName] = useState(""); // State for category input
  const [loading, setLoading] = useState(false); // Loading state for creating category
  const [error, setError] = useState(""); // Error handling state

  // Fetch all categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        if (response.data.length === 0) {
          setError("No categories found.");
        } else {
          setCategories(response.data);
          setError("")
        }
      } catch (err) {
        setError(err.response.data || err.message);
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission to create a new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      return setError("Category name is required.");
    }

    setLoading(true); // Show loading indicator

    try {
      const token = JSON.parse(localStorage.getItem("AccessToken"));
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      // Send a POST request to create the category
      const response = await axios.post(
        "/categories",
        { name: categoryName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        Swal.fire("Success", "Category created successfully", "success");
        setCategoryName(""); // Clear input field
        setCategories((prevCategories) => [
          ...prevCategories,
          response.data, // Add new category to the list
        ]);
        setError("")
      }
    } catch (err) {
      setError(err.response.data || err.message);
    
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    
    <div className="flex flex-col lg:flex-row lg:space-x-10 p-6">
      {/* Left side: Categories list */}
      <div className="w-full lg:w-1/2 p-6 max-h-[84vh] overflow-y-auto bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Categories</h2>
       
        {categories.length === 0 ? (
          <div className="text-gray-500 text-center p-6">
            No categories available. Please add a category.
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <NavLink
              to = {`/news/categories/${category.name}`}
                key={category._id}
                className="p-4 bg-gray-100 rounded-md block shadow-sm hover:bg-gray-200 transition-all"
              >
                <p className="font-medium text-gray-800">{category.name}</p>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Right side: Create category form */}
      <div className="w-full lg:w-2/3 p-6 h-72 bg-white shadow-lg rounded-xl mt-6 lg:mt-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create Category</h2>
        <form onSubmit={handleCreateCategory} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="categoryName" className="text-lg font-medium text-gray-900">
              Category Name
            </label>
         <p className="text-red-600"> {error}</p>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter category name"
            />
            {error && !categoryName && (
              <div className="text-red-500 text-sm">Category name is required.</div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-800 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryPage;
