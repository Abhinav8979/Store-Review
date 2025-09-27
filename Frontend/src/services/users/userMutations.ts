import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./userApi";

const queryClient = useQueryClient();

export const useCreateUser = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});
