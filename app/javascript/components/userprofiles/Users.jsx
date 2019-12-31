/* eslint-disable react/prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import AddPost from "./AddPost";
import { Segment, List, Button } from "semantic-ui-react";

const UserButton = props => (
    <Button onClick={props.onClick} className={props.className}>
        {props.text}
    </Button>
);

class Users extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { data, fetchUsers } = this.props;

        let userList = data.userReducer.users.map((user, i) => (
            <List.Item key={i}>
                <List.Content >
                    <List.Header>{user.login.username}</List.Header>
                    <List.Header>{user.email}</List.Header>
                    <List.Description>
                        <img src={user.picture.thumbnail}></img>
                    </List.Description>
                </List.Content>
            </List.Item>
        ));



        return (
            <div>
                <Segment textAlign="center" vertical>
                    <UserButton onClick={fetchUsers} text={"Fetch-Users"}></UserButton>
                    <p>This is the list of users page</p>
                    <hr></hr>
                    <List
                        selection
                        divided
                        verticalAlign="middle"
                        style={{ margin: "2em" }}
                    >
                        {userList}
                    </List>
                </Segment>
            </div>
        );
    }
}

/*
const mapStateToProps = state => ({
    posts: state.posts.items, // posts here cause defined in root reducer in reducers folder
    newPost: state.posts.item
}); // get state from redux then map it to the state of the components 
*/
export default Users; // second one is component first one is where we map state to property
