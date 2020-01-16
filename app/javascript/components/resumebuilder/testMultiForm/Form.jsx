import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Card,
  Modal,
  Header,
  Image
} from "semantic-ui-react";
import About from "./formPages/About";
import Education from "./formPages/Education";
import WorkExperience from "./formPages/WorkExperience";
import Skills from "./formPages/Skills";
import Interests from "./formPages/Interests";
import { Animated } from "react-animated-css";

const FormActionButtons = props => {
  return (
    <div className="ui two buttons">
      <Button
        color="red"
        onClick={props.previousStep}
        content="previous"
      ></Button>
      <Button.Or />

      {props.step === props.maxStep ? (
        <ModalConfirm
          props={props}
          color="green"
          onClick={props.submitAndContinue}
          content="Confirm and Submit"
        ></ModalConfirm>
      ) : (
        <Button color="orange" onClick={props.nextStep} content="next"></Button>
      )}
    </div>
  );
};

const ModalConfirm = props => {
  console.log(props);
  return (
    <Modal
      trigger={
        <Button
          color="green"
          onClick={props.submitAndContinue}
          content="Confirm and Submit"
        ></Button>
      }
      centered={false}
    >
      <Modal.Header>Please Confirm your details!</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
        />
        <Modal.Description>
          <Header>The following are your details!</Header>

          <p>Is it okay?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default class FormStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxStep: 4,
      step: 0,
      /// about me
      name: "",
      email: "",
      contactNumber: "",
      aboutMe: "",
      /// education (list of education)
      education: [],
      program: "",
      institution: "",
      startEdu: "",
      endEdu: "",
      grade: "",
      // Work Experience (list of work experience)
      workExperience: [],
      title: "",
      company: "",
      start: "",
      end: "",
      achievements: "",
      //Skills (List of Skills)
      skills: [],
      skillName: "",
      description: "",
      link: "",
      //interest
      interests: [],
      interestName: ""
    };
  }

  nextStep = () => {
    //fire off event to backend here
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  previousStep = () => {
    const { step } = this.state;
    if (step > 0) {
      this.setState({ step: step - 1 });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value
    });
  };

  submitAndContinue = event => {
    return (
      <Modal centered={false}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    const { step, maxStep } = this.state;

    const { name, email, contactNumber, aboutMe } = this.state;
    const aboutValues = { name, email, contactNumber, aboutMe };

    const {
      education,
      program,
      institution,
      startEdu,
      endEdu,
      grade
    } = this.state;
    const educationValues = {
      education,
      program,
      institution,
      startEdu,
      endEdu,
      grade
    };

    const {
      workExperience,
      title,
      company,
      start,
      end,
      achievements
    } = this.state;
    const workExperienceValues = {
      workExperience,
      title,
      company,
      start,
      end,
      achievements
    };

    const { skills, skillName, description, link } = this.state;
    const skillsValue = { skills, skillName, description, link };

    const { interests, interestName } = this.state;
    const interestsValue = { interests, interestName };

    {
      switch (step) {
        case 0:
          return (
            <Container text>
              <Card centered fluid>
                <Segment>
                  <About
                    aboutValues={aboutValues}
                    handleChange={this.handleChange}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                  />
                </Segment>
                <Card.Content extra>
                  <FormActionButtons
                    submitAndContinue={this.submitAndContinue}
                    step={step}
                    maxStep={maxStep}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                  />
                </Card.Content>
              </Card>
            </Container>
          );

        case 1:
          return (
            <Container text>
              <Card centered fluid>
                <Segment>
                  <Education
                    educationValues={educationValues}
                    handleChange={this.handleChange}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                  ></Education>
                </Segment>
                <Card.Content extra>
                  <FormActionButtons
                    submitAndContinue={this.submitAndContinue}
                    step={step}
                    maxStep={maxStep}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                  />
                </Card.Content>
              </Card>
            </Container>
          );
        case 2:
          return (
            <Container text>
              <Card centered fluid>
                <Segment>
                  <WorkExperience
                    workExperienceValues={workExperienceValues}
                    handleChange={this.handleChange}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                  ></WorkExperience>
                </Segment>
                <Card.Content extra>
                  <FormActionButtons
                    submitAndContinue={this.submitAndContinue}
                    step={step}
                    maxStep={maxStep}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                  />
                </Card.Content>
              </Card>
            </Container>
          );
        case 3:
          return (
            <Container text>
              <Card centered fluid>
                <Segment>
                  <Skills
                    skillsValue={skillsValue}
                    handleChange={this.handleChange}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                  ></Skills>
                </Segment>
                <Card.Content extra>
                  <FormActionButtons
                    submitAndContinue={this.submitAndContinue}
                    step={step}
                    maxStep={maxStep}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                  />
                </Card.Content>
              </Card>
            </Container>
          );

        case 4:
          return (
            <Container text>
              <Card centered fluid>
                <Segment>
                  <Interests
                    interestsValue={interestsValue}
                    handleChange={this.handleChange}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                  ></Interests>
                </Segment>
                <Card.Content extra>
                  <FormActionButtons
                    interestsValue={interestsValue}
                    submitAndContinue={this.submitAndContinue}
                    workExperienceValues={workExperienceValues}
                    skillsValue={skillsValue}
                    educationValues={educationValues}
                    step={step}
                    maxStep={maxStep}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                  />
                </Card.Content>
              </Card>
            </Container>
          );
      }
    }
  }
}
