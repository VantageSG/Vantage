import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Card,
  Modal,
  Header,
  Image,
  TextArea
} from "semantic-ui-react";
import FormActionButtons from "../FormActionButtons"
import { Animated } from "react-animated-css";

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: {
        program: "",
        institution: "",
        startEdu: "",
        endEdu: "",
        grade: "",
      }
    }
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    console.log(this.state.education);
    this.setState({
      education: {
        ...this.state.education,
        [name]: value
      }
    });
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    //Call post backend api /api/v1/education...
  }

  render() {
    const educationValues = this.state.education
    const { handleChange } = this.props;
    return (
      <Card centered fluid>
        <Segment>
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
                onChange={this.handleFormChange}
              />
              <Form.Input
                fluid
                icon="book"
                iconPosition="left"
                label="Program"
                placeholder="Program"
                name="program"
                value={educationValues.program}
                onChange={this.handleFormChange}
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
                  onChange={this.handleFormChange}
                />
                <Form.Input
                  fluid
                  icon="calendar"
                  iconPosition="left"
                  placeholder="End date"
                  label="End date"
                  name="endEdu"
                  value={educationValues.endEdu}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
            </Form>
          </Animated>
        </Segment>
        <Card.Content extra>
          <FormActionButtons
            submitAndContinue={this.props.submitAndContinue}
            step={this.props.step}
            maxStep={this.props.maxStep}
            nextStep={this.nextStepWApiReq}
            previousStep={this.props.previousStep}
          />
        </Card.Content>
      </Card>
    );
  }
}
