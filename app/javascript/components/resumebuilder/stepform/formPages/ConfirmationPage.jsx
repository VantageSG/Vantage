import React, { Component } from "react";
import { List, Card, Segment, Button, Header } from "semantic-ui-react";
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
    const { about, education,  workExperience, skills, interest} = this.state;


    return (
      <div>
        <Card centered fluid>
          <Segment>
            <Animated animationIn={"fadeIn"} animationOut="fadeOut">
              <List relaxed="very">
                <Header>About Me</Header>
                <List.Item header={"Name"} content={about.name} />
                <List.Item header={"Email"} content={about.email} />
                <List.Item
                  header={"About Me"}
                  content={about.aboutMe}
                />
                <Button  onClick={this.props.goToAboutMe}>Edit About me</Button>

                <Header>My Education</Header>
                {education.map((value,i) => {
                    return <React.Fragment key={i}>
                    <List.Item header={"Program"} content={value.program} />
                    <List.Item header={"Institute"} content={value.institution} />
                    <List.Item header={"Grade"} content={value.grade}/>
                  </React.Fragment>;
                })}
                <Button onClick={this.props.goToEducation}>Edit Education</Button>

                <Header>My Work Experiences</Header>
                {workExperience.map((value,i) => {
                    return <React.Fragment key={i}>
                    <List.Item header={"Company"} content={value.company} />
                    <List.Item header={"Position"} content={value.title} />
                 
                  </React.Fragment>;
                })}
                <Button onClick={this.props.goToWorkExperience}>Edit Work Experience</Button>

                <Header>My Skills</Header>
                {skills.map((value,i) => {
                    return <React.Fragment key={i}>
                    <List.Item header={"Name of Skill"} content={value.skillName} description={value.description} />

                  </React.Fragment>;
                })}
                <Button onClick={this.props.goToSkills}>Edit Skills</Button>


                <Header>My Interests</Header>
                {interest.map((value,i) => {
                    return <React.Fragment key={i}>
                    <List.Item  content={value.interestName}  />
                  </React.Fragment>;
                })}
                <Button onClick={this.props.goToInterests}>Edit Interests</Button>
              </List>
            </Animated>
          </Segment>
        </Card>
      </div>
    );
  }
}
