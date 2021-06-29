import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface PageAuthProps {
  page: string;
}

const PageAuth: React.FC<PageAuthProps> = ({ children, page }) => {
  const { auth } = useContext(AuthContext);

  const isAuth = auth?.permissions?.includes(page.toUpperCase() + "_TRUE");

  return isAuth ? <>{children}</> : <Redirect to="/"></Redirect>;
};

export default PageAuth;
