import axios from "axios";
import Cookies from "universal-cookie";

export const backend = axios.create({
  baseURL: "https://revendaja-backend.onrender.com",
});

backend.interceptors.request.use(
  async (config) => {
    const cookie = new Cookies();

    const token = await cookie.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
