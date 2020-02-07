import React, { Component } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Placeholder,
  Button
} from "semantic-ui-react";
import { useHistory, withRouter, Link } from "react-router-dom";

class Error404Page extends Component {
  render() {
    const styleObject = { fontFamily: "Frank Ruhl Libre" };
    return (
      <div>
        <Container
          text
          style={{
            marginTop: "5vh"
          }}
        >
          <Grid textAlign="center" verticalAlign="middle" centered>
            <Grid.Row></Grid.Row>
          </Grid>
          <Segment textAlign="center">
            <Header as="h1" style={styleObject}>
              {" "}
              404!{" "}
            </Header>
            <Header as="h1" style={styleObject}>
              {" "}
              Page not found!{" "}
            </Header>
            <Header as="h2" style={styleObject}>
              {" "}
              Oops looks like you got lost....
            </Header>
            <Header as="h2" style={styleObject}>
              {" "}
              We can help you find your way back{" "}
            </Header>

            <Grid textAlign="center" verticalAlign="middle" centered>
              <Grid.Row>
                <Button
                  as={Link}
                  to="/"
                  content="Home"
                  size="medium"
                  color="green"
                ></Button>
                <Button
                  onClick={this.props.history.goBack}
                  content="Bring me back!"
                  size="medium"
                  color="red"
                ></Button>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}
export default withRouter(Error404Page);
