// services/admins/adminMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "./adminApi";

const queryClient = useQueryClient();

export const useAddAdmin = useMutation({
  mutationFn: createAdmin,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
});
