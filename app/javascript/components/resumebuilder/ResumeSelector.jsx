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
      choices: this.props.vrsComponents.length > 0 ? this.props.vrsComponents : ["about"]
    };
    this.state.color = [
      "green",
      this.state.choices.includes("educations") ? "green" : "red",
      this.state.choices.includes("workExperiences") ? "green" : "red",
      this.state.choices.includes("skills") ? "green" : "red",
      this.state.choices.includes("interests") ? "green" : "red",
    ]
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
    this.props.updateSelectComponents(false);
    this.props.selectedVrsComponents(this.state.choices);
  }

  render() {
    const verboseNameMap = {
      "about": "About Me",
      "educations": "Education",
      "workExperiences": "Work Experiences",
      "skills": "Skills",
      "interests": "Interests"
    }

    return (
      <React.Fragment>
        <Segment style={{ backgroundColor: "#f5c05d"}}>
          <Header style={{textAlign: "center", textDecoration:"underline", margin:"2em"}}>Choose your Resume Components</Header>

          <Grid columns={2} container relaxed="very">
            <Grid.Column>
              <Grid.Row>
                <Grid stackable columns="equal">                  
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[1]}
                      label="Education"
                      onClick={() => this.onEducationChange(1)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                  <Grid.Column> 
                    <ResumeSelectorButton
                      color={this.state.color[2]}
                      label="Work Experiences"
                      onClick={() => this.onWorkExperiencesChange(2)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                </Grid>
              </Grid.Row>

              <Grid.Row>
                <Grid stackable columns="equal">
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[3]}
                      label="Skills"
                      onClick={() => this.onSkillsChange(3)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                  <Grid.Column>
                    <ResumeSelectorButton
                      color={this.state.color[4]}
                      label="Interests"
                      onClick={() => this.onInterestsChange(4)}
                    ></ResumeSelectorButton>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Card fluid style={{marginBottom:"0",  minHeight: "40vh"}}>
                <Card.Header textAlign="center">
                 <Header style={{margin:"1vh"}}>Sections</Header>
                </Card.Header>
                {this.state.choices.map((val, index) => {
                  return (
                    <Segment key={index} style={{marginTop: "0", marginBottom: "0"}}>
                      <Segment.Inline>{verboseNameMap[val]}</Segment.Inline>
                    </Segment>
                  );
                })}
              </Card>
              <Button attached='bottom' onClick={this.goToResumeBuilder}>Build my Resume</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

ResumeSelector.contextType = UserContext;
export default withRouter(ResumeSelector);
