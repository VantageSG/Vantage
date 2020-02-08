import React, { Component, Fragment } from "react";
import {
  Container,
  Visibility,
} from "semantic-ui-react";

import FormStep from "./multiStepForm/Form";
import GuestUserModal from "../registrations/GuestUserModal";
import UserContext from '../../contexts/UserContext';

export default class ResumeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFixed: false,
      overlayFixed: false,
    };
  }

  stickOverlay = () => this.setState({ overlayFixed: true });
  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickOverlay = () => this.setState({ overlayFixed: false });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed } = this.state;
    return (
      <Container fluid>
        <GuestUserModal />
        <br />
        <br />
        {this.context.isLoggedIn ? (
          <FormStep user={this.context.user} />
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <Visibility offset={80} once={false}></Visibility>
      </Container>
    );
  }
}

ResumeBuilder.contextType = UserContext
