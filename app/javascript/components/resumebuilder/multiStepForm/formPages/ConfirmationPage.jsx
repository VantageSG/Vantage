import React, { Component } from "react";
import {
  List,
  Card,
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
export default class ConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      about: aboutSchema,
      education: [educationSchema, educationSchema],
      workExperience: [workExperienceSchema, workExperienceSchema],
      interest: [interestSchema],
      skills: [skillSchema, skillSchema]
    };
  }

  componentDidMount = () => {
    //use user_id to get submitted info from api
    // set the info
  };

  render() {
    console.table(this.state);
    console.table(this.state.education);
    const { about, education, workExperience, skills, interest } = this.state;

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
                  {education.map((value, i) => {
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
                <Button style={{backgroundColor: "#f4a300"}} onClick={this.props.goToEducation}>
                  Edit Education
                </Button>
              </Segment>

              <Segment textAlign="left">
              <Header>My Work Experiences</Header>
              <List.List>
              {workExperience.map((value, i) => {
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
              <Button style={{backgroundColor: "#f4a300"}} onClick={this.props.goToWorkExperience}>
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
              <Button style={{backgroundColor: "#f4a300"}} onClick={this.props.goToSkills}>Edit Skills</Button>
              </Segment>
              <Segment textAlign="left">
              <Header>My Interests</Header>
              <List.List>

              
              {interest.map((value, i) => {
                return (
                  <React.Fragment key={i}>
                    <List.Item content={value.interestName} />
                    <Divider></Divider>
                  </React.Fragment>
                );
              })}
              </List.List>
              <Divider></Divider>
              <Button style={{backgroundColor: "#f4a300"}} onClick={this.props.goToInterests}>Edit Interests</Button>
              </Segment>
            </List>
          </Animated>
        </Container>
      </div>
    );
  }
}
