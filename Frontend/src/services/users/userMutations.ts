import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "./userApi";

const queryClient = useQueryClient();

export const useCreateUser = useMutation({
  mutationFn: getUsers,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});
