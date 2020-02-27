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
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/VantageSGLogo_withname.png";

import { Animated } from "react-animated-css";
import TeamPic from "../../../assets/images/VantageDSCTeam.jpg";
import Typist from "react-typist";

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
                minHeight: "50vh"
              }}
            >
              <Segment
                placeholder
                style={{ minHeight: "50vh", backgroundColor: "#283A76" }}
              >
                <Grid>
                  <Grid.Row>
                    <Container>
                      <Image src={Logo} size="small" centered="true" />
                      <Typist
                        avgTypingDelay={70}
                        cursor={{
                          show: false
                        }}
                      >
                        <Header 
                        as='h1'>Climb Higher With Us</Header>
                      </Typist>
                      <br></br>
                      <Button
                        style={{ backgroundColor: "#F6B690" }}
                        as={Link}
                        to="/resume-builder"
                        content="Build your resume"
                      />
                    </Container>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Container>
          </Responsive>
          <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
            <div >
              <Segment
                placeholder
                style={{
                  borderColor: "#34558B",
                  border: "0px !important",
                  minHeight: "50vh",
                  backgroundColor: "#283A76"
                }}
              >
                <Container textAlign="center">
                  <Image src={Logo} size="small" centered="true" />
                  <Button
                    as={Link}
                    to="/resume-builder"
                    style = {{
                      backgroundColor: '#F6B690'
                    }}
                    content="Build your resume"
                  />
                </Container>
              </Segment>
            </div>
          </Responsive>

          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#FFF2D6",
              paddingTop: "100px",
              paddingBottom: "100px"
            }}
          >
            <Container fluid textAlign="left">
              <Grid centered columns={3} stackable>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={6} computer={3}>
                    <Container fluid textAlign="left">
                      <Header as="h1" style={{ fontSize: "2.0em" }}>
                        About Us
                      </Header>

                      <p style={{ fontSize: "1.10em" }}>
                        Here at Vantage SG, we empower youths to transition into
                        the workforce and seamlessly kick start their career.
                      </p>

                      <p>
                        With our intuitive and guided resume builder specially
                        made to suit first-timers, we strive to provide
                        well-rounded guidance to job-seeking youths.
                      </p>
                    </Container>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={6} computer={4}>
                    <Container fluid textAlign="left">
                    <Header as="h1" style={{ fontSize: "2.0em" }}>
                      A project launched as a part of DSC NUS.
                      </Header>

                      <p style={{ fontSize: "1.10em" }}>
                      Developer Student Club (DSC) is a technical community that combines all the university students, and all the other students who learn, share ideas and come up with viable projects that are likely to solve day to day universe problems.
                      </p>
                      <Header as="h1" style={{ fontSize: "2.0em" }}>
                        Our Mission
                      </Header>
                      <p style={{ fontSize: "1.10em" }}>
                        To create a guided, intuitive platform that prepares
                        youths to be career-ready
                      </p>
                    </Container>
                    <Divider />
                    <Container fluid textAlign="left">
                      <Header as="h1" style={{ fontSize: "2.0em" }}>
                        Our Vision
                      </Header>

                      <p style={{ fontSize: "1.10em" }}>
                        To empower all youths to seamlessly transition into the
                        workforce
                      </p>
                    </Container>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={14} computer={5}>
                    <Image
                      src={TeamPic}
                      style={{ backgroundColor: "#fff", padding: "4px" }}
                    ></Image>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </Animated>
      </div>
    );
  }
}

export default LandingPage;
