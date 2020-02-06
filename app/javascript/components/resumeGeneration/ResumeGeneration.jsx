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
import {
  getEndPoint,
  sanitizeResponse
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
import jsPDF from "jspdf";

export default class ResumeGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [<React.Fragment></React.Fragment>],
      loading: true,
      user: {
        name: "test"
      },
      about: aboutSchema,
      educations: [educationSchema, { ...educationSchema }],
      workExperiences: [workExperienceSchema, workExperienceSchema],
      interests: [interestSchema],
      skills: [skillSchema, skillSchema]
    };
    this.generateForm = this.generateForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.applyDrag = this.applyDrag.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getVrsAttributes();

    if (this.props.login) {
    } else {
      this.setState({
        items: [
          {
            id: uuid(),
            element: (
              <React.Fragment>
                <About
                  about={this.state.about}
                  onAboutChange={this.onAboutChange}
                ></About>
                <Divider></Divider>
              </React.Fragment>
            )
          },
          {
            id: uuid(),
            element: (
              <React.Fragment>
                <Education
                  educations={this.state.educations}
                  onEducationChange={this.onEducationChange}
                ></Education>
                <Divider></Divider>
              </React.Fragment>
            )
          },

          {
            id: uuid(),
            element: (
              <React.Fragment>
                <WorkExperiences
                  workExperiences={this.state.workExperiences}
                  onAboutChange={this.onAboutChange}
                ></WorkExperiences>
                <Divider></Divider>
              </React.Fragment>
            )
          },
          {
            id: uuid(),
            element: (
              <React.Fragment>
                <Interests
                  interests={this.state.interests}
                  onInterestsChange={this.onInterestsChange}
                ></Interests>
                <Divider></Divider>
              </React.Fragment>
            )
          },
          {
            id: uuid(),
            element: (
              <React.Fragment>
                <Skills
                  skills={this.state.skills}
                  onSkillsChange={this.onSkillsChange}
                ></Skills>
                <Divider></Divider>
              </React.Fragment>
            )
          }
        ]
      });
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
  /////////////////////////////////////

  /* Get data from backend */
  getVrsAttributes() {
    axios
      .get(getEndPoint("", this.props.user.id), {
        withCredentials: true
      })
      .then(resp => {
        console.table(resp.data);
        this.setState({loading:true})
      }); /*



    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      this.setState({
        user: this.props.user
      });

      axios
        .get(getEndPoint("", this.props.user.id), {
          withCredentials: true
        })
        .then(resp => {
          console.table(resp.data);
        });
    }*/
  }

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

  generateForm = items => {
    return items.map(item => {
      return <Draggable key={item.id}>{item.element}</Draggable>;
    });
  };

  /*Function to generate resume */

  generateResume = () => {
    const scale = 2;
    const element = document.getElementById("resume");
    var pdf = new jsPDF("p", "mm", "a4");
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
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
        });
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { loading } = this.state;

    return this.state.loading ? (
      <React.Fragment>
        <Container style={{ marginTop: "5vh", marginBottom: "5vh" }} centered>
        <Grid centered columns={1}>
          <Loader active inline="center" size="huge">
            Loading
          </Loader>
          </Grid>
        </Container>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Animated animationIn="fadeIn" animationOut="fadeOut">
          <Container text style={{ marginTop: "5vh", marginBottom: "5vh" }}>
            <Grid centered columns={1}>
              <Grid.Row>
                <Header as="h1" r>
                  Your Resume
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Header as="h2" r>
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
}
