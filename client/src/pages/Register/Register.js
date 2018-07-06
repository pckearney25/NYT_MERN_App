import React, { Component } from "react";
import "../Login/Login.css";
import API from "../../utils/API";

class Create extends Component {
  //constructor() {
  //super();
  //this.
  state = {
    username: "",
    password: "",
    message: ""
  };
  //}
  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    API.registerSubmit({ username, password }).then(result => {
      if (result.data.success) {
        this.props.history.push("/login");
      } else {
        this.setState({ message: result.data.msg });
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
          <h2 className="form-signin-heading">Register</h2>
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
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Create;
