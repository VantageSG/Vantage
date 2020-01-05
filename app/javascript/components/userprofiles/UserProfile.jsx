import React, { Component } from "react";
import {
  Image,
  Button,
  Grid,
  Container,
  Card,
  Header,
  Segment,
  Placeholder
} from "semantic-ui-react";

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const loading = false;
    const userProfile = this.props.userProfile;
    return userProfile ? (
      <div>
        <Container text style={{ marginTop: "5vh" }}>
          <Header as="h1">
            {`${userProfile.name.title}  ${userProfile.name.first}  ${userProfile.name.last}`}
          </Header>
        </Container>
        <Container text>
          <Segment.Group horizontal>
            <Segment>
              {" "}
              <Grid textAlign="center" verticalAlign="middle" centered>
                <Grid.Row centered>
                  <Grid.Column>
                    <Card.Group centered>
                      <Card>
                        <Image
                          src={`${userProfile.picture.large}`}
                          wrapped
                          ui={false}
                        />
                        <Card.Content>
                          <Button disabled={loading} primary>
                            Add
                          </Button>
                          <Button disabled={loading}>Delete</Button>
                        </Card.Content>
                      </Card>
                    </Card.Group>
                    <Segment>
                      <Placeholder fluid>
                        <Placeholder.Header image>
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="very long" />
                        <Placeholder.Line length="long" />
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                        <Placeholder.Line length="very short" />
                        <Placeholder.Paragraph>
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Paragraph>
                      </Placeholder>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>
              <Segment>{userProfile.email}</Segment>
              <Segment> {userProfile.location.country}</Segment>
              <Segment>
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="very long" />
                  <Placeholder.Line length="long" />
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                  <Placeholder.Line length="very short" />
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    ) : (
      <h1>Looks like you havent selected a user</h1>
    );
  }
}
export default UserProfile;
