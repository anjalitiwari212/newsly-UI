import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateNews = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data); // Assuming response contains categories
      } catch (err) {
        console.error('Error fetching categories:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch categories. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    // Create a new FormData instance
    const newFormData = new FormData();
    // Append text fields to FormData
    newFormData.append('headline', data.headline);
    newFormData.append('content', data.content);
    newFormData.append('category', data.category);
    newFormData.append('link', data.link);

    // Append image file to FormData (if exists)
    if (data?.image[0]) {
      newFormData.append('image', data.image[0]);
    }

    // Send a POST request with FormData to the API
    try {
      const token = JSON.parse(localStorage.getItem("AccessToken")); // Get token from localStorage
      if (!token) {
        console.log("No token found, user might not be logged in.");
        return; // Handle case where token is not present
      }

      const response = await axios.post('/news', newFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'News posted successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate("/");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Create News</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="headline" className="block text-lg font-medium text-gray-900">Headline</label>
          <input
            {...register('headline', { required: 'Headline is required' })}
            id="headline"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter the headline"
          />
          {errors.headline && <span className="text-red-500 text-sm">{errors.headline.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-lg font-medium text-gray-900">Content</label>
          <textarea
            {...register('content', { required: 'Content is required' })}
            id="content"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter the content"
          />
          {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-lg font-medium text-gray-900">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            id="category"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="link" className="block text-lg font-medium text-gray-900">Link</label>
          <input
            {...register('link', { required: 'Link is required' })}
            id="link"
            type="url"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter the link"
          />
          {errors.link && <span className="text-red-500 text-sm">{errors.link.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-lg font-medium text-gray-900">Image Upload</label>
          <input
            {...register('image', { required: 'Image is required' })}
            id="image"
            type="file"
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-800 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
