// services/stores/storeMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStore } from "./storeApi";

const queryClient = useQueryClient();
export const useAddStore = () => {
  useMutation({
    mutationFn: createStore,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stores"] }),
  });
};
