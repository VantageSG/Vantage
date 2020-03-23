import React, { Component } from "react";
import { Container, Step, Icon, Responsive, Grid } from "semantic-ui-react";
import SingleSegmentContainer from "./formPages/Segment/SingleSegmentContainer"
import MultipleSegmentContainer from "./formPages/Segment/MultipleSegmentContainer"
import ConfirmationPage from "./formPages/ConfirmationPage";
import LoadingSpinner from "../../util/LoadingSpinner";
import About from "./formPages/SegmentContent/About.json"
import WorkExperience from "./formPages/SegmentContent/WorkExperience.json"
import Education from "./formPages/SegmentContent/Education.json"
import Skills from "./formPages/SegmentContent/Skills.json"
import Interests from "./formPages/SegmentContent/Interests.json"

export default class FormStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      positionOfComponents: {},
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

  ////////////////////// steps to increment
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////// search state for index of component
  goToAboutMe = () => {
    const { positionOfComponents } = this.state;
    const val = positionOfComponents["about"];
    this.setState({ step: val });
  };

  goToEducation = () => {
    const { positionOfComponents } = this.state;
    const val = positionOfComponents["educations"];
    this.setState({ step: val });
  };

  goToWorkExperience = () => {
    const { positionOfComponents } = this.state;
    const val = positionOfComponents["workExperiences"];
    this.setState({ step: val });
  };

  goToSkills = () => {
    const { positionOfComponents } = this.state;
    const val = positionOfComponents["skills"];
    this.setState({ step: val });
  };

  goToInterests = () => {
    const { positionOfComponents } = this.state;
    const val = positionOfComponents["interests"];
    this.setState({ step: val });
  };

  goToConfirmation = () => {
    const { maxStep } = this.state;
    this.setState({ step: maxStep });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////// Create progress bar
  getProgressBarByName = vrsComponents => {
    let nameComponentMap = new Object();
    nameComponentMap["about"] = (
      <Step
        key="about"
        link
        //active={step == 0 ? true : false}
        onClick={this.goToAboutMe}
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
        onClick={this.goToEducation}
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
        onClick={this.goToWorkExperience}
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
        onClick={this.goToSkills}
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
        onClick={this.goToInterests}
      >
        <Step.Content>
          <Step.Title>Interests</Step.Title>
          <Step.Description>What Hobbies do you have?</Step.Description>
        </Step.Content>
      </Step>
    );
    const widthOfStepper = vrsComponents.length + 1;
    return (
      <Step.Group fluid size="tiny" widths={widthOfStepper} ordered style={{ backgroundColor: "#f5c05d", maxHeight:'100px'}}>
        {vrsComponents.map(componentName => nameComponentMap[componentName])}
        <Step onClick={this.goToConfirmation}>          
          <Step.Content>
            <Step.Title>Confirmation</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get the body of the components

  getFormComponentByName = (progressBar, indexedMap) => {
    const { step, maxStep } = this.state;
    let nameComponentMap = new Object();
    nameComponentMap["about"] = (
      <Container text>
        <SingleSegmentContainer
          mainQuestions={About["mainQuestions"]}
          dynamicQuestions={About["dynamicQuestions"]}
          concatQn={About["concatQn"]}
          segmentName={About["segmentName"]}
          mainAttribute={About["mainAttribute"]}
          segmentLabel={About["segmentLabel"]}
          step={step}
          maxStep={maxStep}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      </Container>
    );
    nameComponentMap["educations"] = (
      <Container text>
        <MultipleSegmentContainer
          mainQuestions={Education["mainQuestions"]}
          dynamicQuestions={Education["dynamicQuestions"]}
          concatQn={Education["concatQn"]}
          segmentName={Education["segmentName"]}
          mainAttribute={Education["mainAttribute"]}
          segmentLabel={Education["segmentLabel"]}
          step={step}
          maxStep={maxStep}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      </Container>
    );
    nameComponentMap["workExperiences"] = (
      <Container text>
        <MultipleSegmentContainer
          mainQuestions={WorkExperience["mainQuestions"]}
          dynamicQuestions={WorkExperience["dynamicQuestions"]}
          concatQn={WorkExperience["concatQn"]}
          segmentName={WorkExperience["segmentName"]}
          mainAttribute={WorkExperience["mainAttribute"]}
          segmentLabel={WorkExperience["segmentLabel"]}
          step={step}
          maxStep={maxStep}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      </Container>
    );
    nameComponentMap["skills"] = (
      <Container text>
        <MultipleSegmentContainer
          mainQuestions={Skills["mainQuestions"]}
          dynamicQuestions={Skills["dynamicQuestions"]}
          concatQn={Skills["concatQn"]}
          segmentName={Skills["segmentName"]}
          mainAttribute={Skills["mainAttribute"]}
          segmentLabel={Skills["segmentLabel"]}
          step={step}
          maxStep={maxStep}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      </Container>
    );
    nameComponentMap["interests"] = (
      <Container text>
        <MultipleSegmentContainer
          mainQuestions={Interests["mainQuestions"]}
          dynamicQuestions={Interests["dynamicQuestions"]}
          concatQn={Interests["concatQn"]}
          segmentName={Interests["segmentName"]}
          mainAttribute={Interests["mainAttribute"]}
          segmentLabel={Interests["segmentLabel"]}
          step={step}
          maxStep={maxStep}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
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
    //push confirmation component
    tempFormBody.push(
      <React.Fragment>
        {progressBar}
        <Container text>
          <ConfirmationPage
            updateSelectComponents={this.props.updateSelectComponents}
            step={step}
            maxStep={maxStep}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
          ></ConfirmationPage>
        </Container>
      </React.Fragment>
    );

    this.setState({ formBody: tempFormBody });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Load the array
  componentDidMount = () => {
    const arr = this.props.vrsComponents;
    let indexedMap = [];
    let indexedMap2 = new Object();
    arr.map((val, index) => {
      let obj = {};
      obj[index] = val;
      indexedMap.push(obj);

      indexedMap2[val] = index;
    });
    // so here i will have
    // [{0:about}, {1:workex},{2:edu}]

    // get the progress bar for this particular vrs array
    const stepBar = this.getProgressBarByName(this.props.vrsComponents);
    //get the formBody
    // then setstate into this.state.formBody to save
    this.getFormComponentByName(stepBar, indexedMap);
    this.setState({
      isLoading: false,
      positionOfComponents: indexedMap2
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const { isLoading, step, formBody } = this.state;
    //display based on the components inside formBody
    return (
      <React.Fragment>
        <Grid 
          style={{ backgroundColor: "#f5c05d",paddingTop: "20px", paddingBottom: "50px ", height:'100vh'}}
          verticalAlign="middle"
          textAlign="center"
          stretched
        >
          {isLoading ? <LoadingSpinner></LoadingSpinner> : formBody[step]}
        </Grid>
       
      </React.Fragment>
    );
  }
}
