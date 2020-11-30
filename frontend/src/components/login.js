import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../common/utils";

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

function Login(props) {
  const email = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/users/login", {
        email: email.value,
        password: password.value,
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
          <label for="email">Email </label>
          <input
            type="text"
            name="email"
            value={email.value}
            onChange={email.setValue}
            placeholder="Enter email"
          />
        </div>
        <div className="form-control">
          <label for="password">Password </label>
          <input
            type="password"
            name="password"
            value={password.value}
            onChange={password.setValue}
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
        <button
          type="button"
          value={loading ? "Loading..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </button>
        <br />
      </div>
    </div>
  );
}

export default Login;
