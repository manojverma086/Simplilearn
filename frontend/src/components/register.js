import React, { Component } from "react";

export default class Register extends Component {
  showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
  };
  showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <h2>Register with us</h2>
          <div className="form-control">
            <label for="name">Name </label>
            <input type="text" name="name" id="name" placeholder="Enter name" />
            <small>Error message</small>
          </div>
          <div className="form-control">
            <label for="email">Email </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
            />
            <small>Error message</small>
          </div>
          <div className="form-control">
            <label for="password">Password </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
            <small>Error message</small>
          </div>
          <div className="form-control">
            <label for="password2">Name </label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Enter password again"
            />
            <small>Error message</small>

            <button type="submit">Register</button>
          </div>

          <div className="form-control">Already have an account?</div>
        </div>
      </div>
    );
  }
}
