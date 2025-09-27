// services/admins/adminQueries.ts
import { useQuery } from "@tanstack/react-query";
import { fetchAdmins } from "./adminApi";

export const useAdmins = useQuery({
  queryKey: ["admins"],
  queryFn: fetchAdmins,
});
