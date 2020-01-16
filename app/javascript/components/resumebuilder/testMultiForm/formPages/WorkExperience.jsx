import React, { Component } from "react";
import { Form, Segment, Button, Container, Header, TextArea } from "semantic-ui-react";
import { Animated } from "react-animated-css";

export default class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question3: ""
    };
  }
  render() {
    const {workExperienceValues, handleChange} = this.props;
    return (
      <div>
      <Animated animationIn="fadeInLeft" animationOut="fadeOutDown">
        <Form>
        <Header as='h3'>Where have you worked before?</Header>
       
          <Form.Input
            fluid
            icon="address card"
            label="Name of Position"
            iconPosition="left"
            placeholder="Name of Position"
            name="title"
            value={workExperienceValues.instituition}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="book"
            label="Company"
            iconPosition="left"
            placeholder="Company"
            name="company"
            value={workExperienceValues.program}
            onChange={handleChange}
          />
          <Form.Group widths="equal">
            {" "}
            <Form.Input
              fluid
              icon="calendar"
              label="Start Date"
              iconPosition="left"
              placeholder="Start date"
              name="start"
              value={workExperienceValues.start}
              onChange={this.props.handleChange}
            />
            <Form.Input
              fluid
              icon="calendar"
              iconPosition="left"
              label="End date"
              placeholder="End date"
              name="end"
              value={workExperienceValues.end}
              onChange={this.props.handleChange}
            />
          </Form.Group>
   
        </Form>
        </Animated>
      </div>
    );
  }
}
