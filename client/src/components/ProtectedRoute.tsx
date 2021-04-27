import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { AuthContext, IAuthContext } from "../context/AuthContext";
import { useMeLazyQuery } from "../generated/graphql";

//this component is a wrapper component to pass protected routes through
interface ProtectedRouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth, setUserAuth } = useContext<IAuthContext>(AuthContext);
  const [checkCookie] = useMeLazyQuery({
    fetchPolicy: "network-only",
    onError: () => {
      setUserAuth(false);
    },
  });

  //check if cookie has expired every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkCookie();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return auth.loggedIn === true || localStorage.getItem("isAuth") === "true" ? (
    <>{children}</>
  ) : (
    <Redirect to="/" />
  );
};
export default ProtectedRoute;
