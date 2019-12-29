import React, { Component } from "react";
import axios from "axios";
import AddPost from "./AddPost";
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
import { connect } from 'react-redux'; //connect component to redux store
import { fetchPosts } from '../../redux/actions/postActions';


class UserPage extends Component {


    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        const userList = this.props.posts.map(user => (
            <List.Item key={user.id}>
                <List.Content>
                    <List.Header>{user.title}</List.Header>
                    <List.Description>{user.body}</List.Description>
                    <List.Description>{user.body}</List.Description>
                </List.Content>
            </List.Item>

        ));
        return (
            <div>
                <Segment textAlign="center" vertical>
                    <AddPost></AddPost>
                    <p>This is the list of users page</p>
                    <hr></hr>
                    <List selection divided verticalAlign='middle' style={{ margin: '2em' }}>
                        {userList}
                    </List>
                </Segment>
            </div>);
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts })(UserPage);