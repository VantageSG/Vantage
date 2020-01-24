import React, { Component } from "react";
import {
  Container,
} from "semantic-ui-react";
import About from "./formPages/About";
import Education from "./formPages/Education";
import WorkExperience from "./formPages/WorkExperience";
import Skills from "./formPages/Skills";
import Interests from "./formPages/Interests";
import ConfirmationPage  from "./formPages/ConfirmationPage";

export default class FormStep extends Component {

  // 0 - About me
  // 1 - Edu
  // 2 - work Exp
  // 3 - skills
  // 4 - interest
  // 5 - confirmation page
  constructor(props) {
    super(props);
    this.state = {
      maxStep: 5,
      step: 5,
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
      /// Work Experience (list of work experience)
      workExperience: [],
      title: "",
      company: "",
      start: "",
      end: "",
      achievements: "",
      /// Skills (List of Skills)
      skills: [],
      skillName: "",
      description: "",
      link: "",
      /// interest
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

  goToAboutMe = () => {
    const { step } = this.state;
    this.setState({ step: 0});
  }

  goToEducation = () => {
    const { step } = this.state;
    this.setState({ step: 1});
  }

  goToWorkExperience= () => {
    const { step } = this.state;
    this.setState({ step: 2});
  }

  goToSkills= () => {
    const { step } = this.state;
    this.setState({ step: 3});
  }

  goToInterests= () => {
    const { step } = this.state;
    this.setState({ step: 4});
  }



  handleChange = event => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value
    });
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

    {
      switch (step) {
        case 0:
          return (
            <Container text>
              <About
                submitAndContinue={this.submitAndContinue}
                step={step}
                maxStep={maxStep}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
              />
            </Container>
          );

        case 1:
          return (
            <Container text>
              <Education
                submitAndContinue={this.submitAndContinue}
                step={step}
                maxStep={maxStep}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
              ></Education>
            </Container>
          );
        case 2:
          return (
            <Container text>
              <WorkExperience
                submitAndContinue={this.submitAndContinue}
                step={step}
                maxStep={maxStep}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
              ></WorkExperience>
            </Container>
          );
        case 3:
          return (
            <Container text>
              <Skills
                submitAndContinue={this.submitAndContinue}
                step={step}
                maxStep={maxStep}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
              ></Skills>
            </Container>
          );

        case 4:
          return (
            <Container text>
              <Interests
                submitAndContinue={this.submitAndContinue}
                step={step}
                maxStep={maxStep}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
              ></Interests>
            </Container>
          );

        case 5: 
        return (
          <Container text>
     
            <ConfirmationPage 
            submitAndContinue={this.submitAndContinue}
                step={step}
                maxStep={maxStep}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                goToAboutMe={this.goToAboutMe}
                
                goToEducation={this.goToEducation}
                goToWorkExperience={this.goToWorkExperience}
                goToSkills={this.goToSkills}
                goToInterests={this.goToInterests}
            >
            </ConfirmationPage>
            </Container>  
        );
      }
    }
  }
}
