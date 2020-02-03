import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';


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
      <React.Fragment>
        {this.props.workExperiences.map(
            (workExperience, index) => {
              return (
                <React.Fragment >
                  <Header>Work Experiences</Header>
                  <EditableLabel text={workExperience.title}
                      inputWidth='200px'
                      inputHeight='25px'                 
                      onFocusOut={(title) => this.handleWorkExperiencesChange(
                        {name: 'title', value: title}, index
                        )}
                  />
                  <EditableLabel text={workExperience.company}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(company) => this.handleWorkExperiencesChange(
                      {name: 'company', value: company}, index
                      )}
                  />
                  <EditableLabel text={workExperience.start}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(start) => this.handleWorkExperiencesChange(
                      {name: 'start', value: start}, index
                      )}
                  />
                  <EditableLabel text={workExperience.end}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(end) => this.handleWorkExperiencesChange(
                      {name: 'end', value: end}, index
                      )}
                  />
                  <EditableLabel text={workExperience.achievements}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(achievements) => this.handleWorkExperiencesChange(
                      {name: 'achievements', value: achievements}, index
                      )}
                  />
                </React.Fragment>              
              );
            }
          )
        }
      </React.Fragment>
    )
  }
}

export default WorkExperiences;
