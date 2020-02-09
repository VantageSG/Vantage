import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header, Grid } from 'semantic-ui-react';
import './resume.css'


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
          <Grid>
            <Grid.Row style={{paddingBottom: "0px"}}>
              <Grid.Column width={8}>
                <h1 className="aboutName">
                  <EditableLabel text={this.props.about.name}
                      isEditing={false}
                      inputWidth='200px'
                      inputHeight='25px'                 
                      onFocusOut={(name) => this.handleAboutChange('name', name)}
                  />
                </h1>
              </Grid.Column>
              <Grid.Column width={8} textAlign="right" style={{paddingTop:"0.5em"}}>
                <EditableLabel text={this.props.about.email}
                  inputWidth='200px'
                  inputHeight='25px'                         
                  onFocusOut={(email) => this.handleAboutChange('email', email)}
                />
                <EditableLabel text={this.props.about.contactNumber.toString()}
                    inputWidth='200px'
                    inputHeight='25px'
                    onFocusOut={(contactNumber) => this.handleAboutChange('contactNumber', contactNumber)}
                />
              </Grid.Column>
            </Grid.Row>            
            <Grid.Row>
              <Grid.Column>
                <EditableLabel text={this.props.about.aboutMe}
                    inputWidth='200px'
                    inputHeight='25px'                                       
                    onFocusOut={(aboutMe) => this.handleAboutChange('aboutMe', aboutMe)}              
                />
              </Grid.Column>              
            </Grid.Row>
          </Grid>
      </div>)
  }
}

export default About;
