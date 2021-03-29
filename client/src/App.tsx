import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { client } from "./graphql/ApolloClient";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { Retrieval } from "./pages/Retrieval";
import Settings from "./pages/Settings";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route path="/retrieval" component={Retrieval} />
            <Route path="/index" component={Index} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
