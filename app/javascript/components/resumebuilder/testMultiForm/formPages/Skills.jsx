import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Header,
  TextArea
} from "semantic-ui-react";
import { Animated } from "react-animated-css";

export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question3: ""
    };
  }
  render() {
    const { skillsValue, handleChange } = this.props;

    return (
      <div>
         <Animated animationIn="fadeInRight" animationOut="fadeOutDown">
        <Header as="h3">What are some skills you have?</Header>
        <Form>
          <Form.Input
            fluid
            placeholder="Enter skill"
            label="Skill"
            name="skillName"
            value={skillsValue.skillName}
            onChange={handleChange}
          />
          <Header as="h4">Describe your skill</Header>
          <TextArea
            placeholder="Describe it"
            name="description"
            value={skillsValue.description}
            onChange={handleChange}
          />
        </Form>
        </Animated>
      </div>
    );
  }
}
