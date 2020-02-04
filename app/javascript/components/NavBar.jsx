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
import axios from 'axios';

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const logout = (handleLogout) => {
  axios
      .delete(process.env.BACKEND_PORT + "/api/v1/logout/", { 
        withCredentials: true,
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status === 401; //error status 401 is expected for user not logged in
        },
      }).then( response =>
        handleLogout()
      )
}

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
        <Button animated
        color="facebook"
        size="large"
        primary={this.state.fixed}
        style={{ marginLeft: "0.5em" }}
        onClick={()=>logout(this.props.handleLogout)}
        >
          <Button.Content color={"red"} visible>
            {user.username}
          </Button.Content>
          <Button.Content hidden>
            logout
          </Button.Content>
        </Button>
      </Menu.Item>
    ) : (
      <React.Fragment>
        <Menu.Item as={Link} to="/login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/signup">
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
        <Button animated
        color="facebook"
        size="large"
        primary={this.state.fixed}
        style={{ marginLeft: "0.5em" }}
        onClick={()=>logout(this.props.handleLogout)}
        >
          <Button.Content visible>
            {user.username}
          </Button.Content>
          <Button.Content hidden>
            logout
          </Button.Content>
        </Button>
      </Menu.Item>
    ) : (
      <React.Fragment>
        <Menu.Item as={Link} to="/login" fitted>
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/signup" fitted>Sign Up</Menu.Item>
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
              <p style={{marginLeft:"1em"}} ><Icon name="lightbulb outline"></Icon>VANTAGE</p>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  {" "}
                  <Menu borderless secondary size="small" compact style={{marginleft:"auto", marginRight: "auto"}}>
                    <Menu.Item as={Link} to="/" fitted>
                      Home
                    </Menu.Item>
                    <Menu.Item as={Link} to="/UserProfiles" fitted>
                      User Profiles
                    </Menu.Item>
                    <Menu.Item as={Link} to="/ResumeBuilder" fitted>
                      Resume Builder
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
          {...this.props}
          loggedInStatus={this.props.loggedInStatus}
          user={this.props.user}
        >
          {this.props.children}
        </DesktopNavBar>
        <MobileNavBar
          {...this.props}
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
