import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { login } from "../../constants/path";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../services/auth/authMutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();

  const navigate = useNavigate();

  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: any) => {
    signUp(data, {
      onSuccess: () => {
        toast.success("Signup successful!");
        handleLoginClick();
      },
      onError: (error: any) => {
        toast.error(error?.message || "Signup failed. Please try again.");
      },
    });
  };

  const handleLoginClick = () => {
    reset();
    navigate(login);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[var(--background)]">
      <div className="w-full max-w-md p-6 bg-[var(--card)] rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Address"
            type="text"
            {...register("address")}
            error={errors.address?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="hover:opacity-90 transition"
            disabled={isPending}
          >
            {isPending ? "Signing up..." : "Signup"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Button
            variant="ghost"
            onClick={handleLoginClick}
            className="text-[var(--primary)] hover:underline"
          >
            Login
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
