import UserContext from "../../contexts/UserContext";
import React, { Component } from "react";
import {
  Form,
  Message,
} from "semantic-ui-react";
import { Animated } from "react-animated-css";
import { withRouter, Link } from "react-router-dom";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: []
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
    const { username, email, password, password_confirmation } = this.state;
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    };
    this.context.signup(user, this.redirectHome, (error) => {
      this.setState({errors: Array.isArray(error) ? error : [error] })
    });
  };

  render() {    
    const { username, email, password, password_confirmation } = this.state;    
    return (      
      <div className="formBox">
        <h2 className="header">Sign up with Vantage</h2>
        {this.state.errors.length > 0
        ? (
          <p className="errorMessage">We can't sign you up:
          <ul>
            {this.state.errors.map(msg => {
              return (
                <li>{msg}</li>
              )
            })}
          </ul>
          </p> 
          )
        : (<span></span>)
        }
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
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              placeholder="Password Confirmation"
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
            />
            <button className="submitButton">Sign Up</button>
          <p className="footerMessageBox">
            <Link to="/login">
              <span className="footerMessage">
                Already have an account?
              </span>
            </Link>
          </p>
        </Form>
      </div>
    );
  }
}
Signup.contextType = UserContext;

export default withRouter(Signup);
