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
import MainBody from "./components/layouts/MainBody";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <MainBody>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
            </MainBody>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
