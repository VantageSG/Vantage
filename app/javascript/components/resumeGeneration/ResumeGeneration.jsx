import React, { Component } from "react";
import {
  List,
  Segment,
  Button,
  Header,
  Container,
  Placeholder,
  Grid,
  Dimmer,
  Loader,
  Divider
} from "semantic-ui-react";
import { Animated } from "react-animated-css";
import {
  aboutSchema,
  educationSchema,
  interestSchema,
  skillSchema,
  workExperienceSchema
} from "../resumebuilder/multiStepForm/frontEndUtil/schema";
import axios from "axios";
import LoadingSpinner from "../util/LoadingSpinner";
import {
  getEndPoint,
} from "../resumebuilder/multiStepForm/formPages/formApi";
import { isEmpty } from "../util/Props";
import camelcaseKeysDeep from "camelcase-keys-deep";
import html2pdf from "html2pdf.js";
import About from "./About";
import Education from "./Education";
import WorkExperiences from "./WorkExperiences";
import Skills from "./Skills";
import Interests from "./Interests";
import { Container as DndContainer, Draggable } from "react-smooth-dnd";
import uuid from "react-uuid";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas"
import jsPDF from "jspdf";

export default class ResumeGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      user: {
        name: "test"
      },
      about: {},
      educations: [],
      workExperiences: [],
      interests: [],
      skills: []
    };
    this.generateForm = this.generateForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.applyDrag = this.applyDrag.bind(this);

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props);
    if (this.props.loggedInStatus) {
      console.log("oops");
      this.getVrsAttributes();
    } else {
     alert("Sending you back to resume builder!");
     this.props.history.push("/resume-builder");
    }
  }

  componentDidUpdate() {
    // this.getVrsAttributes();
    
  }

  /* Functions to handle on change */

  onAboutChange = about => {
    this.setState({ about });
  };

  onEducationChange = educations => {
    this.setState({ educations });
  };

  onWorkExperiencesChange = workExperiences => {
    this.setState({ workExperiences });
  };

  onSkillsChange = skills => {
    this.setState({ skills });
  };

  onInterestsChange = interests => {
    this.setState({ interests });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /* Get data from backend */
  getVrsAttributes() {
    axios
      .get(getEndPoint("", this.props.user.id), {
        withCredentials: true
      })
      .then(response => {
        console.table(response.data);
        const responseDataAbout = camelcaseKeysDeep(response.data.about);
        const responseDataEdu = camelcaseKeysDeep(response.data.educations);
        const responseDataWorkExp = camelcaseKeysDeep(
          response.data.workExperiences
        );
        const responseDataSkill = camelcaseKeysDeep(response.data.skills);
        const responseDataInterests = camelcaseKeysDeep(
          response.data.interests
        );
        this.setState({
          about: responseDataAbout,
          educations: responseDataEdu,
          workExperiences: responseDataWorkExp,
          skills: responseDataSkill,
          interests: responseDataInterests
        });

        var resume = [];
        if (!isEmpty(this.state.about)) {
          resume.push(
            <About
              about={this.state.about}
              onAboutChange={this.onAboutChange}
            ></About>
          );
        }

        if (this.state.workExperiences.length !== 0) {
          resume.push(
            <Education
              educations={this.state.educations}
              onEducationChange={this.onEducationChange}
            ></Education>
          );
        }

        if (this.state.workExperiences.length !== 0) {
          resume.push(
            <WorkExperiences
              workExperiences={this.state.workExperiences}
              onAboutChange={this.onAboutChange}
            ></WorkExperiences>
          );
        }

        if (this.state.skills.length !== 0) {
          resume.push(
            <Skills
              skills={this.state.skills}
              onSkillsChange={this.onSkillsChange}
            ></Skills>
          );
        }

        if (this.state.interests.length !== 0) {
          resume.push(
            <Interests
              interests={this.state.interests}
              onInterestsChange={this.onInterestsChange}
            ></Interests>
          );
        }
        var tempArray = [];
        resume.map((elem, index) => {
          let obj = {};
          obj["id"] = index.toString(10);
          obj["element"] = elem;
          tempArray.push(obj);
        });
        this.setState({
          items: tempArray
        });

        this.generateForm(this.state.items);

        this.setState({ loading: false });
      })
      .catch(error => console.log(error));
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*Drop down functions */
  applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  };

  onDrop(dropResult) {
    return this.setState({
      items: this.applyDrag(this.state.items, dropResult)
    });
  }

  // map each element to become a draggable element
  generateForm = items => {
    return items.map(item => {
      return (
        <React.Fragment>
          <Draggable key={item.id}>{item.element}</Draggable>
        </React.Fragment>
      );
    });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { loading } = this.state;

    return this.state.loading ? (
      <LoadingSpinner></LoadingSpinner>
    ) : (
      <React.Fragment>
        <Animated animationIn="fadeIn" animationOut="fadeOut">
          <Container text style={{ marginTop: "5vh", marginBottom: "5vh" }}>
            <Grid centered columns={1}>
              <Grid.Row>
                <Header as="h1">Your Resume</Header>
              </Grid.Row>
              <Grid.Row>
                <Header as="h2">
                  Drag and drop the various sections to rearrange them!
                </Header>
              </Grid.Row>
            </Grid>
          </Container>
          <br></br>
          <Container text style={{ marginTop: "1vh", marginBottom: "1vh" }}>
            <React.Fragment>
              <div id="resume">
                <Segment>
                  <Grid centered columns={1}>
                    <Grid.Column>
                      <DndContainer onDrop={this.onDrop}>
                        {this.generateForm(this.state.items)}
                      </DndContainer>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </div>
              <br></br>
              <Grid centered columns={1}>
                <Grid.Column textAlign="right">
                  <Button onClick={this.goBack} color="red">
                    Back
                  </Button>
                  <Button
                    content="Generate Resume"
                    onClick={this.generateResume}
                  ></Button>
                </Grid.Column>
              </Grid>
            </React.Fragment>
          </Container>
        </Animated>
      </React.Fragment>
    );
  }

  /*Function to generate resume */

  generateResume = () => {
    this.setState({ loading: true });
    
    const scale = 2;
    const element = document.getElementById("resume");
  
    var pdf = new jsPDF("p", "mm", "a4");
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    console.log(width);
    console.log(height);
    /*
    if (pdf) {
      domtoimage
        .toPng(element, {
          height: element.offsetHeight * scale,
          style: {
            transform: `scale(${scale}) translate(${element.offsetWidth /
              2 /
              scale}px, ${element.offsetHeight / 2 / scale}px)`
          },
          width: element.offsetWidth * scale
        })
        .then(imgData => {
          pdf.addImage(imgData, "PNG", 0, 0, width, height);
          pdf.save("download.pdf");
          this.setState({ loading: false });
        });
    }*/
    
    //var element = document.getElementById("resume");
    console.log(element);
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("image.pdf");
      this.setState({ loading: false });
    });
  };
}
