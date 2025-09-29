import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUsers } from "./userApi";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });
};
