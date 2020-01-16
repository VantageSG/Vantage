import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Transition,
  Header,
   TextArea
} from "semantic-ui-react";
import { Animated } from "react-animated-css";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  render() {
    const { aboutValues, handleChange } = this.props;
    

    return (
      <div>
          <Animated animationIn={"fadeInDown"} animationOut="fadeOutUp">
        <Header as="h3">Introduce yourself</Header>
        <Form>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={aboutValues.name}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={aboutValues.email}
            onChange={handleChange}
          />

          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Contact Number (number only)"
            label="Contact Number"
            name="contactNumber"
            type="number"
      
            value={aboutValues.contactNumber}
            onChange={this.props.handleChange}
          />
          <Header as="h4">Describe yourself</Header>
           <TextArea
   
     
            
            placeholder="About Me"
            name="aboutMe"
            value={aboutValues.aboutMe}
            onChange={this.props.handleChange}
          />
        </Form>
        </Animated>
      </div>
    );
  }
}
