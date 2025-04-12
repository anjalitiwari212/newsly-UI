import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import { loginContext } from "../context/AuthProvider"; // Assuming you have a context for login
import axios from "../api/axios"; // Ensure axios is correctly imported

const Navbar = () => {
  const { loginUser } = useContext(loginContext); // Assuming loginUser is stored in context
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const categoryRef = useRef(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data); // Assuming response contains categories
      } catch (err) {
        setError(err?.response?.data || err.message);
      }
    };
    fetchCategories();
  }, []);

  const scrollLeft = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md">
        <div className="container mx-auto py-4 flex justify-between items-center">
          {/* Logo */}
          <NavLink className="text-3xl font-bold text-green-800" to="/">
          Newsly
          </NavLink>

          {/* Categories Scroll (Desktop) */}
          <div className="relative hidden md:flex items-center w-[65%]">
            {/* Scroll Left Button */}
            <button
              className="absolute -left-8 hover:text-green-700"
              onClick={scrollLeft}
            >
              <FaArrowLeftLong />
            </button>

            {/* Scrollable Categories */}
            <div
              ref={categoryRef}
              className="flex space-x-6 overflow-x-auto py-3 scrollbar-hide w-full px-10 no-scrollbar"
              style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
            >
              <NavLink
                className="text-gray-700 font-medium hover:text-green-800 transition-all"
                to={`/`}
              >
                Home
              </NavLink>
              {error ? (
                <div className="text-red-600">{error}</div>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <NavLink
                    key={category._id}
                    className="text-gray-700 font-medium hover:text-green-800 transition-all"
                    to={`/news/categories/${category.name.toLowerCase()}`}
                  >
                    {category.name}
                  </NavLink>
                ))
              ) : (
                <div className="text-gray-500">Loading categories...</div>
              )}
            </div>

            {/* Scroll Right Button */}
            <button
              className="absolute -right-10 p-2 rounded-full hover:text-green-700 transition"
              onClick={scrollRight}
            >
              <FaArrowRightLong />
            </button>
          </div>

          {/* Profile & Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {loginUser ? (
              <NavLink to="/profile">
                <div className="h-10 w-10 rounded-full bg-green-800 flex items-center justify-center text-white font-bold uppercase">
                  {loginUser?.name[0]} {/* Display the first letter of the user's name */}
                </div>
              </NavLink>
            ) : (
              <>
                <NavLink
                  className="text-gray-700 font-medium border border-green-700 px-4 py-2 rounded-md hover:bg-green-800 hover:text-white transition-all"
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className="text-white font-medium bg-green-700 px-4 py-2 rounded-md hover:bg-green-900 transition-all"
                  to="/signup"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute overflow-y-scroll max-h-[80vh] h-fit overflow-x-hidden left-0 top-20 z-50 w-full bg-white shadow-md p-4 flex flex-col gap-2 md:hidden">
            <NavLink
              className="text-gray-700 font-medium"
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            {categories.map((category) => (
              <NavLink
                key={category._id}
                className="text-gray-700 font-medium"
                to={`/news/categories/${category.name.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {category.name}
              </NavLink>
            ))}
            {loginUser ? (
              <NavLink
                className="text-green-800 font-medium"
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
            ) : (
              <>
                <NavLink
                  className="text-gray-700 font-medium"
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  className="font-medium"
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
