import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import API from "../../utils/API";

class Login extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    API.loginSubmit({ username, password })
      .then(result => {
        //PCK added next four lines
        console.log("Result: " + result);
        const resString = JSON.stringify(result);
        console.log("Result String: " + resString);
        console.log("Token: " + result.data.token);
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ message: "" });

        this.props.history.push("/");
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            message: error.response.data.msg
          });
        }
      });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          {message !== "" && (
            <div className="alert alert-warning alert-dismissible" role="alert">
              {message}
            </div>
          )}
          <h2 className="form-signin-heading">Please sign into my page.</h2>
          <label for="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email address"
            name="username"
            value={username}
            onChange={this.onChange}
            required
          />
          <label for="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
          <p>
            Not a member?{" "}
            <Link to="/register">
              <span
                className="glyphicon glyphicon-plus-sign"
                aria-hidden="true"
              />{" "}
              Register here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
