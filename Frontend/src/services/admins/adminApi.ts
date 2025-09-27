import { api } from "../../utils/api";

export const fetchAdmins = async () => {
  const response = await api.get("/admins");
  return response.data;
};

export const createAdmin = async (data: any) => {
  const response = await api.post("/admins", data);
  return response.data;
};
