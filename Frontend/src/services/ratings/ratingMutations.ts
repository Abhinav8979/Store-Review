import { useMutation } from "@tanstack/react-query";
import { rateStore } from "./ratingApi";

export const useRateStore = () => {
  return useMutation({
    mutationFn: rateStore,
  });
};
