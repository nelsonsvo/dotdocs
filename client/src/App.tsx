import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/ApolloClient";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SettingSectionCard from "./components/ui/SettingSectionCard";
import Applications from "./components/settings/Applications";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/settings/application">
              <Settings>
                <Applications />
              </Settings>
            </Route>
          </div>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
