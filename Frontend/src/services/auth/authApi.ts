import { api } from "../../utils/api";

export const signup = async (data: any) => {
  const response = await api.post("/api/auth/signup", data);
  return response.data;
};

export const login = async (data: any) => {
  const response = await api.post("/api/auth/login", data);
  localStorage.setItem("token", response.data.token);
};

export const resetPassword = async (data: any) => {
  const response = await api.post("/api/auth/reset-password", data);
  return response.data;
};
