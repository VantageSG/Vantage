import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Transition,
  Header
} from "semantic-ui-react";
import { Animated } from "react-animated-css";

export default class FormPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraph: "",
      firstName: "",
      lastName: "",
      email: ""
    };
  }
  render() {
    const { firstName, lastName,  email, password } = this.state;
    return (
      <div>
        <Animated animationIn="fadeIn">
        <Header as="h3">Enter your credentials</Header>
        <Form>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="First Name"
            name="firstName"
            value={this.props.firstName}
            onChange={this.props.handleChange}
          />
           <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="last Name"
            name="lastName"
            value={this.props.lastName}
            onChange={this.props.handleChange}
          />
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.props.handleChange}
          />

          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.props.handleChange}
          />
        </Form>
        </Animated>
      </div>
    );
  }
}
