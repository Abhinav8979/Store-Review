import { api } from "../../utils/api";

export const rateStore = async (data: any) => {
  const response = await api.post("/ratings", data);
  return response.data;
};
