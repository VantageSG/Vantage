import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';


class About extends React.Component {
  constructor(props){
    super(props);  
  }

  handleNameChange = (name) => {
    console.log(name);  
  }

  handleEmailChange = (email) => {
    console.log(email);
  }

  handleNumberChange = (contactNumber) => {
    console.log(contactNumber);
  }

  handleAboutMeChange = (aboutMe) => {
    console.log(aboutMe);
  }

  render() {
      return <React.Fragment>
        <Header>
          <EditableLabel text='Name'
              inputWidth='200px'
              inputHeight='25px'
                 
              onFocusOut={this.handleNameChange}              
          />
        </Header>
        <Header>
          <EditableLabel text='email'
              inputWidth='200px'
              inputHeight='25px'
                         
              onFocusOut={this.handleEmailChange}              
          />
        </Header>
        <Header>
          <EditableLabel text='Name'
              inputWidth='200px'
              inputHeight='25px'
                         
              onFocusOut={this.handleNumberChange}              
          />
        </Header>
        <Header>
          <EditableLabel text='AboutMe'
              inputWidth='200px'
              inputHeight='25px'
                                       
              onFocusOut={this.handleAboutMeChange}              
          />
        </Header>
      </React.Fragment>
  }
}

export default About;
