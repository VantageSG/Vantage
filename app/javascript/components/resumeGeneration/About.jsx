import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';


class About extends React.Component {
  constructor(props){
    super(props);  
  }

  handleAboutChange = (name, value) => {    
    this.props.onAboutChange({
      ...this.props.about,
      [name]: value
    });
  }

  render() {
      return <React.Fragment >
        <Header>About</Header>
        <Header>
          <EditableLabel text={this.props.about.name}
              isEditing={false}
              inputWidth='200px'
              inputHeight='25px'                 
              onFocusOut={(name) => this.handleAboutChange('name', name)}
          />
        </Header>
        <Header>
          <EditableLabel text={this.props.about.email}
              inputWidth='200px'
              inputHeight='25px'                         
              onFocusOut={(email) => this.handleAboutChange('email', email)}
          />
        </Header>
        <Header>
          <EditableLabel text={this.props.about.contactNumber}
              inputWidth='200px'
              inputHeight='25px'
              onFocusOut={(contactNumber) => this.handleAboutChange('contactNumber', contactNumber)}
          />
        </Header>
        <Header>
          <EditableLabel text={this.props.about.aboutMe}
              inputWidth='200px'
              inputHeight='25px'                                       
              onFocusOut={(aboutMe) => this.handleAboutChange('aboutMe', aboutMe)}
              
          />
        </Header>
      </React.Fragment>
  }
}

export default About;
