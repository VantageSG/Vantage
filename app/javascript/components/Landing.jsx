import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import Login from "./registrations/Login";

const Landing = () => {
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Icon loading name="home" size="massive" />

          <Header as="h1" color="teal" textAlign="center">
            Welcome to Vantage
          </Header>
          <Header as="h3" color="teal" textAlign="center">
            An Initiative brought to you by DSC NUS
          </Header>

          <Segment stacked>
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
    </div>
  );
};
export default Landing;
