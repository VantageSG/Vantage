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
        <React.Fragment>
          {this.props.skills.map(
              (skill, index) => {
                return (
                  <React.Fragment key={index}>
                    <Header>Skills</Header>
                    <EditableLabel text={skill.name}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(name) => this.handleSkillsChange(
                          {name: 'name', value: name}, index
                          )}
                    />
                    <EditableLabel text={skill.description}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(description) => this.handleSkillsChange(
                          {name: 'description', value: description}, index
                          )}
                    />
                    <EditableLabel text={skill.link}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(link) => this.handleSkillsChange(
                          {name: 'link', value: link}, index
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

export default Skills;
