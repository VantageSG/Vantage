import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header, Grid } from 'semantic-ui-react';
import '../../../assets/stylesheets/resume.css';


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
      return (
        <div className="aboutSegment">
          <div className="aboutInfo">
            <div className="aboutName">
              <EditableLabel text={this.props.about.name}
                  isEditing={false}
                  inputWidth='200px'
                  inputHeight='25px'                 
                  onFocusOut={(name) => this.handleAboutChange('name', name)}
              />            
            </div>
            <div className="contactDetails">
              <div>
                <EditableLabel text={this.props.about.email}
                  inputWidth='200px'
                  inputHeight='25px'                         
                  onFocusOut={(email) => this.handleAboutChange('email', email)}
                />
              </div>
              <span>|</span>
              <div>
                <EditableLabel text={this.props.about.contactNumber.toString()}
                inputWidth='200px'
                inputHeight='25px'
                onFocusOut={(contactNumber) => this.handleAboutChange('contactNumber', contactNumber)}
                />
              </div>
            </div>
          </div>
          <div className="aboutMe">            
            <EditableLabel text={this.props.about.aboutMe}
                inputWidth='700px'
                inputHeight='50px'                                               
                onFocusOut={(aboutMe) => this.handleAboutChange('aboutMe', aboutMe)}              
            />            
          </div>
        </div>)
  }
}

export default About;
