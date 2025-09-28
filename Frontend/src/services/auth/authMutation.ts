// services/admins/adminMutations.ts
import { useMutation } from "@tanstack/react-query";
import { login, resetPassword, signup } from "./authApi";
import { dashboard } from "../../constants/path";

export const useLogin = useMutation({
  mutationFn: login,
  onSuccess: () => {
    window.location.href = dashboard;
  },
});

export const useSignUp = useMutation({
  mutationFn: signup,
  onSuccess: () => {
    window.location.href = "/auth/login";
  },
});

export const useResetPassword = useMutation({
  mutationFn: resetPassword,
});
