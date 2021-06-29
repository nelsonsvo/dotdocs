import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Pages } from "../../util/Pages";

interface PageAuthProps {
  page: Pages;
}

const PageAuth: React.FC<PageAuthProps> = ({ children, page }) => {
  const { auth } = useContext(AuthContext);

  const isAuth = auth?.permissions?.includes(page + "_TRUE");

  return isAuth ? <>{children}</> : <Redirect to="/"></Redirect>;
};

export default PageAuth;
