import React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { dashboard, signup } from "../../constants/path";
import { useLogin } from "../../services/auth/authMutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();

  const navigate = useNavigate();

  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit = (data: any) => {
    loginUser(data, {
      onSuccess: (res: any) => {
        toast.success("Login successful!");
        localStorage.setItem("token", res.token);
        reset();
        navigate(dashboard);
      },
      onError: (error: any) => {
        toast.error(error?.message || "Login failed. Please try again.");
      },
    });
  };

  const handleSignupClick = () => {
    reset();
    navigate(signup);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[var(--background)]">
      <div className="w-full max-w-md p-6 bg-[var(--card)] rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-center text-[var(--primary)] mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
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
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-center text-[var(--text-secondary)] mt-4">
          Don’t have an account?{" "}
          <Button
            variant="ghost"
            onClick={handleSignupClick}
            className="text-[var(--primary)] hover:underline"
          >
            Signup
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
