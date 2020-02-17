import React, { Component } from "react";
import { Container, Step, Icon, Responsive } from "semantic-ui-react";
import About from "./formPages/About";
import Education from "./formPages/Education";
import WorkExperience from "./formPages/WorkExperience";
import Skills from "./formPages/Skills";
import Interests from "./formPages/Interests";
import ConfirmationPage from "./formPages/ConfirmationPage";
import LoadingSpinner from "../../util/LoadingSpinner";

const StepIndicator = props => {
  const { vrsComponents, step, stepLink, maxStep } = props;

  const nameComponentMap = new Object();
  nameComponentMap["about"] = (
    <Step
      key="about"
      link
      active={step == 0 ? true : false}
      onClick={stepLink.goToAboutMe}
    >
      <Step.Content>
        <Step.Title>About Me</Step.Title>
        <Step.Description>Tell us about yourself!</Step.Description>
      </Step.Content>
    </Step>
  );
  nameComponentMap["educations"] = (
    <Step
      key="educations"
      active={step == 1 ? true : false}
      onClick={stepLink.goToEducation}
    >
      <Step.Content>
        <Step.Title>Education</Step.Title>
        <Step.Description>List your Education!</Step.Description>
      </Step.Content>
    </Step>
  );
  nameComponentMap["workExperiences"] = (
    <Step
      key="workExperiences"
      active={step == 2 ? true : false}
      onClick={stepLink.goToWorkExperience}
    >
      <Step.Content>
        <Step.Title>Work Experience</Step.Title>
        <Step.Description>Past Work Experience</Step.Description>
      </Step.Content>
    </Step>
  );
  nameComponentMap["skills"] = (
    <Step
      key="skills"
      active={step == 3 ? true : false}
      onClick={stepLink.goToSkills}
    >
      <Step.Content>
        <Step.Title>Skills</Step.Title>
        <Step.Description>Share your skills</Step.Description>
      </Step.Content>
    </Step>
  );
  nameComponentMap["interests"] = (
    <Step
      key="interests"
      active={step == 4 ? true : false}
      onClick={stepLink.goToInterests}
    >
      <Step.Content>
        <Step.Title>Interests</Step.Title>
        <Step.Description>What Hobbies do you have?</Step.Description>
      </Step.Content>
    </Step>
  );
  const widthOfStepper = maxStep + 1;
  return (
    <Step.Group fluid size="tiny" widths={widthOfStepper} ordered>
      {vrsComponents.map(componentName => nameComponentMap[componentName])}
      <Step
        active={step == maxStep ? true : false}
        onClick={stepLink.goToConfirmation}
      >
        <Step.Content>
          <Step.Title>Confirmation</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default class FormStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      formBody: [<React.Fragment></React.Fragment>],
      maxStep: this.props.vrsComponents.length,
      step: 0, // initial always zero
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
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  previousStep = () => {
    const { step } = this.state;
    if (step > 0) {
      this.setState({ step: step - 1 });
    }
  };

  goToSection = index => {
    this.setState({ step: index });
  };

  goToAboutMe = () => {
    const { step } = this.state;
    this.setState({ step: 0 });
  };

  goToEducation = () => {
    const { step } = this.state;
    this.setState({ step: 1 });
  };

  goToWorkExperience = () => {
    const { step } = this.state;
    this.setState({ step: 2 });
  };

  goToSkills = () => {
    const { step } = this.state;
    this.setState({ step: 3 });
  };

  goToInterests = () => {
    const { step } = this.state;
    this.setState({ step: 4 });
  };

  goToConfirmation = () => {
    const { step, maxStep } = this.state;
    this.setState({ step: maxStep });
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    const arr = this.props.vrsComponents;
    let indexedMap = [];
    arr.map((val, index) => {
      let obj = {};
      obj[index] = val;
      indexedMap.push(obj);
    });
    // so here i will have
    // [{0:about}, {1:workex},{2:edu}]

    // get the progress bar for this particular vrs array
    const stepBar = this.getProgressBarByName(this.props.vrsComponents);

    //get the formBody
    // then setstate into this.state.formBody to save
    this.getFormComponentByName(stepBar, indexedMap);

    this.setState({ isLoading: false });
  };

  getProgressBarByName = vrsComponents => {
    let nameComponentMap = new Object();

    nameComponentMap["about"] = (
      <Step
        key="about"
        link
        //active={step == 0 ? true : false}
        //onClick={stepLink.goToAboutMe}
      >
        <Step.Content>
          <Step.Title>About Me</Step.Title>
          <Step.Description>Tell us about yourself!</Step.Description>
        </Step.Content>
      </Step>
    );
    nameComponentMap["educations"] = (
      <Step
        key="educations"
        //active={step == 1 ? true : false}
        // onClick={stepLink.goToEducation}
      >
        <Step.Content>
          <Step.Title>Education</Step.Title>
          <Step.Description>List your Education!</Step.Description>
        </Step.Content>
      </Step>
    );
    nameComponentMap["workExperiences"] = (
      <Step
        key="workExperiences"
        //active={step == 2 ? true : false}
        //onClick={stepLink.goToWorkExperience}
      >
        <Step.Content>
          <Step.Title>Work Experience</Step.Title>
          <Step.Description>Past Work Experience</Step.Description>
        </Step.Content>
      </Step>
    );
    nameComponentMap["skills"] = (
      <Step
        key="skills"
        // active={step == 3 ? true : false}
        //onClick={stepLink.goToSkills}
      >
        <Step.Content>
          <Step.Title>Skills</Step.Title>
          <Step.Description>Share your skills</Step.Description>
        </Step.Content>
      </Step>
    );
    nameComponentMap["interests"] = (
      <Step
        key="interests"
        // active={step == 4 ? true : false}
        // onClick={stepLink.goToInterests}
      >
        <Step.Content>
          <Step.Title>Interests</Step.Title>
          <Step.Description>What Hobbies do you have?</Step.Description>
        </Step.Content>
      </Step>
    );
    const widthOfStepper = vrsComponents.length + 1;
    return (
      <Step.Group fluid size="tiny" widths={widthOfStepper} ordered>
        {vrsComponents.map(componentName => nameComponentMap[componentName])}
        <Step
        //onClick={stepLink.goToConfirmation}>
        >
          <Step.Content>
            <Step.Title>Confirmation</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  };

  getFormComponentByName = (progressBar, indexedMap) => {
    const { step, maxStep } = this.state;
    let nameComponentMap = new Object();
    nameComponentMap["about"] = (
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
    nameComponentMap["educations"] = (
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
    nameComponentMap["workExperiences"] = (
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
    nameComponentMap["skills"] = (
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
    nameComponentMap["interests"] = (
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
    let tempFormBody = [];
    indexedMap.forEach((obj, index) => {
      name = obj[index];
      let component = (
        <React.Fragment>
          {progressBar}
          {nameComponentMap[name]}
        </React.Fragment>
      );
      tempFormBody.push(component);
    });

    tempFormBody.push(
      <React.Fragment>
        {progressBar}
        <Container text>
          <ConfirmationPage
            updateSelectComponents={this.props.updateSelectComponents}
            submitAndContinue={this.submitAndContinue}
            step={step}
            maxStep={maxStep}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            /*
            goToAboutMe={this.goToAboutMe}
            goToEducation={this.goToEducation}
            goToWorkExperience={this.goToWorkExperience}
            goToSkills={this.goToSkills}
            goToInterests={this.goToInterests}*/
          ></ConfirmationPage>
        </Container>
      </React.Fragment>
    );

    this.setState({ formBody: tempFormBody });
  };

  render() {
    const { isLoading, step, formBody } = this.state;
    //display based on the components inside formBody
    return (
      <React.Fragment>
        {isLoading ? <LoadingSpinner></LoadingSpinner> : formBody[step]}
      </React.Fragment>
    );
    /*
    const stepLink = {
      goToAboutMe: this.goToAboutMe,
      goToEducation: this.goToEducation,
      goToWorkExperience: this.goToWorkExperience,
      goToInterests: this.goToInterests,
      goToSkills: this.goToSkills,
      goToConfirmation: this.goToConfirmation
    };

    const { step, maxStep } = this.state;
    const vrsComponents = this.props.vrsComponents;

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
            <React.Fragment>
              <StepIndicator
                maxStep={maxStep}
                vrsComponents={vrsComponents}
                step={step}
                stepLink={stepLink}
                maxStep={maxStep}
              ></StepIndicator>

              <Container text>
                <About
                  submitAndContinue={this.submitAndContinue}
                  step={step}
                  maxStep={maxStep}
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                />
              </Container>
            </React.Fragment>
          );

        case 1:
          return (
            <React.Fragment>
              <StepIndicator
                maxStep={maxStep}
                vrsComponents={vrsComponents}
                step={step}
                stepLink={stepLink}
                maxStep={maxStep}
              ></StepIndicator>

              <Container text>
                <Education
                  submitAndContinue={this.submitAndContinue}
                  step={step}
                  maxStep={maxStep}
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                ></Education>
              </Container>
            </React.Fragment>
          );
        case 2:
          return (
            <React.Fragment>
              <StepIndicator
                maxStep={maxStep}
                vrsComponents={vrsComponents}
                step={step}
                stepLink={stepLink}
                maxStep={maxStep}
              ></StepIndicator>

              <Container text>
                <WorkExperience
                  submitAndContinue={this.submitAndContinue}
                  step={step}
                  maxStep={maxStep}
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                ></WorkExperience>
              </Container>
            </React.Fragment>
          );
        case 3:
          return (
            <React.Fragment>
              <StepIndicator
                maxStep={maxStep}
                vrsComponents={vrsComponents}
                step={step}
                stepLink={stepLink}
                maxStep={maxStep}
              ></StepIndicator>

              <Container text>
                <Skills
                  submitAndContinue={this.submitAndContinue}
                  step={step}
                  maxStep={maxStep}
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                ></Skills>
              </Container>
            </React.Fragment>
          );

        case 4:
          return (
            <React.Fragment>
              <StepIndicator
                maxStep={maxStep}
                vrsComponents={vrsComponents}
                step={step}
                stepLink={stepLink}
                maxStep={maxStep}
              ></StepIndicator>

              <Container text>
                <Interests
                  submitAndContinue={this.submitAndContinue}
                  step={step}
                  maxStep={maxStep}
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                ></Interests>
              </Container>
            </React.Fragment>
          );

        case 5:
          return (
            <React.Fragment>
              <StepIndicator
                maxStep={maxStep}
                vrsComponents={vrsComponents}
                step={step}
                stepLink={stepLink}
                maxStep={maxStep}
              ></StepIndicator>

              <Container text>
                <ConfirmationPage
                  updateSelectComponents={this.props.updateSelectComponents}
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
                ></ConfirmationPage>
              </Container>
            </React.Fragment>
          );
      }
    }*/
  }
}
