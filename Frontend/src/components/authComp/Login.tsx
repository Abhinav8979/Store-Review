import React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { signup } from "../../constants/path";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // <-- get reset from RHF
  } = useFormContext();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
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
          {/* Email Input */}
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="hover:opacity-90 transition"
          >
            Login
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
