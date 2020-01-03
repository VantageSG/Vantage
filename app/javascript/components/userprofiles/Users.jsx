/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Image, Segment, List, Button, Grid, Container, Divider, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Animated } from 'react-animated-css';
import { withRouter } from 'react-router-dom';


const UserButton = props => (
    <Button onClick={props.onClick} className={props.className}>
        {props.text}
    </Button>
);

const UserItem = props => (
    <List.Item >
        <Link
            onClick={props.onClick}
            to={{ pathname: `/user:${props.user.login.username}`, userProfile: props.user }}
        >
            <List.Content>
                <Card.Group centered>
                    <Card
                        image={`${props.user.picture.large}`}
                        header={props.user.name.first + " " + props.user.name.last}
                    />


                </Card.Group>
                <List.Header>{props.user.name.first + " " + props.user.name.last}</List.Header>
                <List.Description>{props.user.email}</List.Description>
                <List.Description>{props.user.location.city + " " + props.user.location.state + " " + props.user.location.country}</List.Description>
            </List.Content>
        </Link>
    </List.Item>
)

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfUsers: []
        }
    }




    componentDidMount() {
        axios.get("https://randomuser.me/api/?results=10").then((res) => this.setState({ listOfUsers: res.data.results }));
        console.log(this.props);
    }

    fetchUsers = (e) => {
        axios.get("https://randomuser.me/api/?results=10").then((res) => this.setState({ listOfUsers: res.data.results }));
    }

    render() {
        //const { data, fetchUsers, setUser } = this.props;
        console.log(this.state.listOfUsers);
        const posts = this.state.listOfUsers.map((user, i) => {
            return <UserItem
                key={i}
                user={user}
            />
        });
        return (
            <Animated animationIn="fadeIn" isVisible={true}>

                <Container >
                    <Grid textAlign="center" verticalAlign="middle" >
                        <Grid.Column >
                            <Button content="Fetch users" onClick={this.fetchUsers} ></Button>
                            <p>This is the list of users page</p>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container fluid>
                    <Divider />
                    <Container >

                        <List

                            ordered
                            link
                            animated
                            selection
                            divided

                            size="large"
                        >
                            {posts}
                        </List>
                    </Container>
                </Container>

            </Animated >
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
