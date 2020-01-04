import React, { Component } from "react";
import {
  Header,
  Grid,
  Icon,
  Segment,
  Container,
  Button,
  Divider
} from "semantic-ui-react";
import { Animated } from "react-animated-css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render() {
    return (
      <div>
        <Animated animationIn="fadeIn" isVisible={true}>
          <Container
            fluid
            textAlign="center"
            style={{ marginBottom: "auto" }}
          >
            <Segment inverted style={{ height: "50vh" }}>

              <Icon name="home" size="massive" />
              <Header
                as="h2"
                color="teal"
                textAlign="center"
                content="Welcome To Vantage"
              ></Header>
            </Segment>

          </Container>
          <Segment vertical style={{ paddingTop: "3em" }}>
            <Grid container stackable textAlign="center" verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={4}>
                  {" "}
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Loreum iptsum head
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Help Companies and Companions
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    We empower students to be better than themselves
                  </p>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Make Bananas That Can Dance
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Yes that's right, you thought it was the stuff of dreams,
                    but even bananas can be bioengineered.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment style={{ padding: "1em" }} vertical>
            <Grid celled="internally" columns="equal" stackable>
              <Grid.Row textAlign="center">
                <Grid.Column
                  style={{ paddingBottom: "5em", paddingTop: "5em" }}
                >
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    "What a Company"
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    That is what they all say about us
                  </p>
                </Grid.Column>
                <Grid.Column
                  style={{ paddingBottom: "5em", paddingTop: "5em" }}
                >
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    "I shouldn't have gone with their competitor."
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    <b>Nan</b> Chief Fun Officer Acme Toys
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment vertical style={{ paddingTop: "3em" }}>
            <Grid container stackable textAlign="center" verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Help Companies and Companions
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    We empower students to be better than themselves
                  </p>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Make Bananas That Can Dance
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Yes that's right, you thought it was the stuff of dreams,
                    but even bananas can be bioengineered.
                  </p>
                </Grid.Column>
                <Grid.Column width={4}>
                  {" "}
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Loreum iptsum head
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment style={{ padding: "8em 0em" }} vertical>
            <Container text>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Lorem ipsum dolor sit amet,
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              </p>
              <Button as="a" size="large">
                Read More
              </Button>
              <Divider
                as="h3"
                className="header"
                horizontal
                style={{ margin: "3em 0em", textTransform: "uppercase" }}
              >
                <a href="#">Case Studies</a>
              </Divider>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Lorem ipsum dolor sit amet,
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <Button as="a" size="large">
                I'm Still Quite Interested
              </Button>
            </Container>
          </Segment>
        </Animated>
      </div >
    );
  }
}

export default LandingPage;
