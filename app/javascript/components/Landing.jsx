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
import Login from "./registrations/Login";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Landing extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <div>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 700, padding: "1em 0em" }}
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
                  <Menu.Item as="a" active>
                    Home
                  </Menu.Item>
                  <Menu.Item as="a">Work</Menu.Item>
                  <Menu.Item as="a">Company</Menu.Item>
                  <Menu.Item as="a">Careers</Menu.Item>
                  <Menu.Item position="right">
                    {/*
                    <Button as="a" inverted={!fixed}>
                      Log in
                    </Button>
                    <Button
                      as="a"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>*/}
                  </Menu.Item>
                </Container>
              </Menu>
              <TitleCard />
            </Segment>
          </Visibility>

          {children}
        </Responsive>
      </div>
    );
  }
}
const TitleCard = ({ mobile }) => (
  <Container text>
    <Icon name="home" size="huge" />
    <Header
      as="h1"
      content="Welcome to Vantage"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: "0em"
      }}
    />
    <Header
      as="h2"
      content="Break your boundaries"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0em" : "0em"
      }}
    />
    <Header
      as="h3"
      textAlign="center"
      content=" An Initiative brought to you by DSC NUS"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    ></Header>
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment stacked inverted>
          <Button
            color="green"
            fluid
            size="large"
            as={Link}
            to="/login"
            icon="sign in alternate"
            content="Login"
          ></Button>

          <br></br>

          <Button
            color="blue"
            fluid
            size="large"
            as={Link}
            to="/signup"
            icon="registered"
            content="Sign up"
          ></Button>
          <br></br>

          <Button
            color="red"
            fluid
            size="large"
            as={Link}
            to="/aboutus"
            icon="street view"
            content="About Us"
          ></Button>
        </Segment>
      </Grid.Column>
    </Grid>
  </Container>
);
export default Landing;
