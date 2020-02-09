import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import { Grid, Image, Button, Header, Container } from "semantic-ui-react";

class ResumeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ["blue", "blue", "blue", "blue", "blue", "blue"],
      choices: ["test"]
    };
  }

  /* Functions to handle on change */
  handleColorChange = (index,value) => {
    let color = [...this.state.color];
    let resumeElemSet = new Set(this.state.choices);
    if (color[index] === "green") {
      color[index] = "red";
      resumeElemSet.delete(value);
    } else {
      color[index] = "green";
      resumeElemSet.add(value);
    }
    return [color,resumeElemSet];
  };

  onAboutChange = (index, currentColor) => {
    let array = this.handleColorChange(index,"about")
    this.setState({
        color: array[0],
        choices: Array.from(array[1]),
      });
  };

  onEducationChange = index => {
    let array = this.handleColorChange(index,"educations");
    this.setState({
      color: array[0],
      choices: Array.from(array[1]),
    });
  };
  onWorkExperiencesChange = index => {
    let array = this.handleColorChange(index,"workExperiences");
    this.setState({
      color: array[0],
      choices: Array.from(array[1]),
    });
  };
  onSkillsChange = index => {
    let array = this.handleColorChange(index,"skills");
    this.setState({
      color: array[0],
      choices: Array.from(array[1]),
    });
  };
  onInterestsChange = index => {
    let array = this.handleColorChange(index,"interests");
    this.setState({
      color: array[0],
      choices: Array.from(array[1]),
    });
  };

  render() {
    return (
      <React.Fragment>
        <Grid columns={3} container>
          <Grid.Row>
            {" "}
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Header>Choose your sections</Header>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button
                color={this.state.color[0]}
                content="About Me"
                onClick={() => this.onAboutChange(0, this.state.color[0])}
              ></Button>
              <Button
                color={this.state.color[1]}
                content="Education"
                onClick={() => this.onEducationChange(1)}
              ></Button>
            </Grid.Column>

            <Grid.Column>
              <Button
                color={this.state.color[2]}
                content="Work Experiences"
                onClick={() => this.onWorkExperiencesChange(2)}
              ></Button>
              <Button
                color={this.state.color[3]}
                content="Skills"
                onClick={() => this.onSkillsChange(3)}
              ></Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color={this.state.color[4]}
                content="interest"
                onClick={() => this.onInterestsChange(4)}
              ></Button>
              <Button content="extra" disabled></Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Container>
          <Header>The following sections will appear in your resume!</Header>
          {this.state.choices.map((val, index) => {
            return <p>{val}</p>;
          })}
        </Container>
      </React.Fragment>
    );
  }
}

ResumeSelector.contextType = UserContext;
export default ResumeSelector;
