import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        
        // Use the BASE_URL and the correct endpoint from your API list
        const response = await axios.post(`${BASE_URL}/api/users/login/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiPrivate(originalRequest);
      } catch (refreshError) { 
        console.error("Session expired. Logging out.");
        localStorage.clear();
        // window.location.href = "/login"; // Optional: only if you want a hard redirect
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiPrivate;