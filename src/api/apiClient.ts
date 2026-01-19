import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
});

// Handle 401 errors
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await api.get("/auth/refresh-token", { withCredentials: true });

        return api(error.config);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
