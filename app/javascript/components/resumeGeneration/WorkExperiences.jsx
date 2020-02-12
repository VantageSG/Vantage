import React from 'react';
import EditableLabel from 'react-inline-editing';
import '../../../assets/stylesheets/resume.css';


class WorkExperiences extends React.Component {

  constructor(props) {
    super(props);
  }
  
  handleWorkExperiencesChange = (nameValue, index) => {
    const { name, value } = nameValue;    
    const workExperiences = this.props.workExperiences;
    workExperiences[index][name] = value;
    this.props.onWorkExperiencesChange(
      workExperiences
    );
  }

  render() {    
    return (
      <div className="section">
        <h1 className="sectionHeader">
          Experiences
        </h1>
        <hr></hr>
        {this.props.workExperiences.map(
            (workExperience, index) => {
              return (
                <div className="subsection" key={index} >
                  <div className="workExperienceHeader">
                    <EditableLabel text={workExperience.company}
                      inputWidth='200px'
                      inputHeight='25px'                 
                      onFocusOut={(company) => this.handleWorkExperiencesChange(
                        {name: 'company', value: company}, index
                        )}
                    />
                    <span>|</span>
                    <EditableLabel className="workExperienceTitle" text={workExperience.title}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(title) => this.handleWorkExperiencesChange(
                          {name: 'title', value: title}, index
                          )}
                    />                    
                  </div>
                  <div className="subsectionDetails">
                    <div className="dateDetails">
                      <EditableLabel text={workExperience.start.toString()}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(start) => this.handleWorkExperiencesChange(
                          {name: 'start', value: start}, index
                          )}
                      />
                      <span>to</span>
                      <EditableLabel text={workExperience.end.toString()}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(end) => this.handleWorkExperiencesChange(
                          {name: 'end', value: end}, index
                          )}
                      />
                    </div>
                  </div>
                  <div className="workAchievements">
                    <EditableLabel text={workExperience.achievements}
                      inputWidth='200px'
                      inputHeight='25px'                 
                      onFocusOut={(achievements) => this.handleWorkExperiencesChange(
                        {name: 'achievements', value: achievements}, index
                        )}
                    />
                  </div>
                </div>
              );
            }
          )
        }
      </div>
    )
  }
}

export default WorkExperiences;
