import React, { useEffect, useState } from 'react';
import axios from '../api/axios';  // import axios like you did in CreateNews
import { useParams, useNavigate } from 'react-router-dom'; // To get the `id` from the URL
import Swal from 'sweetalert2'; // In case of errors

const NewsDetail = () => {
  const { id } = useParams(); // Extract `id` from the URL
  const navigate = useNavigate(); // To navigate to other pages if needed
  const [news, setNews] = useState(null);  // To store the news data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`/news/${id}`);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news.');
        setLoading(false);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch news details.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-green-800 mb-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-red-800 mb-4">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {news ? (
        <>
          {/* Two-column Layout: Image on Left, Content on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-lg shadow-xl bg-white">
              <img
                className="w-full h-[450px] sm:h-[500px] object-cover object-center transition-all duration-500 ease-in-out transform hover:scale-105"
                src={`${import.meta.env.VITE_SERVER_URL}${news.image}`} // Assuming image path is available
                alt={news.headline}
              />
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">{news.headline}</h2>
              <div className="text-gray-600">
                <span className="text-lg font-medium">Category: </span>
                <span className="text-lg text-green-700">{news.category}</span>
              </div>
              <p className="text-lg sm:text-xl text-gray-800">{news.content}</p>

              {/* Link to external source */}
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-green-800 font-semibold text-lg hover:text-green-600 transition duration-300 transform hover:scale-105"
              >
                Read more at source
              </a>
            </div>
          </div>
        </>
      ) : (
        <p>No news found</p>
      )}
    </div>
  );
};

export default NewsDetail;
