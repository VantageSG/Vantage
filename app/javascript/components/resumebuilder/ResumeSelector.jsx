import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import {
  Grid,
  Image,
  Header,
  Container,
  Card,
  Segment,
  Button,
  Label

} from "semantic-ui-react";
import "./category.css";
import {Link, withRouter} from "react-router-dom"

const ResumeSelectorButton = props => {
  return (
    <Button
      className="selector-cat"
      color={props.color}
      content={props.label}
      onClick={props.onClick}
    ></Button>
  );
};

class ResumeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ["red", "red", "red", "red", "red", "red"],
      choices: ["test"]
    };
  }

  /* Functions to handle on change */
  handleColorChange = (index, value) => {
    let color = [...this.state.color];
    let resumeElemSet = new Set(this.state.choices);
    if (color[index] === "green") {
      color[index] = "red";
      resumeElemSet.delete(value);
    } else {
      color[index] = "green";
      resumeElemSet.add(value);
    }
    return [color, resumeElemSet];
  };

  onAboutChange = index => {
    let array = this.handleColorChange(index, "about");
    this.setState({
      color: array[0],
      choices: Array.from(array[1])
    });
  };

  onEducationChange = index => {
    let array = this.handleColorChange(index, "educations");
    this.setState({
      color: array[0],
      choices: Array.from(array[1])
    });
  };
  onWorkExperiencesChange = index => {
    let array = this.handleColorChange(index, "workExperiences");
    this.setState({
      color: array[0],
      choices: Array.from(array[1])
    });
  };
  onSkillsChange = index => {
    let array = this.handleColorChange(index, "skills");
    this.setState({
      color: array[0],
      choices: Array.from(array[1])
    });
  };
  onInterestsChange = index => {
    let array = this.handleColorChange(index, "interests");
    this.setState({
      color: array[0],
      choices: Array.from(array[1])
    });
  };

  goToResumeBuilder = () => {
    this.props.history.push('/resume-builder');
  
  }

  render() {
    return (
      <React.Fragment>
        <br></br>
        <Segment>
          <Grid columns={3} container>
            <Grid.Row>
              {" "}
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <Header>Choose your sections</Header>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={2} container relaxed="very">
            <Grid.Column>
              <Grid.Row>
                <Grid columns="2">
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[0]}
                      label="About Me"
                      onClick={() => this.onAboutChange(0, this.state.color[0])}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[1]}
                      label="Education"
                      onClick={() => this.onEducationChange(1)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                </Grid>
              </Grid.Row>

              <Grid.Row>
                <Grid columns="equal">
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[2]}
                      label="Work Experiences"
                      onClick={() => this.onWorkExperiencesChange(2)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[3]}
                      label="Skills"
                      onClick={() => this.onSkillsChange(3)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                </Grid>
              </Grid.Row>

              <Grid.Row>
                <Grid columns="equal">
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[4]}
                      label="interest"
                      onClick={() => this.onInterestsChange(4)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                  <Grid.Column>
                    <ResumeSelectorButton
                      label="extra"
                      disabled
                    ></ResumeSelectorButton>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Card fluid style={{marginBottom:"0",  minHeight: "40vh"}}>
                <Card.Header textAlign="center">
                 <Header>Sections</Header>
                </Card.Header>
                {this.state.choices.map((val, index) => {
                  return (
                    <Segment style={{marginTop: "0", marginBottom: "0"}}>
                      <Segment.Inline>{val}</Segment.Inline>
                    </Segment>
                  );
                })}
              </Card>
              <Button attached='bottom' onClick={this.goToResumeBuilder}>Go To Resume Builder</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

ResumeSelector.contextType = UserContext;
export default withRouter(ResumeSelector);
