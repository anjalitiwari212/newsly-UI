import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaPlus, FaTrash, FaEye } from "react-icons/fa";
import  swal  from 'sweetalert2';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [news, setNews] = useState([]);

  async function getUser() {
    try {
      const token = JSON.parse(localStorage.getItem("AccessToken"));
      if (!token) return console.log("No token found, user might not be logged in.");

      const res = await axios.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  }

  async function getUserNews() {
    try {
      const token = JSON.parse(localStorage.getItem("AccessToken"));
      if (!token) return console.log("No token found, user might not be logged in.");

      const res = await axios.get("/news/user-news", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNews(res.data);
    } catch (err) {
      console.error("Error fetching user news:", err);
    }
  }

  async function deleteNews(newsId) {
    try {
      const token = JSON.parse(localStorage.getItem("AccessToken"));
      if (!token) return console.log("No token found, user might not be logged in.");

      const res = await axios.delete(`/news/${newsId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if(res.status == 200){
      // Filter out the deleted news from the state
      setNews(news.filter((item) => item._id !== newsId));
       swal.fire("News Deleted")
      }
    } catch (err) {
      console.error("Error deleting news:", err);
      alert("There was an error deleting the news.");
    }
  }

  useEffect(() => {
    getUser();
    getUserNews();
  }, []);

  const logout = () => {
    localStorage.removeItem("AccessToken");
    navigate("/");
    window.location.reload();
  };

  return (
   
    <div className="p-6 sm:p-10 min-h-screen bg-gray-100">
      {/* Profile Section */}
      <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-500">Manage your profile & news</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="text-lg">
            <strong>Name:</strong> {user?.name}
          </div>
          <div className="text-lg">
            <strong>Email:</strong> {user?.email}
          </div>
          <div
            onClick={logout}
            className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800 transition-all mt-4"
          >
            <CiLogout className="text-2xl" />
            <span className="font-semibold">Logout</span>
          </div>
        </div>
      </div>

      {/* Admin Panel */}
      {user?.role === 1 && (
        <div className="mt-10">
          {/* Create News Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your News</h2>
            <div className="flex gap-3">
              <NavLink
                to="/categories"
                className="flex gap-3 text-black items-center bg-white px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-all"
              >
                <FaPlus /> <span>Categories</span>
              </NavLink>
              <NavLink
                to="/news/create"
                className="flex gap-3 text-black items-center bg-white px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-all"
              >
                <FaPlus /> <span>Create News</span>
              </NavLink>
            </div>
          </div>

          {/* News Table */}
          <div className="mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="p-4">Image</th>
                  <th className="p-4">Headline</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.length > 0 ? (
                  news.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-100">
                      <td className="p-4">
                        <img
                          src={`http://localhost:3000/${item.image}`}
                          alt="News"
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      </td>
                      <td className="p-4 text-gray-800">{item.headline}</td>
                      <td className="p-4 text-gray-600">
                        {new Date(item.createdAt).toDateString()}
                      </td>
                      <td className="p-4 flex justify-center gap-3">
                        <a
                          href={`/news/${item._id}`}
                          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all"
                        >
                          <FaEye />
                        </a>
                        <button
                          onClick={() => deleteNews(item._id)}
                          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-all"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No news found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>

  );
};

export default Profile;
