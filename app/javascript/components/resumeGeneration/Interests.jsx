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
        <div className="section">
          <h1 className="sectionHeader">
            Interests
          </h1>
          <hr></hr>
          <div className="interests">
            <ul>
              {this.props.interests.map(
                  (interest, index) => {
                    return (
                      <li key={index} >
                        <EditableLabel text={interest.name}
                            inputWidth='350px'
                            inputHeight='25px'                 
                            onFocusOut={(name) => this.handleInterestsChange(
                              {name: 'name', value: name}, index
                              )}
                        />
                      </li>
                    );
                  }
                )
              }
            </ul>
          </div>
        </div>
      );
  }
}

export default Interests;
