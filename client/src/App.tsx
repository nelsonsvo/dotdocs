import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/ApolloClient";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <div className="">
              <Route path="/dashboard" component={Dashboard} />
              <Sidebar />
            </div>
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
