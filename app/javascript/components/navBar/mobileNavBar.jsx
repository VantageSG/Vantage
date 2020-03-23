import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import UserContext from "../../contexts/UserContext";

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

  renderRegistrationButton = () => {
    return this.context.isLoggedIn ? (
      <Menu.Item position="right">
        Welcome, {this.context.user.username}
        <Button
          onClick={this.context.logout}
          primary={this.state.fixed}
          style={{ marginTop: "0.5em" }}
        >
          {this.context.user.guest ? "Clear Session" : "Logout"}
        </Button>
      </Menu.Item>
    ) : (
      <React.Fragment>
        <Menu.Item as={Link} to="/login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/sign-up">
          Sign Up
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

       
        >
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/resume-builder">
            Resume Builder
          </Menu.Item>
          { this.renderRegistrationButton() }
        </Sidebar>
        <Visibility once={true} >
         
          <Menu fluid  size="small" borderless style={{
            backgroundColor: "transparent"
          }}>
              <Menu.Item onClick={this.handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
     
        </Visibility>
        <div className="site-content">{children}</div>
        <div style={{ margin: "5em 0em 0em", padding: "5em 0em" }} vertical="true">
          <Container textAlign="center">
            <List horizontal divided link size="small">
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
        </div>
      </Responsive>
    );
  }
}
MobileNavBar.contextType = UserContext;


export default MobileNavBar;
