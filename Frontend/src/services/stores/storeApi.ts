import { api } from "../../utils/api";

export const getStore = async () => {
  const response = await api.get("/api/stores/public");
  return response.data;
};

export const getOwnerStore = async (data: any) => {
  const response = await api.post("/api/stores/store-owner", data);
  return response.data;
};
