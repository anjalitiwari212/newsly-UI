import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: '${import.meta.env.VITE_SERVER_URL}/api', // Replace with your API's base URL
  timeout: 10000, // Timeout in milliseconds
});

export default apiClient;
