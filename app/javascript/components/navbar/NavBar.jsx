import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  renderRegistrationButton = (loggedInStatus, user) => {
    return loggedInStatus ? (
      <Menu.Item position="right">
        <Button
          disabled
          color="facebook"
          size="large"
          content={user.username}
          inverted={!this.state.fixed}
          primary={this.state.fixed}
          style={{ marginLeft: "0.5em" }}
        ></Button>
      </Menu.Item>
    ) : (
      <Menu.Item position="right">
        <Button
          color="green"
          inverted={!this.state.fixed}
          size="large"
          as={Link}
          to="/login"
          icon="sign in alternate"
        ></Button>
        <Button
          color="blue"
          size="large"
          as={Link}
          to="/signup"
          icon="registered"
          inverted={!this.state.fixed}
          primary={this.state.fixed}
          style={{ marginLeft: "0.5em" }}
        ></Button>
      </Menu.Item>
    );
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened, fixed } = this.state;

    return (
      <Responsive
       as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/UserProfiles">
            User Profiles
          </Menu.Item>
          <Menu.Item as={Link} to="/ResumeBuilder">
            Resume Builder
          </Menu.Item>
        </Sidebar>
        <Visibility once={true}>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 50, padding: "1em 0em" }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={this.handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
              {this.renderRegistrationButton(
                this.props.loggedInStatus,
                this.props.user
              )}
            </Menu>
          </Container>
        </Segment>
        </Visibility>

          {children}
   
        <Segment
          inverted
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
          vertical
        >
          <Container textAlign="center">
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </Responsive>
    );
  }
}

class DesktopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  renderRegistrationButton = (loggedInStatus, user) => {
    return loggedInStatus ? (
      <Menu.Item position="right">
        <Button
          disabled
          color="facebook"
          size="large"
          content={user.username}
          inverted={!this.state.fixed}
          primary={this.state.fixed}
          style={{ marginLeft: "0.5em" }}
        ></Button>
      </Menu.Item>
    ) : (
      <Menu.Item position="right">
        <Button
          color="green"
          inverted={!this.state.fixed}
          size="large"
          as={Link}
          to="/login"
          icon="sign in alternate"
          content="Login"
        ></Button>
        <Button
          color="blue"
          size="large"
          as={Link}
          to="/signup"
          icon="registered"
          content="Sign up"
          inverted={!this.state.fixed}
          primary={this.state.fixed}
          style={{ marginLeft: "0.5em" }}
        ></Button>
      </Menu.Item>
    );
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    return (
      <div>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility once={true} onBottomPassedReverse={this.hideFixedMenu}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 50, padding: "1em 0em" }}
              vertical
            >
              <Menu
                fixed={fixed ? "top" : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size="large"
              >
                <Container>
                  <Menu.Item as={Link} to="/">
                    Home
                  </Menu.Item>
                  <Menu.Item as={Link} to="/UserProfiles">
                    User Profiles
                  </Menu.Item>
                  <Menu.Item as={Link} to="/ResumeBuilder">
                    Resume Builder
                  </Menu.Item>

                  {this.renderRegistrationButton(
                    this.props.loggedInStatus,
                    this.props.user
                  )}
                </Container>
              </Menu>
            </Segment>
          </Visibility>
          <Container fluid style={{ minHeight: "100vh" }}>
            {children}
          </Container>
          <Segment
            inverted
            style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
            vertical
          >
            <Container textAlign="center">
              <List horizontal inverted divided link size="small">
                <List.Item as="a" href="#">
                  Site Map
                </List.Item>
                <List.Item as="a" href="#">
                  Contact Us
                </List.Item>
                <List.Item as="a" href="#">
                  Terms and Conditions
                </List.Item>
                <List.Item as="a" href="#">
                  Privacy Policy
                </List.Item>
              </List>
            </Container>
          </Segment>
        </Responsive>
      </div>
    );
  }
}

class ResponsiveContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <DesktopNavBar
          loggedInStatus={this.props.loggedInStatus}
          user={this.props.user}
        >
          {this.props.children}
        </DesktopNavBar>
        <MobileNavBar
          loggedInStatus={this.props.loggedInStatus}
          user={this.props.user}
        >
          {this.props.children}
        </MobileNavBar>
      </div>
    );
  }
}

export default ResponsiveContainer;
