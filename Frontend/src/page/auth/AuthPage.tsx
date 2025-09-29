import React from "react";
import { useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Login from "../../components/authComp/Login";
import Signup from "../../components/authComp/SignUp";
import { login } from "../../constants/path";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "../../zod schema/authSchema";

const Auth: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isLogin = pathname === login;

  const methods = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    mode: "onSubmit",
    defaultValues: isLogin
      ? {
          email: "",
          password: "",
        }
      : {
          name: "",
          email: "",
          password: "",
          address: "",
        },
  });
  return (
    <FormProvider {...methods}>{isLogin ? <Login /> : <Signup />}</FormProvider>
  );
};

export default Auth;
