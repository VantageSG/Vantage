import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Link,
  Icon
} from "semantic-ui-react";
import { Animated } from "react-animated-css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: ""
    };
  }
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
    axios
      .post(
        process.env.BACKEND_PORT + "/api/v1/users/",
        { user },
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleLogin(response);
        this.redirect();
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

  goHome = () => {
    this.props.history.push("/");
  };
  render() {
    const { username, email, password, password_confirmation } = this.state;
    return (
      <div>
        <Animated animationIn="fadeIn" isVisible={true}>
          <Grid
            textAlign="center"
            style={{ marginTop: "2em" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Icon loading name="edit" size="massive" />

              <Header as="h2" color="teal" textAlign="center">
                Sign Up
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
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="password confirmation"
                    type="password"
                    name="password_confirmation"
                    value={password_confirmation}
                    onChange={this.handleChange}
                  />

                  <Button color="teal" fluid size="large" type="submit">
                    Sign Up
                  </Button>
                  <br></br>
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    icon="home"
                    content="home"
                    onClick={this.goHome}
                  ></Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Animated>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    );
  }
}
export default Signup;
