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
                  <Grid.Column textAlign="center">
                    {" "}
                    <Menu borderless secondary size="small" compact style={{marginleft:"auto", marginRight: "auto"}}>
                      <Menu.Item as={Link} to="/" fitted>
                        Home
                      </Menu.Item>
                   
                      <Menu.Item as={Link} to="/resume-builder" fitted>
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

  export default DesktopNavBar;