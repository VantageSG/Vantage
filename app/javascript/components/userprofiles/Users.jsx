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
    Placeholder,
    Transition,
    Loader,
}
    from "semantic-ui-react";
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
                <Container text>
                    <Grid centered columns={1}>
                        <Grid.Column>
                            <Placeholder fluid>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='very long' />
                                <Placeholder.Line length='long' />
                                <Placeholder.Line length='medium' />
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='very short' />
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
                        </Grid.Column>

                    </Grid>
                </Container>

                {loading ?
                    <Segment style={{ height: "50vh", marginLeft: 'auto', marginRight: 'auto' }} inverted>
                        <Loader active />
                    </Segment>
                    :
                    <Fragment>
                        <Container fluid>
                            <Divider />
                            <Container>

                                <Transition.Group
                                    as={List}
                                    duration={2000}
                                    divided
                                    ordered link animated selection divided size="large"
                                >
                                    {posts}
                                </Transition.Group>

                            </Container>
                        </Container>
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
