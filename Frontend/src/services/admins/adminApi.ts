import { api } from "../../utils/api";

export const getDashboardDetails = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const createUsers = async (data: any) => {
  const response = await api.post("/create/create-user", data);
  return response.data;
};

export const createStore = async (data: any) => {
  const response = await api.post("/create/create-store", data);
  return response.data;
};
