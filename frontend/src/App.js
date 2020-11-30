import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";

import {
  getUser,
  getToken,
  removeUserSession,
  setUserSession,
} from "./common/utils";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    //props.history.push("/login");
  };
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    //We can write code to verify token here
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          {user && (
            <>
              {" "}
              Welcome {user.name}!<br />
              <br />
              <input type="button" onClick={handleLogout} value="Logout" />
            </>
          )}
          {!user && (
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
