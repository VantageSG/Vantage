import UserContext from '../../../../contexts/UserContext'
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
import { getEndPoint } from "./formApi";
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
      skills: [skillSchema, skillSchema],
      dataLoaded: false
    };
  }

  componentDidMount() {
    this.getVrsAttributes();
  }

  componentDidUpdate() {
    this.getVrsAttributes();
  }

  getVrsAttributes() {
    if (!this.state.dataLoaded && this.context.isLoggedIn) {
      axios
        .get(getEndPoint("",this.context.user.id),{
          withCredentials: true
        }).then( response => {
          const responseData = camelcaseKeysDeep(response.data);
          if (responseData.about != null || responseData.about != undefined) {
            this.setState({
              about: responseData.about,
            });
          }
          if (responseData.educations != null || responseData.educations != undefined) {
            this.setState({
              educations: responseData.educations,
            });
          }
          if (responseData.workExperiences != null || responseData.workExperiences != undefined) {
            this.setState({
              workExperiences: responseData.workExperiences,
            });
          }
          if (responseData.interests != null || responseData.interests != undefined) {
            this.setState({
              interests: responseData.interests,
            });
          }
          if (responseData.skills != null || responseData.skills != undefined) {
            this.setState({
              skills: responseData.skills
            });
          }
        }
      ).catch((error)=>
        console.log(error.response)
      ).then(() => {
        this.setState({
          dataLoaded: true
        })
      }
      )
    }
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
              content="Submit"
              to={{
                pathname: `/resume-generation/`,
                user: this.context.user
              }}
            ></Button>
          </Animated>
        </Container>
      </div>
    );
  }
}

ConfirmationPage.contextType = UserContext
