import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';


class Skills extends React.Component {
  constructor(props){
    super(props);
  }

  handleSkillsChange = (nameValue, index) => {
    const { name, value } = nameValue;    
    const skills = this.props.skills;
    skills[index][name] = value;
    this.props.onSkillsChange(
      skills
    );
  }

  render() {
      return (
        <div className="section">
          <h1 className="sectionHeader">
            Skills
          </h1>
          <hr></hr>
          {this.props.skills.map(
              (skill, index) => {
                return (
                  <div className="subsection" key={index}>                    
                    <EditableLabel text={skill.name}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(name) => this.handleSkillsChange(
                          {name: 'name', value: name}, index
                          )}
                    />
                    <div className="subsectionDetails">
                      <EditableLabel text={skill.description}
                          inputWidth='200px'
                          inputHeight='25px'                 
                          onFocusOut={(description) => this.handleSkillsChange(
                            {name: 'description', value: description}, index
                            )}
                      />
                    </div>
                  </div>
                );
              }
            )
          }
        </div>
      );
  }
}

export default Skills;
