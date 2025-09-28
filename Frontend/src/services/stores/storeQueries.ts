import { useQuery } from "@tanstack/react-query";
import { getOwnerStore, getStore } from "./storeApi";

export const useGetStores = useQuery({
  queryKey: ["stores"],
  queryFn: getStore,
});

export const useGetOwnerStore = useQuery({
  queryKey: ["ownerstore"],
  queryFn: getOwnerStore,
});
