import React, { Component, Fragment } from "react";
import {
  Container,
  Visibility,
} from "semantic-ui-react";

import FormStep from "./multiStepForm/Form";
import GuestUserModal from "../registrations/GuestUserModal";
import UserContext from '../../contexts/UserContext';
import ResumeSelector from "./ResumeSelector";

export default class ResumeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFixed: false,
      overlayFixed: false,
      selectingComponents: false
    };
  }

  stickOverlay = () => this.setState({ overlayFixed: true });
  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickOverlay = () => this.setState({ overlayFixed: false });
  unStickTopMenu = () => this.setState({ menuFixed: false });
  
  updateSelectComponents = (bool) => {
    this.setState({selectingComponents: bool});
  }

  render() {
    const { menuFixed, overlayFixed } = this.state;
    return (
      <Container fluid>
        <GuestUserModal />
        <br />
        <br />
        {this.context.isLoggedIn
          ? this.props.vrsComponents.length > 0 && !this.state.selectingComponents
            ? <FormStep
                updateSelectComponents={this.updateSelectComponents}
                vrsComponents={this.props.vrsComponents}
                user={this.context.user}
              />
            : <ResumeSelector
                updateSelectComponents={this.updateSelectComponents}
                selectedVrsComponents={this.props.selectedVrsComponents}
                vrsComponents={this.props.vrsComponents}
              />
          : (
          <React.Fragment></React.Fragment>
        )}
        <Visibility offset={80} once={false}></Visibility>
      </Container>
    );
  }
}

ResumeBuilder.contextType = UserContext
