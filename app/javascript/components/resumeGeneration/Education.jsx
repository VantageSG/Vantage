import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';


class Education extends React.Component {

  constructor(props) {
    super(props);
  }
  
  handleEducationChange = (nameValue, index) => {
    const { name, value } = nameValue;    
    const educations = this.props.educations;
    educations[index][name] = value;
    this.props.onEducationChange(
      educations
    );
  }

  render() {  
  
    return (
      <React.Fragment>
        {this.props.educations.map(
            (education, index) => {
              return (
                <React.Fragment  key={index}>
                  <Header>Education</Header>                  
                  <EditableLabel text={education.institution}
                      inputWidth='200px'
                      inputHeight='25px'                 
                      onFocusOut={(institution) => this.handleEducationChange(
                        {name: 'institution', value: institution}, index
                        )}
                  />
                  <EditableLabel text={education.program}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(program) => this.handleEducationChange(
                      {name: 'program', value: program}, index
                      )}
                  />
                  <EditableLabel text={education.start}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(start) => this.handleEducationChange(
                      {name: 'start', value: start}, index
                      )}
                  />
                  <EditableLabel text={education.end}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(end) => this.handleEducationChange(
                      {name: 'end', value: end}, index
                      )}
                  />
                  <EditableLabel text={education.grade}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(grade) => this.handleEducationChange(
                      {name: 'grade', value: grade}, index
                      )}
                  />
                </React.Fragment>              
              );
            }
          )
        }
      </React.Fragment>
    );
  }
}

export default Education;
