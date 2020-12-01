import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { setUserSession } from "../common/utils";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of register form
  const handleRegister = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/users/register", {
        name: name,
        email: email,
        password: password,
        password2: password2,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register with us</h2>
        <div
          className={
            error && error.name ? "form-control error" : "form-control"
          }
        >
          <label htmlFor="name">Name </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <small>{error ? error.name : ""}</small>
        </div>
        <div
          className={
            error && error.email ? "form-control error" : "form-control"
          }
        >
          <label htmlFor="email">Email </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>{error ? error.email : ""}</small>
        </div>
        <div
          className={
            error && error.password ? "form-control error" : "form-control"
          }
        >
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>{error ? error.password : ""}</small>
        </div>
        <div
          className={
            error && error.password2 ? "form-control error" : "form-control"
          }
        >
          <label htmlFor="password2">Name </label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Enter password again"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <small>{error ? error.password2 : ""}</small>

          <button type="button" onClick={handleRegister} disabled={loading}>
            Register
          </button>
        </div>

        <div className="form-control">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
