import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Make sure axios is correctly imported
import NewsCard from '../components/NewsCard'; // Import the NewsCard component
import { useParams } from 'react-router-dom';

const CategoryNews = () => {
  
  const { category } = useParams(); // Get category from URL
  const [news, setNews] = useState([]); // State to hold fetched news
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch news from the API based on the category
    const fetchNews = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("AccessToken"));
        const response = await axios.get(`/news/category/${category}`, {
          headers: { Authorization: `Bearer ${token}` }, // Include the token
        });
        console.log(response);
        
        setNews(response.data); // Set the fetched news
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching news'); // Handle specific error messages
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchNews();
  }, [category]); // Run the effect when category changes

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if an error occurs
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4">News in {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.map((item) => (
            <NewsCard key={item._id} value={item} />
          ))
        ) : (
          <div>No news available in this category</div>
        )}
      </div>
    </div>
  );
};

export default CategoryNews;
