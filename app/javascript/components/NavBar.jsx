import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
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
          primary={this.state.fixed}
          style={{ marginLeft: "0.5em" }}
        ></Button>
      </Menu.Item>
    ) : (
      <React.Fragment>
        <Menu.Item as={Link} to="/login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/sign-up">
          Sign up
        </Menu.Item>
      </React.Fragment>
    );
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          position="left"
          as={Menu}
          animation="push"
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
          style={{ backgroundColor: "#f4a300" }}
        >
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/user-profiles">
            User Profiles
          </Menu.Item>
          <Menu.Item as={Link} to="/resume-builder">
            Resume Builder
          </Menu.Item>
          {this.renderRegistrationButton(
            this.props.loggedInStatus,
            this.props.user
          )}
        </Sidebar>
        <Visibility once={true}>
          <Segment
            textAlign="center"
            style={{
              minHeight: 50,
              padding: "1em 0em",
              backgroundColor: "#f4a300"
            }}
            vertical
          >
            <Menu fluid secondary size="small" borderless>
              <Menu.Item onClick={this.handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
          </Segment>
        </Visibility>
        <div style={{ minHeight: "100vh" }}>{children}</div>
        <Segment style={{ margin: "5em 0em 0em", padding: "5em 0em" }} vertical>
          <Container textAlign="center">
            <List horizontal divided link size="small">
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
          primary={this.state.fixed}
          style={{ marginLeft: "0.5em" }}
        ></Button>
      </Menu.Item>
    ) : (
      <React.Fragment>
        <Menu.Item as={Link} to="/login" fitted>
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/sign-up" fitted>Sign Up</Menu.Item>
      </React.Fragment>
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
            <Grid
              style={{
                minHeight: 30,
                padding: "1em 0em",
                paddingBottom: "1em ",
                backgroundColor: "#f4a300"
              }}
              columns={3}
              centered
            >
              <Grid.Row centered>
                <Grid.Column textAlign="left" verticalAlign="middle" >
              <p style={{marginLeft:"1em"}} ><Icon name="lightbulb outline"></Icon>VANTAGES</p>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  {" "}
                  <Menu borderless secondary size="small" compact style={{marginleft:"auto", marginRight: "auto"}}>
                    <Menu.Item as={Link} to="/" fitted>
                      Home
                    </Menu.Item>
                    <Menu.Item as={Link} to="/user-profiles" fitted>
                      User Profiles
                    </Menu.Item>
                    <Menu.Item as={Link} to="/resume-builder" fitted>
                      Resume Builder
                    </Menu.Item>
                    <Menu.Item as={Link} to="/resume-generation" fitted>
                      Resume Generation
                    </Menu.Item>
                    {this.renderRegistrationButton(
                      this.props.loggedInStatus,
                      this.props.user
                    )}
                  </Menu>
                </Grid.Column>
                <Grid.Column>
                 
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Visibility>
          <Container fluid style={{ minHeight: "100vh" }}>
            {children}
          </Container>
          <Segment
            style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
            vertical
          >
            <Container textAlign="center">
              <List horizontal divided link size="small">
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
