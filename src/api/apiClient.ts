import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Handle 401 errors
api.interceptors.response.use(
  (res) => res,
  async (error) => {

    const originalRequest = error.config;

      if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }
     if (originalRequest._retry) {
      return Promise.reject(error);
    }

    //  Skip refresh endpoint itself
    if (originalRequest.url === "/auth/refresh-token") {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

      try {
        await api.get("/auth/refresh-token", { withCredentials: true });

        return api(error.config);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
  }
);

export default api;
