import React, { Component } from "react";
import { Header, Grid, Icon } from "semantic-ui-react";
import { Animated } from "react-animated-css";
import axios from "axios";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentWillMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => this.setState({ posts: response.data }));
  }

  render() {
    return (
      <div>
        <Animated animationIn="bounceIn" isVisible={true}>
          <Grid
            container
            stackable
            textAlign="center"
            style={{ marginTop: "2em" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Icon name="home" size="massive" />
              <Header
                as="h2"
                color="teal"
                textAlign="center"
                content="Welcome To Vantage"
              ></Header>
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
                    Yes that's right, you thought it was the stuff of dreams, but even
                    bananas can be bioengineered.
            </p>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Animated>
      </div>
    );
  }
}

export default LandingPage;
