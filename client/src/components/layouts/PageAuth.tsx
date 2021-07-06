import React from "react";
import { Redirect } from "react-router-dom";
import { Pages } from "../../util/Pages";

interface PageAuthProps {
  page: Pages;
}

const PageAuth: React.FC<PageAuthProps> = ({ children, page }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);

  const isAuth = permissions.includes(page + "_TRUE");

  return isAuth ? <>{children}</> : <Redirect to="/"></Redirect>;
};

export default PageAuth;
