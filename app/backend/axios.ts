// api.ts
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://api-development-revendaja.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // ✅ Lê o token do cookie
    const token = Cookies.get("revendaja-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
