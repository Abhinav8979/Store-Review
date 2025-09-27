// services/stores/storeQueries.ts
import { useQuery } from "@tanstack/react-query";
import { fetchStores } from "./storeApi";

export const useStores = useQuery({
  queryKey: ["stores"],
  queryFn: fetchStores,
});
