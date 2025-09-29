import { useMutation } from "@tanstack/react-query";
import { login, resetPassword, signup } from "./authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signup,
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
