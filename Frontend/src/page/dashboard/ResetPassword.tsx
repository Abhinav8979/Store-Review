import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../../zod schema/resetPasswordSchema";

const ResetPassword: React.FC = () => {
  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log("Reset Password Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <div className="w-full max-w-md p-6 bg-[var(--card)] rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-center text-[var(--primary)] mb-6">
          Reset Password
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Old Password"
              type="password"
              {...methods.register("oldPassword")}
              error={errors.oldPassword?.message}
            />

            <Input
              label="New Password"
              type="password"
              {...methods.register("newPassword")}
              error={errors.newPassword?.message}
            />

            <Input
              label="Confirm Password"
              type="password"
              {...methods.register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="hover:opacity-90 transition"
            >
              Reset Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ResetPassword;
