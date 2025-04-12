import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API's base URL
  timeout: 10000, // Timeout in milliseconds
});

export default apiClient;