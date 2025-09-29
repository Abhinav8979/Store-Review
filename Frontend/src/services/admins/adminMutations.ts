import { useMutation } from "@tanstack/react-query";
import { createStore, createUsers } from "./adminApi";

export const useAddAdmin = () => {
  return useMutation({
    mutationFn: createUsers,
  });
};

export const useAddStore = () => {
  return useMutation({
    mutationFn: createStore,
  });
};
