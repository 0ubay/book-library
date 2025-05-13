import axios from 'axios';

// Create a function that will be set from the component
let navigate = null;
export const setNavigate = (nav) => {
  navigate = nav;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Use React Router navigation if available, otherwise fallback to window.location
      if (navigate) {
        navigate('/login');
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 