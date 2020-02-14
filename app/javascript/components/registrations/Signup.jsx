import UserContext from "../../contexts/UserContext";
import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Message
} from "semantic-ui-react";
import { Animated } from "react-animated-css";
import { withRouter } from "react-router-dom";


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
      <Animated animationIn="fadeIn" isVisible={true}>
        <Grid
          textAlign="center"
          style={{ marginTop: "2em" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Icon name="edit" size="massive" />
            <Header as="h2" color="teal" textAlign="center">
              Sign Up
            </Header>
            {this.state.errors.length > 0
            ? (
              <Message
                error
                header='There was some errors with your submission'
                list={this.state.errors}
              />       
              )
            : (<span></span>)
            }
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
                  onClick={this.redirectHome}
                ></Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Animated>
    );
  }
}
Signup.contextType = UserContext;

export default withRouter(Signup);
