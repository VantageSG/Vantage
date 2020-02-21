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
  Responsive,
  Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/VantageSGLogo_withname.png"
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
                <Container
                textAlign="center"
                
                >
                  <Image
                  src= {Logo}
                  size="small"
                  centered = 'true'
                  />
                  <Button
                  as={Link}
                  to="/resume-builder"
                  content="Build your resume"
                  />
                   
                </Container>
                
              </Segment>
            </Container>
          </Responsive>

          <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
            <div style={{  backgroundColor: "#f4a300" }}>
              <Segment placeholder style={{ minHeight: "50vh", backgroundColor: "#f4a300" }} >
                <Container
                textAlign="center"
                
                >
                  <Image
                  src= {Logo}
                  size="small"
                  centered = 'true'
                  />
                  <Button
                  as={Link}
                  to="/resume-builder"
                  content="Build your resume"
                  />
                   
                </Container>
              </Segment>
            </div>
          </Responsive>
          <Divider></Divider>
          <Container text textAlign="center" style={{}}>
            <Grid centered columns={1}>
              <Grid.Column>
                <Container fluid textAlign="center">
                  <Header as="h1" style={{ fontSize: "3.5em" }}>
                    About Us
                  </Header>
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
                      <p>We empower students to be <p>
                        </p> than themselves</p>
                    </Divider>

                    <p style={{ fontSize: "1.33em" }}>
                    With our interactive resume builder, pre-career employment assessment and curated industry information,
                     we strive to provide well-rounded guidance to job-seeking youths.

                    </p>
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
                    <p style={{ fontSize: "1.33em" }}>
                    To create a guided, intuitive platform that prepares youths to be career-ready
                    </p>
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
