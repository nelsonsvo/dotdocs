import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/ApolloClient";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <div className="overflow-y-auto">
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Sidebar />
            </div>
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
