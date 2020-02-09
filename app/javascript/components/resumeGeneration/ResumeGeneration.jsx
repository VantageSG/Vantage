import React, { Component } from "react";
import {
  Segment,
  Button,
  Header,
  Container,
  Grid,
} from "semantic-ui-react";
import { Animated } from "react-animated-css";
import axios from "axios";
import LoadingSpinner from "../util/LoadingSpinner";
import {
  getEndPoint,
} from "../resumebuilder/multiStepForm/formPages/formApi";
import { isEmpty } from "../util/Props";
import camelcaseKeysDeep from "camelcase-keys-deep";
import About from "./About";
import Education from "./Education";
import WorkExperiences from "./WorkExperiences";
import Skills from "./Skills";
import Interests from "./Interests";
import { Container as DndContainer, Draggable } from "react-smooth-dnd";
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import UserContext from "./../../contexts/UserContext"
import { Link, withRouter } from "react-router-dom";
import './resume.css'


class ResumeGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeComponents: [],
      loading: true,
      about: {},
      educations: [],
      workExperiences: [],
      interests: [],
      skills: [],      
    };
  }

  componentDidMount() {
    if (!this.context.isLoggedIn) {
      this.props.history.push('/resume-builder');
    }
    this.getVrsAttributes();
  }

  /* Functions to handle on change */
  onAboutChange = about => this.setState({ about });
  onEducationChange = educations => this.setState({ educations });
  onWorkExperiencesChange = workExperiences => this.setState({ workExperiences });
  onSkillsChange = skills => this.setState({ skills });
  onInterestsChange = interests => this.setState({ interests });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /* Get data from backend */
  getVrsAttributes = () => {     
    this.setState({loading: true});
    axios
    .get(getEndPoint("", this.context.user.id), {
      withCredentials: true
    })
    .then(response => {      
      this.setState({
        about: camelcaseKeysDeep(response.data.about),
        educations: camelcaseKeysDeep(response.data.educations),
        workExperiences: camelcaseKeysDeep(response.data.workExperiences),
        skills: camelcaseKeysDeep(response.data.skills),
        interests: camelcaseKeysDeep(response.data.interests)
      });
      this.generateResumeComponents();
      this.setState({ loading: false });
    })
    .catch(error => console.log(error));    
  }

  // update vrs on backend
  saveVrsAttributes = () => {
    this.setState({loading: true});
    const resume = {
      about: this.state.about,
      educations: this.state.educations,
      workExperiences: this.state.workExperiences,
      skills: this.state.skills,
      interests: this.state.interests
    }
    axios
    .post(getEndPoint("", this.context.user.id), resume, { withCredentials: true }
    ).then(response => {      
      this.setState({
        about: camelcaseKeysDeep(response.data.about),
        educations: camelcaseKeysDeep(response.data.educations),
        workExperiences: camelcaseKeysDeep(response.data.workExperiences),
        skills: camelcaseKeysDeep(response.data.skills),
        interests: camelcaseKeysDeep(response.data.interests)
      });
      this.generateResumeComponents();
      this.setState({ loading: false });
    })
    .catch(error => console.log(error));
  }

  // determine which resume components should be shown based on state data
  generateResumeComponents = () => {
    var resumeComponents = [];    
    if (this.state.educations.length !== 0) {
      resumeComponents.push(
        <Education
          educations={this.state.educations}
          onEducationChange={this.onEducationChange}
        ></Education>
      );
    }
    if (this.state.workExperiences.length !== 0) {
      resumeComponents.push(
        <WorkExperiences
          workExperiences={this.state.workExperiences}
          onWorkExperiencesChange={this.onWorkExperiencesChange}
        ></WorkExperiences>
      );
    }
    if (this.state.skills.length !== 0) {
      resumeComponents.push(
        <Skills
          skills={this.state.skills}
          onSkillsChange={this.onSkillsChange}
        ></Skills>
      );
    }
    if (this.state.interests.length !== 0) {
      resumeComponents.push(
        <Interests
          interests={this.state.interests}
          onInterestsChange={this.onInterestsChange}
        ></Interests>
      );
    }
    var tempArray = [];
    resumeComponents.map((elem, index) => {
      let obj = {};
      obj["id"] = index.toString(10);
      obj["element"] = elem;
      tempArray.push(obj);
    });    
    this.setState({resumeComponents: tempArray});
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

  onDrop = (dropResult) => {
    return this.setState({
      resumeComponents: this.applyDrag(this.state.resumeComponents, dropResult)
    });
  }

  // map each element to become a draggable element
  makeItemsDraggable = (items) => {
    return items.map(item => {
      return (        
        <Draggable key={item.id}>{item.element}</Draggable>
      );
    });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {    
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
              <Grid centered columns={1}>
                <Grid.Column textAlign="center">
                  <Button as={Link} to="/resume-builder" color="red">
                    Resume Builder
                  </Button>
                  <Button onClick={this.saveVrsAttributes} color="green">
                    Save Changes
                  </Button>
                  <Button onClick={this.generateResume}>
                    Generate Resume
                  </Button>
                </Grid.Column>
              </Grid>
              <br></br>
              <div id="resume" className="resume">
                <About
                  about={this.state.about}
                  onAboutChange={this.onAboutChange}
                ></About>
                <div className="resumeBody">
                  <DndContainer onDrop={this.onDrop}>
                    {this.makeItemsDraggable(this.state.resumeComponents)}
                  </DndContainer>
                </div>
              </div>
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

ResumeGeneration.contextType = UserContext;
export default withRouter(ResumeGeneration);
