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


export default class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workExperience: {
        title: "",
        company: "",
        start: "",
        end: "",
        achievements: "",
      }
    };
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    console.log(this.state.workExperience);
    this.setState({
      workExperience: {
        ...this.state.workExperience,
        [name]: value
      }
    });
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    //Call post backend api /api/v1/about...
  }


  render() {
    const workExperienceValues = this.state.workExperience
    return (
      <div>
        <Card centered fluid>
          <Segment>
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
                  onChange={this.handleFormChange}
                />
                <Form.Input
                  fluid
                  icon="book"
                  label="Company"
                  iconPosition="left"
                  placeholder="Company"
                  name="company"
                  value={workExperienceValues.program}
                  onChange={this.handleFormChange}
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
                    onChange={this.handleFormChange}
                  />
                  <Form.Input
                    fluid
                    icon="calendar"
                    iconPosition="left"
                    label="End date"
                    placeholder="End date"
                    name="end"
                    value={workExperienceValues.end}
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
      </div>
    );
  }
}
