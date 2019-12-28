import React, { Component } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import {
    Header,
    Grid,
    Icon,
    Segment,
    Container,
    Button,
    Divider,
    List
} from "semantic-ui-react";
class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfUsers: []

        }
    }

    componentWillMount() {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(response => this.setState({ listOfUsers: response.data })
            );
    }

    render() {
        const userList = this.state.listOfUsers.map(user => (
            <List.Item key={user.id}>
                <List.Content>
                    <List.Header>{user.name}</List.Header>
                    <List.Description>{user.email}</List.Description>
                    <List.Description>{user.phone}</List.Description>
                </List.Content>
            </List.Item>

        ));
        return (
            <div>
                <Segment textAlign="center" vertical>
                    <p>This is the list of users page</p>
                    <List selection divided verticalAlign='middle' style={{ margin: '2em' }}>
                        {userList}
                    </List>
                </Segment>
            </div>);
    }
}

export default UserPage;