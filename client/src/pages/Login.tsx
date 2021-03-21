import React, { ReactElement } from "react";
import LoginForm from "../components/LoginForm";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
