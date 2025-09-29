import { api } from "../../utils/api";

export const signup = async (data: any) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: any) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const resetPassword = async (data: any) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};
