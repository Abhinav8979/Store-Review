import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./userApi";

export const useUsers = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
