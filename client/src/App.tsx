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
import Profile from "./pages/Profile";
import Retrieval from "./pages/Retrieval";
import Settings from "./pages/Settings";
import Viewer from "./pages/Viewer";

function App() {
  const [auth, setAuth] = useState<IAuth>({
    loggedIn: false,
    timeLoggedIn: null,
    permissions: [],
  });

  const clearAuthState = () => {
    setAuth({
      loggedIn: false,
      timeLoggedIn: null,
      permissions: [],
    });
  };

  const setUserAuth = (isAuth: boolean, permissions?: string[] | null | undefined) => {
    if (isAuth) {
      const timeLogged = new Date().getTime();
      localStorage.setItem("isAuth", isAuth.toString());
      localStorage.setItem("timeLoggedIn", timeLogged.toString());
      localStorage.setItem("permissions", JSON.stringify(permissions));
      setAuth({
        loggedIn: isAuth,
        timeLoggedIn: timeLogged,
        permissions: permissions,
      });
    } else {
      localStorage.setItem("isAuth", isAuth.toString());
      clearAuthState();
    }
  };

  //match state and localstorage after page refresh
  useEffect(() => {
    if (auth.loggedIn === false) {
      clearAuthState();
    } else {
      setAuth({
        loggedIn: localStorage.getItem("isAuth") === "true",
        timeLoggedIn: Number(localStorage.getItem("timeLoggedIn")),
        permissions: JSON.parse(localStorage.getItem("permissions")!),
      });
    }
  }, [auth.loggedIn]);

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
                <Route path="/viewer/:file" component={Viewer} />
                <Route path="/profile" component={Profile} />
              </ProtectedRoute>
            </AuthContext.Provider>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
