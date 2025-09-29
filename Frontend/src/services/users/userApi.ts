import { api } from "../../utils/api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/users/get-all-users");
  return res.data;
};
