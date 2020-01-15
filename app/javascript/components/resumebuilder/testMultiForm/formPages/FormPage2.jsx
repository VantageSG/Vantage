import React, { Component } from "react";
import { Form, Segment, Button, Container, Header, TextArea } from "semantic-ui-react";
import { Animated } from "react-animated-css";

export default class FormPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question2: ""
    };
  }
  render() {
 
    return (
      <div>
        <Animated animationIn="fadeInUp">

     
        <Form>
        <Header as='h3'>What is your deepest desire</Header>
          <TextArea
            placeholder="Tell us more"
            name="question2"
            value={this.props.question2}
            onChange={this.props.handleChange}
          />
        </Form>
        </Animated>
      </div>
    );
  }
}
