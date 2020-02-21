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
import TeamPic from "../../../assets/images/VantageDSCTeam.jpg"
import { Animated } from "react-animated-css";
import Typist from 'react-typist';

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
              }}
            >
            
              <Segment placeholder style={{ minHeight: "50vh", backgroundColor: "#34558B" }} >
                <Grid>
                  <Grid.Row>
                    <Container

                    >
                      <Image
                        src={Logo}
                        size="small"
                        centered='true'
                      />
                      <Typist>
                 
                          Climb Higher
                          <br></br>
                          With
                          <br></br>
                          Us
                    
                      </Typist>
                      <br></br>
                      <Button
                        style={{ backgroundColor: "#f5c05d"}}
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
            <div style={{ backgroundColor: "#34558B" }}>
              <Segment placeholder style={{
                borderColor: "#34558B",
                border: "0px !important",
                minHeight: "50vh",
                backgroundColor: "#34558B"
              }}>
                <Container
                  textAlign="center"
                >
                  <Image
                    src={Logo}
                    size="small"
                    centered='true'
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
          
          <div style={{ marginTop: "30px", backgroundColor: "#f5c05d", paddingTop: "100px", paddingBottom: "100px"}} >
            <Container fluid textAlign="left" >
              <Grid centered columns={3} stackable>
                <Grid.Row>
              
                  <Grid.Column mobile={16} tablet={6} computer={3}>
                  <Container fluid textAlign="left" >
                    <Header as="h1" style={{ fontSize: "2.0em" }}>
                      About Us
                  </Header>
                  
           
                    <p style={{ fontSize: "1.10em" }}>
                      We aim to create a career readiness platform that will empower youths to
                      transition into the workforce/ seamlessly kickstart their career / move into a career.
                    </p>
                  
                      <p>We empower students to be <p>
                      </p> than themselves</p>
                

                    <p style={{ fontSize: "1.10em" }}>
                      With our interactive resume builder, pre-career employment assessment and curated industry information,
                       we strive to provide well-rounded guidance to job-seeking youths.
  
                    </p>
                  </Container>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={6} computer={4}>
                    <Container fluid textAlign="left">
                      <Header as="h1" style={{ fontSize: "2.0em" }}>
                        Our Mission
                  </Header>
                      <p style={{ fontSize: "1.10em" }}>
                        To create a guided, intuitive platform that prepares youths to be career-ready
                    </p>
                    </Container>
                    <Divider/>
                    <Container fluid textAlign="left" >
                      <Header as="h1" style={{ fontSize: "2.0em" }}>
                        Our Vision
                  </Header>

                      <p style={{ fontSize: "1.10em" }}>
                        To empower all youths to seamlessly transition into the workforce
    
                  </p>

                      <p style={{ fontSize: "1.10em" }}>
                        Realising the potential of each individual, we strive to
                        create a wide range of opportunities for Singaporean youths
                        - regardless of their financial and educational background.
                  </p>

                    </Container>

                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={14} computer={5} >
                    <Image src={TeamPic} style={{  backgroundColor: '#fff',
    padding: '4px'}}>

                    </Image>
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
