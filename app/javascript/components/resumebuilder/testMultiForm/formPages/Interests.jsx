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

export default class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: {
        interestName: ""
      }
    };
    
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    console.log(this.state.interests);
    this.setState({
      interests: {
        ...this.state.interests,
        [name]: value
      }
    });
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    //Call post backend api /api/v1/about...
  }


  render() {
    const interestsValue = this.state.interests

    return (
      <div>
        <Card centered fluid>
          <Segment>
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
