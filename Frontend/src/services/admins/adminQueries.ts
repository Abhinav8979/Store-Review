import { useQuery } from "@tanstack/react-query";
import { getDashboardDetails } from "./adminApi";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getDashboardDetails,
  });
};
