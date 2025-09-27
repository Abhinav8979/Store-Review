import React from "react";
import { useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Login from "../../components/authComp/Login";
import Signup from "../../components/authComp/SignUp";
import { login } from "../../constants/path";
import { authSchema, type AuthFormData } from "../../zod schema/authSchema";

const Auth: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const methods = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
    },
  });

  return (
    <FormProvider {...methods}>
      {pathname === login ? <Login /> : <Signup />}
    </FormProvider>
  );
};

export default Auth;
