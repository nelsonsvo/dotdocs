import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext, IAuth } from "./context/AuthContext";
import { client } from "./graphql/ApolloClient";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Retrieval from "./pages/Retrieval";
import Settings from "./pages/Settings";

function App() {
  const [auth, setAuth] = useState<IAuth>({
    loggedIn: false,
    userType: null,
    timeLoggedIn: null,
  });

  const setUserAuth = (isAuth: boolean, userType?: string) => {
    if (isAuth && userType) {
      const timeLogged = new Date().getTime();
      localStorage.setItem("isAuth", isAuth.toString());
      localStorage.setItem("userType", userType);
      localStorage.setItem("timeLoggedIn", timeLogged.toString());
      setAuth({
        loggedIn: isAuth,
        userType,
        timeLoggedIn: timeLogged,
      });
    } else {
      localStorage.setItem("isAuth", isAuth.toString());
      setAuth({
        loggedIn: isAuth,
        userType: null,
        timeLoggedIn: null,
      });
    }
  };

  //match state and localstorage after page refresh
  useEffect(() => {
    if (!auth.loggedIn && auth.userType === null && auth.timeLoggedIn === null) {
      setAuth({
        loggedIn: Boolean(localStorage.getItem("isAuth")),
        userType: localStorage.getItem("userType"),
        timeLoggedIn: Number(localStorage.getItem("timeLoggedIn")),
      });
    }
  }, [auth]);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <AuthContext.Provider value={{ auth, setUserAuth }}>
              <Route exact path="/" component={Login} />
              <ProtectedRoute>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/settings" component={Settings} />
                <Route path="/retrieval/:id?" component={Retrieval} />
                <Route path="/index/:id?" component={Index} />
              </ProtectedRoute>
            </AuthContext.Provider>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
