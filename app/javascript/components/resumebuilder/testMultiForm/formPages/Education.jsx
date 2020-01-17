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

export default class Education extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { educationValues, handleChange } = this.props;
    return (
      <div>
           <Animated animationIn="fadeInRight" animationOut="fadeOutRight">
       <Header as="h3">Where did u study?</Header>
        <Form>
          <Form.Input
            fluid
            icon="address card"
            iconPosition="left"
            label="Instituition Name"
            placeholder="Instituition Name"
            name="institution"
            value={educationValues.instituition}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="book"
            iconPosition="left"
            label="Program"
            placeholder="Program"
            name="program"
            value={educationValues.program}
            onChange={handleChange}
          />
          <Form.Group widths="equal">
            {" "}
            <Form.Input
              fluid
              icon="calendar"
              iconPosition="left"
             label="Start date"
              placeholder="Start date"
              name="startEdu"
              value={educationValues.startEdu}
              onChange={this.props.handleChange}
            />
            <Form.Input
              fluid
              icon="calendar"
              iconPosition="left"
              placeholder="End date"
              label="End date"
              name="endEdu"
              value={educationValues.endEdu}
              onChange={this.props.handleChange}
            />
          </Form.Group>
        </Form>
        </Animated>
      </div>
    );
  }
}
