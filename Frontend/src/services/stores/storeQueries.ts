import { useQuery } from "@tanstack/react-query";
import { getOwnerStore, getAllStore } from "./storeApi";

export const useGetAllStores = () => {
  return useQuery({
    queryKey: ["all-stores"],
    queryFn: getAllStore,
  });
};

export const useGetOwnerStore = () => {
  return useQuery({
    queryKey: ["ownerstore"],
    queryFn: getOwnerStore,
  });
};
