/* eslint-disable react/prop-types */
import React, { Component, Fragment } from "react";
import {
    Image,
    Segment,
    List,
    Button,
    Grid,
    Container,
    Divider,
    Card,
    Placeholder
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Animated } from "react-animated-css";
import { withRouter } from "react-router-dom";

const UserButton = props => (
    <Button onClick={props.onClick} className={props.className}>
        {props.text}
    </Button>
);

const UserItem = props => (
    <List.Item>
        <Link
            onClick={props.onClick}
            to={{
                pathname: `/user:${props.user.login.username}`,
                userProfile: props.user
            }}
        >
            <List.Content>
                <Card.Group centered>
                    <Card>
                        {" "}
                        {props.loading ? (
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        ) : (
                                <Image src={`${props.user.picture.large}`} />
                            )}

                        <Card.Header>
                            {props.user.name.first + " " + props.user.name.last}
                        </Card.Header>
                    </Card>
                </Card.Group>
                <List.Header>
                    {props.user.name.first + " " + props.user.name.last}
                </List.Header>
                <List.Description>{props.user.email}</List.Description>
                <List.Description>
                    {props.user.location.city +
                        " " +
                        props.user.location.state +
                        " " +
                        props.user.location.country}
                </List.Description>
            </List.Content>
        </Link>
    </List.Item>
);

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            listOfUsers: []
        };
    }

    componentDidMount() {
        this.fetchUsers();
        console.log(this.props);
    }

    fetchUsers = e => {
        axios.get("https://randomuser.me/api/?results=100").then(res =>
            this.setState({
                loading: false,
                listOfUsers: res.data.results
            })
        );
    };

    render() {

        const { loading } = this.state
        const posts = this.state.listOfUsers.map((user, i) => {
            return <UserItem key={i} user={user} loading={this.state.loading} />;
        })
        return (
            <Animated animationIn="fadeIn" isVisible={true}>
                {loading ?
                    <Container>
                        <Placeholder>
                            <Placeholder.Paragraph />
                        </Placeholder>
                    </Container> :
                    <Fragment>
                        <Container>
                            <Grid textAlign="center" verticalAlign="middle">
                                <Grid.Column>
                                    <Button content="Fetch users" onClick={this.fetchUsers}></Button>
                                    <p>This is the list of users page</p>
                                </Grid.Column>
                            </Grid>
                        </Container>
                        <Animated animationIn="fadeUp" isVisible={true}>
                            <Container fluid>
                                <Divider />
                                <Container>
                                    <List ordered link animated selection divided size="large">
                                        {posts}
                                    </List>
                                </Container>
                            </Container>
                        </Animated>
                    </Fragment>
                }


            </Animated>
        );
    }
}

/*
const mapStateToProps = state => ({
            posts: state.posts.items, // posts here cause defined in root reducer in reducers folder
newPost: state.posts.item
}); // get state from redux then map it to the state of the components 
*/
export default withRouter(Users); // second one is component first one is where we map state to property
