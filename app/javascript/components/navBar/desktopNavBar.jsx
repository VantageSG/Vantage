import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";
import UserContext from '../../contexts/UserContext';
import "./layout.css";


const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};


class DesktopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  renderRegistrationButton = () => {
    return this.context.isLoggedIn ? (
      <Menu.Item position="right">
        Welcome, {this.context.user.username}
        <Button
          onClick={this.context.logout}
          primary={this.state.fixed}
          style={{ marginLeft: "1em" }}
        >
          {this.context.user.guest ? "Clear Session" : "Logout"}
        </Button>
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
    
    return (
      <div>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility once={true} onBottomPassedReverse={this.hideFixedMenu}>
            <Grid
              style={{
                minHeight: 20,
                padding: "1em 0em",                
                backgroundColor: "#f4a300"
              }}
              columns={3}
              centered
            >
              <Grid.Row centered>
                <Grid.Column textAlign="left" verticalAlign="middle" >
              <p style={{marginLeft:"1em"}} ><Icon name="lightbulb outline"></Icon>VANTAGES</p>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  {" "}
                  <Menu borderless secondary size="small" compact style={{marginleft:"auto", marginRight: "auto"}}>
                    <Menu.Item as={Link} to="/" fitted>
                      Home
                    </Menu.Item>                   
                    <Menu.Item as={Link} to="/resume-builder" fitted>
                      Resume Builder
                    </Menu.Item>                         
                  </Menu>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Menu borderless secondary size="small" compact>
                    {this.renderRegistrationButton()}
                  </Menu>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Visibility>
          <Container fluid className="site-content">
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
DesktopNavBar.contextType = UserContext;

export default DesktopNavBar;