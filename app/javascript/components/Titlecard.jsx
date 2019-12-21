import React, { Component } from "react";
import { Header, Grid, Icon } from "semantic-ui-react";
import { Animated } from 'react-animated-css';

class TitleCard extends Component {
  render() {
    return (
      <div>
        <Animated animationIn="bounceIn" isVisible={true}>
          <Grid
            textAlign="center"
            style={{ marginTop: "2em" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Icon loading name="home" size="massive" />
              <Header
                as="h2"
                color="teal"
                textAlign="center"
                content="Welcome To Vantage"
              ></Header>
            </Grid.Column>
          </Grid>
        </Animated>
      </div >
    );
  }
}

export default TitleCard;
