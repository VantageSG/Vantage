import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';


class About extends React.Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleNameChange(name) {
    console.log(name);  
  }

  handleEmailChange(email) {
    console.log(email);
  }

  handleNumberChange(contactNumber) {
    console.log(contactNumber);
  }

  handleAboutMeChange(aboutMe) {
    console.log(aboutMe);
  }

  render() {
      return <div>
        <Header>
          <EditableLabel text='Name'
              inputWidth='200px'
              inputHeight='25px'
              inputMaxLength='50'            
              onFocusOut={this.handleNameChange}              
          />
        </Header>
        <Header>
          <EditableLabel text='email'
              inputWidth='200px'
              inputHeight='25px'
              inputMaxLength='50'            
              onFocusOut={this.handleEmailChange}              
          />
        </Header>
        <Header>
          <EditableLabel text='Name'
              inputWidth='200px'
              inputHeight='25px'
              inputMaxLength='50'            
              onFocusOut={this.handleNumberChange}              
          />
        </Header>
        <Header>
          <EditableLabel text='AboutMe'
              inputWidth='200px'
              inputHeight='25px'
              inputMaxLength='50'                          
              onFocusOut={this.handleAboutMeChange}              
          />
        </Header>
      </div>
  }
}

export default About;
