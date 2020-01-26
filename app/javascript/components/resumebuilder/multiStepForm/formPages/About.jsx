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
import FormActionButtons from "../frontEndUtil/FormActionButtons"
import { Animated } from "react-animated-css";

const aboutSchema = {
  name: "",
  email: "",
  contactNumber: "",
  aboutMe: ""
}
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: aboutSchema
    };
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    console.log(this.state.about)
    this.setState({
      about: {
        ...this.state.about,
        [name]: value,
      }
    });
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    //Call post backend api /api/v1/about...
  }

  render() {
    const aboutValues = this.state.about
    

    return (
      <div>
        <Card centered fluid>
          <Segment>
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
                  onChange={this.handleFormChange}
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
                  onChange={this.handleFormChange}
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
                  onChange={this.handleFormChange}
                />
                <Header as="h4">Describe yourself</Header>
                <TextArea
                  placeholder="About Me"
                  name="aboutMe"
                  value={aboutValues.aboutMe}
                  onChange={this.handleFormChange}
                />
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
