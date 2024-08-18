import { BASE_URL } from "@/config/env";
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/storage_keys";
import axios from "axios";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  async (config) => {
    const token = await RNSecureStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, logging out...");
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await RNSecureStorage.getItem(REFRESH_TOKEN_KEY);
      const response = await api.post("/auth/refresh-token", {
        token: refreshToken,
      });
      const newToken = response.data.token;

      await RNSecureStorage.setItem(AUTH_TOKEN_KEY, newToken, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
