import React, { Component, Fragment } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Placeholder
} from "semantic-ui-react";
import { isEmpty } from "../util/Props";

import FormStep from "./multiStepForm/Form";
import GuestUserModal from "../registrations/GuestUserModal";

export default class ResumeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFixed: false,
      overlayFixed: false,
      isLoggedIn: false
    };
  }
  componentDidMount = () => {
    if (this.props.user == null && isEmpty(this.props.user)) {
      this.setState({ isLoggedIn: false });
    } else {
      this.setState({ isLoggedIn: true });
    }
  };

  confirmUser = () => this.setState({ isLoggedIn: true });

  stickOverlay = () => this.setState({ overlayFixed: true });

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed } = this.state;
    return (
      <Container fluid>
        <GuestUserModal
          handleLogin={this.props.handleLogin}
          user={this.props.user}
          confirmUser={this.confirmUser}
        />
        <br />
        <br />
        {this.state.isLoggedIn ? (
          <FormStep user={this.props.user} />
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <Visibility offset={80} once={false}></Visibility>
      </Container>
    );
  }
}
