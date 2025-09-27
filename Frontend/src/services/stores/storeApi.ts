import { api } from "../../utils/api";

export const fetchStores = async () => {
  const response = await api.get("/stores");
  return response.data;
};

export const createStore = async (data: any) => {
  const response = await api.post("/stores", data);
  return response.data;
};
