import React from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ value }) => {
  const navigate = useNavigate()

  return (
    <div className="relative max-w-sm h-[26rem] rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-300 hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img
        className="w-full h-52 object-cover"
        src={value.image ? `${import.meta.env.VITE_SERVER_URL}${value.image}` : "https://via.placeholder.com/400"}
        alt={value.headline}
      />

      {/* News Content */}
      <div className="p-4">
        {/* Category & Date */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            {value.category || "General"}
          </span>
          <span>{new Date(value.createdAt).toDateString()}</span>
        </div>

        {/* Headline */}
        <h2 className="text-lg font-bold text-gray-900 mt-2 hover:text-green-700 cursor-pointer transition">
          {value.headline}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {value.content.substring(0, 100)}...
        </p>

        {/* Author */}
        <p className="text-xs text-gray-500 mt-2 italic">By {value.author || "Unknown"}</p>
      </div>

      {/* Read More Button */}
      <div className="px-4 pb-4 flex justify-start">
        <button onClick={() => navigate(`/news/${value._id}`)} className="absolute bottom-3 bg-green-700 hover:bg-green-900 transition-colors px-4 py-2 rounded-md text-sm text-white font-semibold">
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
