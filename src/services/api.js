import axios from 'axios';

// Use relative URL in development (via Vite proxy) or absolute URL for production
const API_BASE_URL = import.meta.env.DEV 
  ? '' // Use Vite proxy in development
  : 'http://localhost:8080'; // Or your production URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle connection refused errors (backend not running)
    if (
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNREFUSED' ||
      error.message === 'Network Error' ||
      error.message?.includes('ECONNREFUSED')
    ) {
      console.error('Connection Error: Backend server is not running or not accessible at http://localhost:8080');
      // Don't redirect on connection errors, just log
      return Promise.reject(
        new Error('Unable to connect to the server. Please ensure the Spring Boot backend is running on http://localhost:8080')
      );
    }

    // Handle proxy errors (Vite dev server proxy issues)
    if (error.message?.includes('proxy error') || error.code === 'ECONNREFUSED') {
      console.error('Proxy Error: Cannot connect to backend server. Please check if the backend is running.');
      return Promise.reject(
        new Error('Backend server connection failed. Please ensure the Spring Boot backend is running.')
      );
    }
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/api/users/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/api/products');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  addItem: async (productId, qty) => {
    // Some backends require a body even if empty, and some prefer query params
    // Try with empty body first, backend should read from query params
    const response = await api.post(`/api/cart/add?productId=${productId}&qty=${qty}`, {});
    return response.data;
  },
  getCart: async () => {
    const response = await api.get('/api/cart');
    return response.data;
  },
};

// Checkout API
export const checkoutAPI = {
  checkout: async (checkoutData) => {
    const response = await api.post('/api/checkout', checkoutData);
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/api/checkout/history');
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  // Product Management
  getAllProducts: async () => {
    const response = await api.get('/api/products');
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await api.post('/api/products', productData);
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/api/products/${id}`, productData);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },
  uploadProductImage: async (id, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.post(`/api/products/${id}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  // Order Management
  getAllOrders: async () => {
    const response = await api.get('/api/checkout/history');
    return response.data;
  },
};

export default api;

