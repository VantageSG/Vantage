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
    this.context.login(user, this.redirectHome, (error) => {
      this.setState({        
        error: error
      })
    })    
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <Animated animationIn="fadeIn" isVisible={true}>
        <Grid
          textAlign="center"
          style={{ marginTop: "2em" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Icon name="user" size="massive" />
            <Header as="h2" color="teal" textAlign="center">
              Log In
            </Header>
            {this.state.error
            ? (
              <Message negative>
                <Message.Header>We can't log you in:</Message.Header>
                <p>{this.state.error}</p>  
              </Message>              
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
    );
  }
}
Login.contextType = UserContext;

export default withRouter(Login);
