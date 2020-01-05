import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";

import { Animated } from "react-animated-css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: "",
      password: "",
      errors: ""
    };
  }
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(name + " " + value);
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

    axios
      .post(
        process.env.BACKEND_PORT + '/api/v1/login/',
        { user },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors
          });
        }
      })
      .catch(error => console.log("api errors:", error));
  };
  redirect = () => {
    this.props.history.push("/");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <Animated animationIn="fadeIn" isVisible={true}>
          <Grid
            textAlign="center"
            style={{ marginTop: "2em" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Icon loading name="user" size="massive" />
              <Header as="h2" color="teal" textAlign="center">
                Log In
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                  />

                  <Button color="teal" fluid size="large" type="submit">
                    submit
                  </Button>
                  <Message>
                    <p>New to us?</p> <Link to="/signup"> Sign Up</Link>
                  </Message>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Animated>
        <div>{this.state.errors ? this.handleErrors() : null}</div>

        {/* <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to="/signup">sign up</Link>
          </div>
        </form>*/}
      </div>
    );
  }
}
export default Login;
