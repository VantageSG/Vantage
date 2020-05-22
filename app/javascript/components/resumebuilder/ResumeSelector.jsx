import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import "./ResumeSelector.css";
import { Icon } from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom"


const defaultVrsComponents = ["about", "educations", "workExperiences", "skills", "interests"];

class ResumeSelector extends Component {
  constructor(props) {
    super(props);
    // by default everything will be selected
    this.state = {      
      selected: {
        about: true,
        educations: true,
        workExperiences: true,
        skills: true,
        interests: true
      }
    };
    // if it is not the first time user is selecting, indicate those that are not selected
    if (this.props.vrsComponents.length > 0) {
      defaultVrsComponents.filter(c => !this.props.vrsComponents.includes(c)).forEach(
        (c) => this.state.selected[c] = false
      )
    }
  }

  goToResumeBuilder = () => {
    const selectedComponents = defaultVrsComponents.filter(
      c => this.state.selected[c]
    )
    console.log(selectedComponents)
    if (selectedComponents.length == 0) {
      alert("Please select at least 1 component");
    } else {
      this.props.updateSelectComponents(false);    
      this.props.selectedVrsComponents(selectedComponents);
    }    
  }

  render() {
    return (
      <div className="resume-selector-container">
        <h1>Select your Resume Sections</h1>
        <p>*Click on the sections to select/unselect</p>
        <div className="resume-components-group">
          <button
            className={this.state.selected.about ? 'selected' : 'unselected'}
            onClick={() => this.setState({ selected: {...this.state.selected, about: !this.state.selected.about} })}
          >
            About Me
          </button>
          <button
            className={this.state.selected.educations ? 'selected' : 'unselected'}
            onClick={() => this.setState({ selected: {...this.state.selected, educations: !this.state.selected.educations} })}
          >
            Education
          </button>
          <button
            className={this.state.selected.workExperiences ? 'selected' : 'unselected'}
            onClick={() => this.setState({ selected: {...this.state.selected, workExperiences: !this.state.selected.workExperiences} })}
          >
            Work Experiences
          </button>
          <button
            className={this.state.selected.skills ? 'selected' : 'unselected'}
            onClick={() => this.setState({ selected: {...this.state.selected, skills: !this.state.selected.skills} })}
          >
            Skills
          </button>
          <button
            className={this.state.selected.interests ? 'selected' : 'unselected'}
            onClick={() => this.setState({ selected: {...this.state.selected, interests: !this.state.selected.interests} })}
          >
            Interests
          </button>
        </div>
        <button className="build-resume" onClick={this.goToResumeBuilder}>
          Build your Resume <Icon name="paper plane" />
        </button>
      </div>
    );
  }
}

ResumeSelector.contextType = UserContext;
export default withRouter(ResumeSelector);
