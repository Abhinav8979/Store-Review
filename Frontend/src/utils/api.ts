import axios from "axios";
import { login } from "../constants/path";

export const api = axios.create({
  baseURL: "http://localhost:5173/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.error === "Invalid or expired token"
    ) {
      localStorage.removeItem("token");
      window.location.href = login;
    }
    return Promise.reject(error);
  }
);
