import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('flexpass-auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || (error.response?.status === 404 && error.response?.data?.error?.message === 'User not found')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('flexpass-auth-token');
        localStorage.removeItem('flexpass-user-role');
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    const errorData = error.response?.data?.error;
    if (errorData) {
      let serverMessage = errorData.message;
      if (errorData.details && Array.isArray(errorData.details) && errorData.details.length > 0) {
        const detailsStr = errorData.details.map((d: any) => `${d.path}: ${d.message}`).join(', ');
        serverMessage = `${serverMessage} (${detailsStr})`;
      }
      if (serverMessage) {
        error.message = serverMessage;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
