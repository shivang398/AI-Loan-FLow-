import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from '../../store';
import { logout, setCredentials } from '../../store/slices/authSlice';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30s timeout
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Skip refresh for auth endpoints to prevent intercepting login/refresh failures
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/');

    // Handle 401 Unauthorized (only for non-auth endpoints and only once)
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        // Attempt token refresh using httpOnly cookie (no body needed)
        const { data: apiResponse } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });

        const newToken = apiResponse?.data?.token;
        if (!newToken) throw new Error('Refresh failed: no token in response');

        const currentUser = store.getState().auth.user;
        if (!currentUser) throw new Error('No user in store');

        store.dispatch(setCredentials({
          token: newToken,
          user: currentUser,
        }));

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
