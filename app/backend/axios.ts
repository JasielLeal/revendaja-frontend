// api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api", // ✅ precisa ter http://
  headers: {
    "Content-Type": "application/json",
  },
});

// // Interceptador para adicionar o token automaticamente
// api.interceptors.request.use(
//   (config) => {
//     const token = cookieStore.get("revendaja-token"); // ✅ use localStorage no client
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
