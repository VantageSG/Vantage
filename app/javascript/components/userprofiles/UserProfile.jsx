import React, { Component } from "react";
import {
    Image,
    Button,
    Grid,
    Container,
    Card
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
            <Container >
                <Grid textAlign="center" verticalAlign="middle" centered>
                    <Grid.Row centered>
                        <Grid.Column>
                            <Card.Group centered>
                                <Card>
                                    <Image src={`${userProfile.picture.large}`} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{`${userProfile.name.title}, ${userProfile.name.first} ${userProfile.name.last}`}</Card.Header>
                                        <Card.Meta>{userProfile.email}</Card.Meta>
                                        <Card.Description>{userProfile.location.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button disabled={loading} primary>
                                            Add
                                        </Button>
                                        <Button disabled={loading}>Delete</Button>
                                    </Card.Content>
                                </Card>
                            </Card.Group>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        ) : (
                <h1>Looks like you havent selected a user</h1>
            );
    }
}
export default UserProfile;
