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
      educations: [educationSchema, {...educationSchema}],
      workExperiences: [workExperienceSchema, workExperienceSchema],
      interests: [interestSchema],
      skills: [skillSchema, skillSchema]
    };
    this.generateForm = this.generateForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.applyDrag = this.applyDrag.bind(this);
  }

  componentDidMount() {
    this.setState({
      items: [
        {
          id: 0,
          element: (
            <React.Fragment>
              <About about={this.state.about}></About>
              <Divider></Divider>
            </React.Fragment>
          )
        },
        {
          id: 1,
          element: (
            <React.Fragment>
              <Education educations={this.state.educations}></Education>
              <Divider></Divider>
            </React.Fragment>
          )
        },
        {
          id: 2,
          element: (
            <React.Fragment>
              <WorkExperiences
                workExperiences={this.state.workExperiences}
              ></WorkExperiences>
              <Divider></Divider>
            </React.Fragment>
          )
        },
        {
          id: 3,
          element: (
            <React.Fragment>
              <Interests interests={this.state.interests}></Interests>
              <Divider></Divider>
            </React.Fragment>
          )
        },
        {
          id: 4,
          element: (
            <React.Fragment>
              <Skills skills={this.state.skills}></Skills>
              <Divider></Divider>
            </React.Fragment>
          )
        }
      ]
    });
    this.getVrsAttributes();
  }

  componentDidUpdate() {
    console.log(this.state)
    this.getVrsAttributes();
  }

  getVrsAttributes() {
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      this.setState({
        user: this.props.user
      });
      axios
        .all([
          this.getAbout(),
          this.getEducations(),
          this.getWorkExperiences(),
          this.getSkills(),
          this.getInterests()
        ])
        .then(
          axios.spread(function(acct, perms) {
            // Both requests are now complete
          })
        );
    }
  }

  getAbout() {
    return axios
      .get(getEndPoint("about", this.props.user.id), {
        withCredentials: true
      })
      .then(response => {
        const responseData = camelcaseKeysDeep(response.data.about);
        this.setState({
          about: sanitizeResponse(responseData, ["resumeId"])
        });
      })
      .catch(error => {});
  }

  getEducations() {
    return axios
      .get(getEndPoint("educations", this.props.user.id), {
        withCredentials: true
      })
      .then(response => {
        const responseData = camelcaseKeysDeep(response.data.educations);
        this.setState({
          educations: sanitizeResponse(responseData, ["resumeId"])
        });
      })
      .catch(error => {});
  }

  getWorkExperiences() {
    return axios
      .get(getEndPoint("workExperiences", this.props.user.id), {
        withCredentials: true
      })
      .then(response => {
        const responseData = camelcaseKeysDeep(response.data.workExperiences);
        this.setState({
          workExperiences: sanitizeResponse(responseData, ["resumeId"])
        });
      })
      .catch(error => {});
  }

  getSkills() {
    return axios
      .get(getEndPoint("skills", this.props.user.id), {
        withCredentials: true
      })
      .then(response => {
        const responseData = camelcaseKeysDeep(response.data.skills);
        this.setState({
          skills: sanitizeResponse(responseData, ["resumeId"])
        });
      })
      .catch(error => {});
  }

  getInterests() {
    return axios
      .get(getEndPoint("interests", this.props.user.id), {
        withCredentials: true
      })
      .then(response => {
        const responseData = camelcaseKeysDeep(response.data.interests);
        this.setState({
          interests: sanitizeResponse(responseData, ["resumeId"])
        });
      })
      .catch(error => {});
  }

  onAboutChange = (about) => {    
    this.setState({about});
  }

  onEducationChange = (educations) => {
    this.setState({educations});
  }

  onWorkExperiencesChange = (workExperiences) => {
    this.setState({workExperiences});
  }

  onSkillsChange = (skills) => {
    this.setState({skills});
  }

  onInterestsChange = (interests) => {
    this.setState({interests});
  }

  generateResume = state => {
    console.log("Test");
    var element = document.getElementById("user-resume");
    //html2pdf(element, { filename: state.user.name });
    var opt = {
      margin: 1,
      filename: "user.pdf",
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
    html2pdf()
      .from(element)
      .save();
  };

  onDrop(dropResult) {
    return this.setState({
      items: this.applyDrag(this.state.items, dropResult)
    });
  }
  generateForm = items => {
    return items.map(item => {
      return (
        <Draggable key={item.id}>
          <div className={`form-line`}>
            <div className="field">{item.element}</div>
          </div>
        </Draggable>
      );
    });
  };

  applyDrag(arr, dragResult) {
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
  }

  render() {
    const {
      about,
      educations,
      workExperiences,
      skills,
      interests
    } = this.state;
    const { loading } = this.state;

    return (
      <React.Fragment>
        <br></br>
        <Container fluid>
          <div id="user-resume">
            <Container fluid>
              <Container text style={{ marginTop: "5vh", marginBottom: "5vh" }}>
                <Segment>
                  <Grid centered columns={1}>
                    <Grid.Column>
                      <DndContainer onDrop={this.onDrop}>
                        {this.generateForm(this.state.items)}
                      </DndContainer>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Container>
            </Container>
          </div>
        </Container>

        <Grid centered columns={1}>
          <Grid.Column textAlign="center">
            <Button
              content="Generate Resume"
              onClick={() => this.generateResume(this.state)}
            ></Button>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
