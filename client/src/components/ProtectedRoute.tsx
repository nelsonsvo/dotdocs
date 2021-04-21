import { useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { AuthContext, IAuthContext } from "../context/AuthContext";
import { ME } from "../graphql/queries/Login";

//this component is a wrapper component to pass protected routes through
interface ProtectedRouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth, setUserAuth } = useContext<IAuthContext>(AuthContext);
  const [checkCookie] = useLazyQuery(ME, {
    fetchPolicy: "network-only",
    onError: () => setUserAuth(false),
  });

  //check if cookie has expired every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkCookie();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return auth.loggedIn || Boolean(localStorage.getItem("isAuth")) ? (
    <>{children}</>
  ) : (
    <Redirect to="/" />
  );
};
export default ProtectedRoute;
