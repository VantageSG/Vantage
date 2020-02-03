import React from 'react';
import EditableLabel from 'react-inline-editing';
import { Header } from 'semantic-ui-react';


class Interests extends React.Component {
  constructor(props){
    super(props);
  }

  handleInterestsChange = (nameValue, index) => {
    const { name, value } = nameValue;    
    const interests = this.props.interests;
    interests[index][name] = value;
    this.props.onInterestsChange(
      interests
    );
  }

  render() {
      return (
        <React.Fragment>
          {this.props.interests.map(
              (interest, index) => {
                return (
                  <React.Fragment >
                    <Header>Interests</Header>
                    <EditableLabel text={interest.name}
                        inputWidth='200px'
                        inputHeight='25px'                 
                        onFocusOut={(name) => this.handleInterestsChange(
                          {name: 'name', value: name}, index
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

export default Interests;
