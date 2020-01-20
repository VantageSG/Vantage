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


export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: {
        skillName: "",
        description: "",
        link: "",
      }
    };
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    console.log(this.state.skills);
    this.setState({
      skills: {
        ...this.state.skills,
        [name]: value
      }
    });
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    //Call post backend api /api/v1/about...
  }
  render() {
    const skillsValue = this.state.skills

    return (
      <div>
        <Card centered fluid>
          <Segment>
            <Animated animationIn="fadeInRight" animationOut="fadeOutDown">
              <Header as="h3">What are some skills you have?</Header>
              <Form>
                <Form.Input
                  fluid
                  placeholder="Enter skill"
                  label="Skill"
                  name="skillName"
                  value={skillsValue.skillName}
                  onChange={this.handleFormChange}
                />
                <Header as="h4">Describe your skill</Header>
                <TextArea
                  placeholder="Describe it"
                  name="description"
                  value={skillsValue.description}
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
