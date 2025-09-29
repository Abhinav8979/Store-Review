import { api } from "../../utils/api";

export const getAllStore = async () => {
  const response = await api.get("/stores/public");
  return response.data.stores;
};

export const getOwnerStore = async (data: any) => {
  const response = await api.post("/stores/store-owner", data);
  return response.data;
};
