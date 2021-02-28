import React, { ReactElement } from "react";
import LoginForm from "../components/LoginForm";

interface Props {}

export default function Login({}: Props): ReactElement {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
