import React, { Component } from "react";
import { Form, Segment, Button, Container, Header, TextArea } from "semantic-ui-react";
import { Animated } from "react-animated-css";

export default class Interests extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
 
    const { interestsValue, handleChange } = this.props;

    return (
      <div>
        <Animated animationIn="fadeInUp" animationOut="fadeOutDown">
        <Header as="h3">What are some interests you have?</Header>
        <Form>
          <Form.Input
            fluid
            placeholder="Enter skill"
            label="Skill"
            name="skill"
            value={interestsValue.interestsName}
            onChange={this.props.handleChange}
          />
          </Form>
          </Animated>
      </div>
    );
  }
}
