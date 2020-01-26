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
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Container
              fluid
              textAlign="center"
              style={{
                marginLeft: "0em",
                marginTop: "1em",
                marginBottom: "auto",
                minHeight: "50vh",
                backgroundColor: "#f4a300"
              }}
            >
              <Segment placeholder style={{ minHeight: "50vh" , backgroundColor: "#f4a300" }} >
                <Header as="h2"  textAlign="center" icon>
                  <Icon name="home" />
                  Welcome To Vantage
                </Header>
              </Segment>
            </Container>
          </Responsive>

          <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
            <div style={{  backgroundColor: "#f4a300" }}>
              <Segment placeholder style={{ minHeight: "50vh", backgroundColor: "#f4a300" }} >
                <Header as="h2" textAlign="center" icon>
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
                    Climb higher with us.
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
                  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Divider
                      as="h3"
                      className="header"
                      horizontal
                      style={{
                        margin: "1em 0em ",
                        textTransform: "uppercase"
                      }}
                    >
                      <p>Our Platform</p>
                    </Divider>
                    <p style={{ fontSize: "1.33em" }}>
                    We aim to create a career readiness platform that will empower youths to
                    transition into the workforce/ seamlessly kickstart their career / move into a career.
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
                    With our interactive resume builder, pre-career employment assessment and curated industry information,
                     we strive to provide well-rounded guidance to job-seeking youths.

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
                  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <p style={{ fontSize: "1.33em" }}>
                    To create a guided, intuitive platform that prepares youths to be career-ready
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
                    Our Vision
                  </Header>

                  <p style={{ fontSize: "1.33em" }}>
                  To empower all youths to seamlessly transition into the workforce

                  </p>

                  <p style={{ fontSize: "1.33em" }}>
                    Realising the potential of each individual, we strive to
                    create a wide range of opportunities for Singaporean youths
                    - regardless of their financial and educational background.
                  </p>
                  <Button as="a" size="large" color="orange">
                    Sign me up!
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
