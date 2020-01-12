import React, { Component } from "react";
import {
  Header,
  Grid,
  Icon,
  Segment,
  Container,
  Button,
  Divider,
  Placeholder,
  Card,
  Responsive
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
        <Responsive
        
        minWidth={Responsive.onlyTablet.minWidth}>


        <Container
          fluid
          textAlign="center"
          style={{
            marginLeft: "0em",
            marginBottom: "auto",
            minHeight: "50vh",
            backgroundColor: "#1b1c1d"
          }}
        >
          <Segment placeholder style={{ minHeight: "50vh" }} inverted>
            <Header as="h2" color="teal" textAlign="center" icon>
              <Icon name="home" />
              Welcome To Vantage
            </Header>
          </Segment>
        </Container>
        </Responsive>

        <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
        <div style={{backgroundColor: "#1b1c1d"}}>
        <Segment placeholder style={{ minHeight: "50vh" }} inverted>
            <Header as="h2" color="teal" textAlign="center" icon>
              <Icon name="home" />
              Welcome To Vantage
            </Header>
          </Segment>
          </div>
        </Responsive>

        <Container
          text
          textAlign="center"
          style={{ marginTop: "2vh", marginBottom: "2vh" }}
        >
          <Grid centered columns={1}>
            <Grid.Column>
              <Container fluid textAlign="center">
                <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
                <Header as="h1" style={{ fontSize: "3em" }}>
                  VANTAGE
                </Header>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Header as="h1" style={{ fontSize: "5em" }}>
                  VANTAGE
                </Header>
                </Responsive>
               
              </Container>

              <Card centered fluid style={{ height: "30vh" }}>
                <Placeholder fluid>
                  <Placeholder.Image square />
                </Placeholder>
                <Card.Content>
                  <Card.Description>logo will be here</Card.Description>
                </Card.Content>
              </Card>
              <Container fluid textAlign="center">
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Some slogan that amelia will come up with
                </Header>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
       
        <Divider></Divider>
        <Container text textAlign="center" style={{}}>
          <Grid centered columns={1}>
            <Grid.Column>
              <Container fluid textAlign="center">
                <Header as="h1" style={{ fontSize: "3.5em" }}>
                  About Us
                </Header>
                <Responsive minWidth={Responsive.onlyTablet.minWidth} >
                <Divider
                  as="h3"
                  className="header"
                  horizontal
                  style={{
                    margin: "1em 0em ",
                    textTransform: "uppercase"
                  }}
                >
                  <p>We Help Companies and Companions</p>
                </Divider>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams,
                  but even bananas can be bioengineered.
                </p>
                <Divider
                  as="h3"
                  className="header"
                  horizontal
                  style={{
                    margin: "1em 0em ",
                    textTransform: "uppercase"
                  }}
                >
                  <p>We empower students to be better than themselves</p>
                </Divider>

                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams,
                  but even bananas can be bioengineered.
                </p>

                <Divider
                  as="h3"
                  className="header"
                  horizontal
                  style={{
                    margin: "1em 0em ",
                    textTransform: "uppercase"
                  }}
                >
                  <p>We Make Bananas That Can Dance</p>
                </Divider>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams,
                  but even bananas can be bioengineered.
                </p>
                </Responsive>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
        

        <Divider></Divider>

        <Container text textAlign="center" style={{}}>
          <Grid centered columns={1}>
            <Grid.Column>
              <Container fluid textAlign="center">
                <Header as="h1" style={{ fontSize: "3.5em" }}>
                  Our Mission
                </Header>
                <Responsive minWidth={Responsive.onlyTablet.minWidth} >
                <Divider
                  as="h3"
                  className="header"
                  horizontal
                  style={{
                    margin: "1em 0em ",
                    textTransform: "uppercase"
                  }}
                >
                  <p>We Help Companies and Companions</p>
                </Divider>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams,
                  but even bananas can be bioengineered.
                </p>
                <Divider
                  as="h3"
                  className="header"
                  horizontal
                  style={{
                    margin: "1em 0em ",
                    textTransform: "uppercase"
                  }}
                >
                  <p>We empower students to be better than themselves</p>
                </Divider>

                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams,
                  but even bananas can be bioengineered.
                </p>

                <Divider
                  as="h3"
                  className="header"
                  horizontal
                  style={{
                    margin: "1em 0em ",
                    textTransform: "uppercase"
                  }}
                >
                  <p>We Make Bananas That Can Dance</p>
                </Divider>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams,
                  but even bananas can be bioengineered.
                </p>
                </Responsive>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>

        <Segment vertical>
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

        <Container text textAlign="center" style={{}}>
          {" "}
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column
                style={{ paddingBottom: "5em", paddingTop: "5em" }}
              >
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "What a TechLead this team have"
                </Header>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "Absolutely Amazing"
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
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "I should have connected with them on linkedin"
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <Divider></Divider>

        <Container text textAlign="center" style={{}}>
          <Grid centered columns={1}>
            <Grid.Column>
              <Container fluid textAlign="center">
                <Header as="h1" style={{ fontSize: "3.5em" }}>
                  Our Vision
                </Header>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Lorem ipsum dolor sit amet,
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
                <Button as="a" size="large">
                  I'm Still Quite Interested
                </Button>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
      </Animated>
      </div>
    );
  }
}

export default LandingPage;
