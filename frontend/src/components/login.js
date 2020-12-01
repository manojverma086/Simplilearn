import React, { useState, useEffect } from "react";
import axios from "axios";
import { setUserSession } from "../common/utils";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <div className="form-control">
          <label htmlFor="email">Email </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <button type="button" onClick={handleLogin} disabled={loading}>
          Login
        </button>
        <br />
        Don't have account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
