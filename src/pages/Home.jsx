import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "../api/axios";
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  async function getAllNews() {
    try {
      const res = await axios.get("/news");
      setNews(res.data);
    } catch (err) {
      setError("Failed to load news. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Top Headlines
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-800"></div>
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* News Layout */}
      {!loading && !error && news.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured News */}
          <div className="lg:col-span-2 cursor-pointer" onClick={()=> navigate(`/news/${news[0]._id}`)}>
            <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                className="w-full h-[300px] sm:h-[400px] object-cover object-top"
                src={`http://localhost:3000/${news[0]?.image}`}
                alt={news[0]?.headline}
              />
              <div className="absolute bottom-0 bg-black/60 text-white p-4 sm:p-6 w-full">
                <h2 className="text-lg sm:text-2xl font-bold">{news[0]?.headline}</h2>
                <p className="text-sm sm:text-md mt-2">{news[0]?.content.substring(0, 200)}...</p>
              </div>
            </div>
          </div>

          {/* Trending News */}
          <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Trending News</h2>
            <ul className="space-y-2 sm:space-y-3">
              {news.slice(1, 5).map((item) => (
                <li key={item._id} className="border-b pb-2">
                  <NavLink
                  to ={`/news/${item._id}`}
                   className="text-sm sm:text-md font-semibold hover:text-blue-700 cursor-pointer">
                    {item.headline}
                  </NavLink>
                  <p className="text-xs text-gray-500">{new Date(item.createdAt).toDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Latest News Section - Fully Responsive */}
      {!loading && !error && (
        <div className="mt-8 sm:mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {news.slice(5).map((item) => (
              <NewsCard key={item._id} value={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
