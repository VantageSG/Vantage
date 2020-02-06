import React, { Component } from "react";
import {
  List,
  Segment,
  Button,
  Header,
  Container,
  Divider
} from "semantic-ui-react";
import { Animated } from "react-animated-css";
import {
  aboutSchema,
  educationSchema,
  interestSchema,
  skillSchema,
  workExperienceSchema
} from "../frontEndUtil/schema";
import axios from "axios";
import { getEndPoint, sanitizeResponse } from "./formApi";
import { isEmpty } from "../../../util/Props";
import camelcaseKeysDeep from "camelcase-keys-deep";
import { Link } from "react-router-dom";


export default class ConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: aboutSchema,
      educations: [educationSchema, educationSchema],
      workExperiences: [workExperienceSchema, workExperienceSchema],
      interests: [interestSchema],
      skills: [skillSchema, skillSchema]
    };
  }

  componentDidMount() {
    this.getVrsAttributes();
  }

  componentDidUpdate() {
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

  render() {
    // console.table(this.state);
    // console.table(this.state.education);
    const {
      about,
      educations,
      workExperiences,
      skills,
      interests
    } = this.state;

    return (
      <div>
        <Container textAlign="center">
          <Animated animationIn={"fadeIn"} animationOut="fadeOut">
            <List relaxed="very">
              <Header>Confirmation page</Header>
              <Segment textAlign="left">
                <Header>About Me</Header>
                <List.List>
                  <List.Item header={"Name"} content={about.name} />
                  <List.Item header={"Email"} content={about.email} />
                  <List.Item header={"Who am I?"} content={about.aboutMe} />
                </List.List>
                <Divider></Divider>
                <Button
                  style={{ backgroundColor: "#f4a300" }}
                  onClick={this.props.goToAboutMe}
                >
                  Edit About me
                </Button>
              </Segment>

              <Segment textAlign="left">
                <Header>My Education</Header>
                <List.List>
                  {educations.map((value, i) => {
                    return (
                      <React.Fragment key={i}>
                        <List.Item header={"Program"} content={value.program} />
                        <List.Item
                          header={"Institute"}
                          content={value.institution}
                        />
                        <List.Item header={"Grade"} content={value.grade} />
                        <Divider></Divider>
                      </React.Fragment>
                    );
                  })}
                </List.List>
                <Divider></Divider>
                <Button
                  style={{ backgroundColor: "#f4a300" }}
                  onClick={this.props.goToEducation}
                >
                  Edit Education
                </Button>
              </Segment>

              <Segment textAlign="left">
                <Header>My Work Experiences</Header>
                <List.List>
                  {workExperiences.map((value, i) => {
                    return (
                      <React.Fragment key={i}>
                        <List.Item header={"Company"} content={value.company} />
                        <List.Item header={"Position"} content={value.title} />
                        <Divider></Divider>
                      </React.Fragment>
                    );
                  })}
                </List.List>
                <Divider></Divider>
                <Button
                  style={{ backgroundColor: "#f4a300" }}
                  onClick={this.props.goToWorkExperience}
                >
                  Edit Work Experience
                </Button>
              </Segment>
              <Segment textAlign="left">
                <Header>My Skills</Header>
                <List.List>
                  {skills.map((value, i) => {
                    return (
                      <React.Fragment key={i}>
                        <List.Item
                          header={"Name of Skill"}
                          content={value.skillName}
                          description={value.description}
                        />
                        <Divider></Divider>
                      </React.Fragment>
                    );
                  })}
                </List.List>
                <Divider></Divider>
                <Button
                  style={{ backgroundColor: "#f4a300" }}
                  onClick={this.props.goToSkills}
                >
                  Edit Skills
                </Button>
              </Segment>
              <Segment textAlign="left">
                <Header>My Interests</Header>
                <List.List>
                  {interests.map((value, i) => {
                    return (
                      <React.Fragment key={i}>
                        <List.Item content={value.name} />
                        <Divider></Divider>
                      </React.Fragment>
                    );
                  })}
                </List.List>
                <Divider></Divider>
                <Button
                  style={{ backgroundColor: "#f4a300" }}
                  onClick={this.props.goToInterests}
                >
                  Edit Interests
                </Button>
              </Segment>
            </List>
            <Button
              as={Link}
              content="Go to confirmation page"
              to={{
                pathname: `/resume-generation/${this.props.user.id}`,
                user: this.props.user
              }}
            ></Button>
          </Animated>
        </Container>
      </div>
    );
  }
}
