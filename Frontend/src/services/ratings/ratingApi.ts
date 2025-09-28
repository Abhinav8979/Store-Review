import { api } from "../../utils/api";

export const getDashboardDetails = async (data: any) => {
  const response = await api.post("/api/ratings", data);
  return response.data;
};
