import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';
import '../../../assets/stylesheets/resume.css';


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
      <div className="section">
        <h1 className="sectionHeader">
          Education
        </h1>
        <hr></hr>
        {this.props.educations.map(
            (education, index) => {
              return (
                <React.Fragment  key={index}>                    
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
                  <EditableLabel text={education.start.toString()}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(start) => this.handleEducationChange(
                      {name: 'start', value: start}, index
                      )}
                  />
                  <EditableLabel text={education.end.toString()}
                    inputWidth='200px'
                    inputHeight='25px'                 
                    onFocusOut={(end) => this.handleEducationChange(
                      {name: 'end', value: end}, index
                      )}
                  />                
                </React.Fragment>              
              );
            }
          )
        }
      </div>
    );
  }
}

export default Education;
