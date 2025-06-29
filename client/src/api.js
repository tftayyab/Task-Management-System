import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log('🔁 Trying to refresh token...');

        const res = await api.get('/auth/refresh-token');
        const newToken = res.data.accessToken;

        if (!newToken) throw new Error("No token from refresh");

        localStorage.setItem('token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.log('✅ Token refreshed via interceptor');

        return api(originalRequest);
      } catch (err) {
        console.error("❌ Refresh failed in interceptor:", err.response?.data || err.message);
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
