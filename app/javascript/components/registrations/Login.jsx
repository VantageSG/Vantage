import UserContext from "../../contexts/UserContext";
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import { Animated } from "react-animated-css";

// Login Component that consists of Login Form
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: ""
    };
  }

  redirectHome = () => {
    this.props.history.push("/");
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    let user = {
      username: username,
      email: email,
      password: password
    };
    this.context.login(user, this.redirectHome, error => {
      this.setState({
        error: error
      });
    });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div className="formBox">
        <h2 className="header">Log in to Vantage</h2>
        {this.state.error && (
          <p className="errorMessage">We encountered an error logging you in: {this.state.error}</p>
        )}
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            placeholder="Username"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <button data-testid="loginButton" className="submitButton">Log In</button>
          <p className="footerMessageBox">
            <Link to="/">
              <span className="footerMessage">
                Forgot Password?
              </span>
            </Link>
            <span className="dotSpacing"></span>
            <Link to="/sign-up">
              <span className="footerMessage">
                Sign Up for Vantage
              </span>
            </Link>
          </p>
        </Form>
      </div>
    );
  }
}
Login.contextType = UserContext;

export default withRouter(Login);
