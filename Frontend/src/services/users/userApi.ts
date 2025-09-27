import { api } from "../../utils/api";

export const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (data: any) => {
  const response = await api.post("/users", data);
  return response.data;
};
